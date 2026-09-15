'use client'

import { useRef, useState } from 'react'
import { Upload, Copy, Check, Image } from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'

export default function Base64UI() {
  const { enabled, reason } = useToolEnabled('base64-converter')
  const [fileName, setFileName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [base64Code, setBase64Code] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setBase64Code(null)
    setCopied(false)

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setImageUrl(result)
      setBase64Code(result)
    }
    reader.readAsDataURL(file)
  }

  function handleCopy() {
    if (!base64Code) return
    navigator.clipboard.writeText(base64Code)
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
            <Image size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">Base64 converter</h3>
        </div>
        <p className="mt-2 text-sm text-textMuted">Tool ini sedang dinonaktifkan admin</p>
        {reason && <p className="mt-1 text-xs text-textMuted">{reason}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <Image size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">Base64 converter</h3>
        </div>
        <p className="mt-1 text-sm text-textSecondary">Upload gambar, hasilnya langsung jadi kode data URI Base64</p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-borderStrong px-4 py-8 text-sm text-textSecondary transition-colors hover:border-teal hover:text-textPrimary"
        >
          <Upload size={16} />
          {fileName ? fileName : 'Pilih gambar'}
        </button>

        {imageUrl && (
          <div className="mt-4 flex items-center gap-4">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-16 w-16 rounded-lg border border-border bg-surface2 object-contain"
            />
            <span className="text-xs text-textMuted">Otomatis ter-convert saat upload</span>
          </div>
        )}
      </div>

      {base64Code && (
        <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-sm font-medium text-textPrimary">Data URI Base64</h4>
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
            value={base64Code}
            rows={8}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textSecondary"
          />
        </div>
      )}
    </div>
  )
}
