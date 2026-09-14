'use client'

import { useRef, useState } from 'react'
import ImageTracer from 'imagetracerjs'
import { Upload, Copy, Check } from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'

export default function VectorizerUI() {
  const { enabled, reason } = useToolEnabled('svg-vectorizer')
  const [fileName, setFileName] = useState<string | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [svgCode, setSvgCode] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setFileName(file.name)
    setSvgCode(null)
    setCopied(false)
    const url = URL.createObjectURL(file)
    setImageUrl(url)
  }

  function handleGenerate() {
    if (!imageUrl) return
    setIsConverting(true)
    ImageTracer.imageToSVG(imageUrl, (svgstring: string) => {
      setSvgCode(svgstring)
      setIsConverting(false)
    })
  }

  function handleCopy() {
    if (!svgCode) return
    navigator.clipboard.writeText(svgCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (enabled === null) {
    return <div className="rounded-xl border border-border bg-surface p-5 text-sm text-textMuted">Memuat...</div>
  }

  if (!enabled) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display text-base font-medium text-textPrimary">SVG vectorizer</h3>
        <p className="mt-2 text-sm text-textMuted">Tool ini sedang dinonaktifkan admin</p>
        {reason && <p className="mt-1 text-xs text-textMuted">{reason}</p>}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display text-base font-medium text-textPrimary">SVG vectorizer</h3>
        <p className="mt-1 text-sm text-textSecondary">
          Upload logo PNG/JPG berlatar transparan, lalu generate kode SVG-nya
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleFileChange}
          className="hidden"
        />

        <button
          onClick={() => inputRef.current?.click()}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-borderStrong px-4 py-8 text-sm text-textSecondary transition-colors hover:border-teal hover:text-textPrimary"
        >
          <Upload size={16} />
          {fileName ? fileName : 'Pilih gambar PNG atau JPG'}
        </button>

        {imageUrl && (
          <div className="mt-4 flex items-center gap-4">
            <img
              src={imageUrl}
              alt="Preview"
              className="h-16 w-16 rounded-lg border border-border bg-surface2 object-contain"
            />
            <button
              onClick={handleGenerate}
              disabled={isConverting}
              className="rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
            >
              {isConverting ? 'Memproses...' : 'Generate Code'}
            </button>
          </div>
        )}
      </div>

      {svgCode && (
        <div className="rounded-xl border border-border bg-surface p-5">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-sm font-medium text-textPrimary">Kode SVG</h4>
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
            value={svgCode}
            rows={10}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textSecondary"
          />
        </div>
      )}
    </div>
  )
}
