'use client'

import { useRef, useState } from 'react'
import QRCode from 'qrcode'
import { Upload, Download, QrCode } from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'

export default function QrUI() {
  const { enabled, reason } = useToolEnabled('qr-barcode-generator')
  const [text, setText] = useState('')
  const [logoUrl, setLogoUrl] = useState<string | null>(null)
  const [qrDataUrl, setQrDataUrl] = useState<string | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const logoInputRef = useRef<HTMLInputElement>(null)

  function handleLogoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setLogoUrl(url)
  }

  function handleGenerate() {
    if (!text.trim() || !canvasRef.current) return
    setIsGenerating(true)

    QRCode.toCanvas(
      canvasRef.current,
      text,
      { errorCorrectionLevel: 'H', width: 320, margin: 2 },
      (error) => {
        if (error) {
          setIsGenerating(false)
          return
        }

        const canvas = canvasRef.current
        if (!canvas) return

        if (!logoUrl) {
          setQrDataUrl(canvas.toDataURL('image/png'))
          setIsGenerating(false)
          return
        }

        const ctx = canvas.getContext('2d')
        const logo = new Image()
        logo.onload = () => {
          if (!ctx) return
          const size = canvas.width * 0.2
          const x = (canvas.width - size) / 2
          const y = (canvas.height - size) / 2
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(x - 6, y - 6, size + 12, size + 12)
          ctx.drawImage(logo, x, y, size, size)
          setQrDataUrl(canvas.toDataURL('image/png'))
          setIsGenerating(false)
        }
        logo.src = logoUrl
      }
    )
  }

  if (enabled === null) {
    return <div className="rounded-xl border border-border bg-surface p-5 text-sm text-textMuted">Memuat...</div>
  }

  if (!enabled) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <QrCode size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">QR and barcode generator</h3>
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
            <QrCode size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">QR and barcode generator</h3>
        </div>
        <p className="mt-1 text-sm text-textSecondary">Masukkan link atau teks, opsional tambahkan logo di tengah QR</p>

        <input
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="https://contoh.com"
          className="mt-4 w-full rounded-lg border border-border bg-surface2 px-3 py-2 text-sm text-textPrimary outline-none focus:border-teal"
        />

        <input
          ref={logoInputRef}
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleLogoChange}
          className="hidden"
        />

        <button
          onClick={() => logoInputRef.current?.click()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-borderStrong px-4 py-3 text-sm text-textSecondary transition-colors hover:border-teal hover:text-textPrimary"
        >
          <Upload size={16} />
          {logoUrl ? 'Logo terpilih' : 'Tambah logo (opsional)'}
        </button>

        <button
          onClick={handleGenerate}
          disabled={!text.trim() || isGenerating}
          className="mt-3 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
        >
          {isGenerating ? 'Memproses...' : 'Generate QR'}
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {qrDataUrl && (
        <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
          <div className="flex flex-col items-center gap-4">
            <img src={qrDataUrl} alt="QR code" className="h-48 w-48 rounded-lg bg-white p-2" />
            <a
              href={qrDataUrl}
              download="qrcode.png"
              className="flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-textSecondary hover:text-textPrimary"
            >
              <Download size={14} />
              Download PNG
            </a>
          </div>
        </div>
      )}
    </div>
  )
}
