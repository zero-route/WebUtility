'use client'

import { useState } from 'react'
import { Copy, Check, Binary } from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'

function encodeBase64(text: string): string {
  const bytes = new TextEncoder().encode(text)
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

function decodeBase64(base64: string): string {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

export default function Base64EncodeDecodeUI() {
  const { enabled, reason } = useToolEnabled('base64-encode-decode')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleInputChange(value: string) {
    setInput(value)
    setError(null)

    if (!value) {
      setOutput('')
      return
    }

    try {
      const result = mode === 'encode' ? encodeBase64(value) : decodeBase64(value)
      setOutput(result)
    } catch {
      setOutput('')
      setError('Base64 tidak valid')
    }
  }

  function handleModeChange(nextMode: 'encode' | 'decode') {
    setMode(nextMode)
    setInput('')
    setOutput('')
    setError(null)
  }

  function handleCopy() {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (enabled === null) {
    return <div className="rounded-xl border border-border bg-surface p-5 text-sm text-textMuted">Memuat...</div>
  }

  if (!enabled) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <Binary size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">Base64 encode/decode</h3>
        </div>
        <p className="mt-2 text-sm text-textMuted">Tool ini sedang dinonaktifkan admin</p>
        {reason && <p className="mt-1 text-xs text-textMuted">{reason}</p>}
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
      <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <Binary size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">Base64 encode/decode</h3>
        </div>
      <p className="mt-1 text-sm text-textSecondary">Ubah teks biasa jadi Base64, atau sebaliknya</p>

      <div className="mt-4 flex gap-2">
        <button
          onClick={() => handleModeChange('encode')}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            mode === 'encode'
              ? 'border border-teal bg-teal/10 text-teal-light'
              : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => handleModeChange('decode')}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            mode === 'decode'
              ? 'border border-teal bg-teal/10 text-teal-light'
              : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
          }`}
        >
          Decode
        </button>
      </div>

      <textarea
        value={input}
        onChange={(event) => handleInputChange(event.target.value)}
        placeholder={mode === 'encode' ? 'Masukkan teks biasa' : 'Masukkan string Base64'}
        rows={4}
        className="mt-3 w-full resize-none rounded-lg border border-border bg-surface2 p-3 text-sm text-textPrimary outline-none focus:border-teal"
      />

      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}

      {output && (
        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="text-xs text-textMuted">Hasil</p>
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
            value={output}
            rows={4}
            className="mt-2 w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textSecondary"
          />
        </div>
      )}
    </div>
  )
}
