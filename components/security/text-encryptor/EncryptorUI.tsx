'use client'

import { useRef, useState } from 'react'
import { Copy, Check, Upload, Download, Lock } from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'
import { encryptPacket, decryptPacket, bytesToBase64, base64ToBytes, AES_ALGORITHMS, AesAlgorithm } from '@/lib/aes'

type Action = 'encrypt' | 'decrypt'
type ContentMode = 'text' | 'file'
type KeyType = 'passphrase' | 'pin'

export default function EncryptorUI() {
  const { enabled, reason } = useToolEnabled('aes-encryptor')

  const [action, setAction] = useState<Action>('encrypt')
  const [contentMode, setContentMode] = useState<ContentMode>('text')
  const [algorithm, setAlgorithm] = useState<AesAlgorithm>('AES-GCM')
  const [keyType, setKeyType] = useState<KeyType>('passphrase')
  const [pinLength, setPinLength] = useState<4 | 6 | 10>(6)
  const [password, setPassword] = useState('')

  const [textInput, setTextInput] = useState('')
  const [textOutput, setTextOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [outputBlobUrl, setOutputBlobUrl] = useState<string | null>(null)
  const [outputFileName, setOutputFileName] = useState<string | null>(null)

  const [error, setError] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function resetOutputs() {
    setTextOutput('')
    setOutputBlobUrl(null)
    setOutputFileName(null)
    setError(null)
  }

  function handleActionChange(next: Action) {
    setAction(next)
    resetOutputs()
  }

  function handleContentModeChange(next: ContentMode) {
    setContentMode(next)
    resetOutputs()
    setTextInput('')
    setSelectedFile(null)
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setSelectedFile(file)
    resetOutputs()
  }

  function handlePasswordChange(value: string) {
    if (keyType === 'pin') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, pinLength)
      setPassword(digitsOnly)
    } else {
      setPassword(value)
    }
  }

  async function handleRun() {
    setError(null)

    if (!password) {
      setError('Password/PIN belum diisi')
      return
    }

    if (keyType === 'pin' && password.length !== pinLength) {
      setError(`PIN harus ${pinLength} digit`)
      return
    }

    setIsProcessing(true)

    try {
      if (contentMode === 'text') {
        if (action === 'encrypt') {
          const bytes = new TextEncoder().encode(textInput)
          const packet = await encryptPacket({ data: bytes, password, algorithm })
          setTextOutput(bytesToBase64(packet))
        } else {
          const packet = base64ToBytes(textInput)
          const result = await decryptPacket(packet, password)
          setTextOutput(new TextDecoder('utf-8', { fatal: true }).decode(result.data))
        }
      } else {
        if (!selectedFile) {
          setError('Pilih file dulu')
          setIsProcessing(false)
          return
        }

        const arrayBuffer = await selectedFile.arrayBuffer()
        const bytes = new Uint8Array(arrayBuffer)

        if (action === 'encrypt') {
          const packet = await encryptPacket({
            data: bytes,
            password,
            algorithm,
            filename: selectedFile.name,
            mimeType: selectedFile.type
          })
          const blob = new Blob([packet], { type: 'application/octet-stream' })
          setOutputBlobUrl(URL.createObjectURL(blob))
          setOutputFileName(`${selectedFile.name}.enc`)
        } else {
          const result = await decryptPacket(bytes, password)
          const blob = new Blob([result.data], { type: result.mimeType ?? 'application/octet-stream' })
          setOutputBlobUrl(URL.createObjectURL(blob))
          setOutputFileName(result.filename ?? 'hasil-dekripsi')
        }
      }
    } catch {
      setError(action === 'encrypt' ? 'Gagal mengenkripsi' : 'Password salah atau data rusak')
    } finally {
      setIsProcessing(false)
    }
  }

  function handleCopy() {
    if (!textOutput) return
    navigator.clipboard.writeText(textOutput)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (enabled === null) {
    return <div className="rounded-xl border border-border bg-surface p-5 text-sm text-textMuted">Memuat...</div>
  }

  if (!enabled) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <Lock size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">AES encryptor</h3>
        </div>
        <p className="mt-2 text-sm text-textMuted">Tool ini sedang dinonaktifkan admin</p>
        {reason && <p className="mt-1 text-xs text-textMuted">{reason}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-surface p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <Lock size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">AES encryptor</h3>
        </div>
        <p className="mt-1 text-sm text-textSecondary">Enkripsi teks atau file pakai password, AES asli lewat Web Crypto API</p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleActionChange('encrypt')}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium ${
              action === 'encrypt' ? 'bg-teal text-white' : 'border border-border text-textSecondary'
            }`}
          >
            Encoder
          </button>
          <button
            onClick={() => handleActionChange('decrypt')}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium ${
              action === 'decrypt' ? 'bg-teal text-white' : 'border border-border text-textSecondary'
            }`}
          >
            Decoder
          </button>
        </div>

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => handleContentModeChange('text')}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium ${
              contentMode === 'text' ? 'bg-surface2 text-textPrimary' : 'border border-border text-textSecondary'
            }`}
          >
            Teks
          </button>
          <button
            onClick={() => handleContentModeChange('file')}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium ${
              contentMode === 'file' ? 'bg-surface2 text-textPrimary' : 'border border-border text-textSecondary'
            }`}
          >
            File / Foto
          </button>
        </div>

        {action === 'encrypt' && (
          <div className="mt-4">
            <p className="text-xs text-textMuted">Model AES</p>
            <select
              value={algorithm}
              onChange={(event) => setAlgorithm(event.target.value as AesAlgorithm)}
              className="mt-1 w-full rounded-lg border border-border bg-surface2 px-3 py-2 text-sm text-textPrimary outline-none focus:border-teal"
            >
              {AES_ALGORITHMS.map((algo) => (
                <option key={algo} value={algo}>
                  {algo === 'AES-GCM' ? 'AES-GCM (rekomendasi, deteksi password salah)' : algo}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="mt-4">
          <p className="text-xs text-textMuted">Tipe kunci</p>
          <div className="mt-1 flex gap-2">
            <button
              onClick={() => {
                setKeyType('passphrase')
                setPassword('')
              }}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium ${
                keyType === 'passphrase' ? 'bg-surface2 text-textPrimary' : 'border border-border text-textSecondary'
              }`}
            >
              Passphrase
            </button>
            <button
              onClick={() => {
                setKeyType('pin')
                setPassword('')
              }}
              className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium ${
                keyType === 'pin' ? 'bg-surface2 text-textPrimary' : 'border border-border text-textSecondary'
              }`}
            >
              PIN angka
            </button>
          </div>

          {keyType === 'pin' && (
            <div className="mt-2 flex gap-2">
              {[4, 6, 10].map((length) => (
                <button
                  key={length}
                  onClick={() => {
                    setPinLength(length as 4 | 6 | 10)
                    setPassword('')
                  }}
                  className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium ${
                    pinLength === length ? 'bg-teal text-white' : 'border border-border text-textSecondary'
                  }`}
                >
                  {length} digit
                </button>
              ))}
            </div>
          )}

          <input
            type={keyType === 'pin' ? 'text' : 'password'}
            inputMode={keyType === 'pin' ? 'numeric' : 'text'}
            value={password}
            onChange={(event) => handlePasswordChange(event.target.value)}
            placeholder={keyType === 'pin' ? `Masukkan PIN ${pinLength} digit` : 'Masukkan password'}
            className="mt-2 w-full rounded-lg border border-border bg-surface2 px-3 py-2 text-sm text-textPrimary outline-none focus:border-teal"
          />
          {keyType === 'pin' && (
            <p className="mt-1 text-xs text-textMuted">PIN pendek lebih gampang ditebak, cocok buat proteksi ringan aja</p>
          )}
        </div>

        {contentMode === 'text' ? (
          <textarea
            value={textInput}
            onChange={(event) => setTextInput(event.target.value)}
            placeholder={action === 'encrypt' ? 'Teks yang mau dienkripsi' : 'Tempel teks terenkripsi (Base64)'}
            rows={4}
            className="mt-4 w-full resize-none rounded-lg border border-border bg-surface2 p-3 text-sm text-textPrimary outline-none focus:border-teal"
          />
        ) : (
          <div className="mt-4">
            <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-borderStrong px-4 py-8 text-sm text-textSecondary transition-colors hover:border-teal hover:text-textPrimary"
            >
              <Upload size={16} />
              {selectedFile ? selectedFile.name : action === 'encrypt' ? 'Pilih file atau foto' : 'Pilih file .enc'}
            </button>
          </div>
        )}

        <button
          onClick={handleRun}
          disabled={isProcessing}
          className="mt-4 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
        >
          {isProcessing ? 'Memproses...' : action === 'encrypt' ? 'Enkripsi' : 'Dekripsi'}
        </button>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {contentMode === 'text' && textOutput && (
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-sm font-medium text-textPrimary">Hasil</h4>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Tersalin' : 'Copy'}
            </button>
          </div>
          <textarea
            readOnly
            value={textOutput}
            rows={5}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textSecondary"
          />
        </div>
      )}

      {contentMode === 'file' && outputBlobUrl && outputFileName && (
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex flex-col items-center gap-3">
            <p className="text-sm text-textSecondary">{outputFileName}</p>
            <a
              href={outputBlobUrl}
              download={outputFileName}
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-textSecondary hover:text-textPrimary"
            >
              <Download size={14} />
              Download
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
