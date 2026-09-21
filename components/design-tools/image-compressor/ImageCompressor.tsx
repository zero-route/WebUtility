'use client'

import { useRef, useState } from 'react'
import { Upload, Download } from 'lucide-react'

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

export default function ImageCompressor() {
  const [originalSize, setOriginalSize] = useState<number | null>(null)
  const [compressedSize, setCompressedSize] = useState<number | null>(null)
  const [compressedUrl, setCompressedUrl] = useState<string | null>(null)
  const [quality, setQuality] = useState(0.7)
  const [fileName, setFileName] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const imageRef = useRef<HTMLImageElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  function compress(image: HTMLImageElement, quality: number) {
    const canvas = document.createElement('canvas')
    canvas.width = image.naturalWidth
    canvas.height = image.naturalHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.drawImage(image, 0, 0)

    canvas.toBlob(
      (blob) => {
        if (!blob) return
        setCompressedSize(blob.size)
        setCompressedUrl(URL.createObjectURL(blob))
        setIsProcessing(false)
      },
      'image/jpeg',
      quality
    )
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setOriginalSize(file.size)
    setCompressedUrl(null)
    setCompressedSize(null)
    setIsProcessing(true)

    const url = URL.createObjectURL(file)
    const image = new Image()
    image.onload = () => {
      imageRef.current = image
      compress(image, quality)
    }
    image.src = url
  }

  function handleQualityChange(value: number) {
    setQuality(value)
    if (imageRef.current) {
      setIsProcessing(true)
      compress(imageRef.current, value)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-borderStrong px-4 py-8 text-sm text-textSecondary transition-colors hover:border-teal hover:text-textPrimary"
        >
          <Upload size={16} />
          {fileName ? fileName : 'Pilih gambar'}
        </button>

        {originalSize !== null && (
          <div className="mt-3">
            <div className="flex items-center justify-between">
              <p className="text-xs text-textMuted">Kualitas</p>
              <span className="font-mono text-xs text-teal-light">{Math.round(quality * 100)}%</span>
            </div>
            <input
              type="range"
              min={0.1}
              max={1}
              step={0.05}
              value={quality}
              onChange={(event) => handleQualityChange(Number(event.target.value))}
              className="mt-2 w-full accent-teal"
            />
          </div>
        )}
      </div>

      {isProcessing && <p className="text-xs text-textMuted">Memproses...</p>}

      {compressedUrl && originalSize !== null && compressedSize !== null && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex items-center justify-center">
            <img src={compressedUrl} alt="Hasil kompres" className="max-h-48 rounded-lg" />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-textMuted">Ukuran asli</p>
              <p className="mt-1 font-mono text-textPrimary">{formatSize(originalSize)}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Ukuran baru</p>
              <p className="mt-1 font-mono text-teal-light">{formatSize(compressedSize)}</p>
            </div>
          </div>
          <a
            href={compressedUrl}
            download={fileName ? `compressed-${fileName.replace(/\.[^.]+$/, '')}.jpg` : 'compressed.jpg'}
            className="mt-4 flex items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-textSecondary hover:text-textPrimary"
          >
            <Download size={14} />
            Download
          </a>
        </div>
      )}
    </div>
  )
}
