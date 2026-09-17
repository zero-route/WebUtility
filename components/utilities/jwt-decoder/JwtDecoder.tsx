'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function base64UrlDecode(part: string): string {
  const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
  const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return new TextDecoder().decode(bytes)
}

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [expiryInfo, setExpiryInfo] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleDecode() {
    setError(null)
    setHeader('')
    setPayload('')
    setSignature('')
    setExpiryInfo(null)

    const parts = token.trim().split('.')

    if (parts.length !== 3) {
      setError('Format JWT tidak valid, harus terdiri dari 3 bagian dipisah titik')
      return
    }

    try {
      const headerJson = JSON.parse(base64UrlDecode(parts[0]))
      const payloadJson = JSON.parse(base64UrlDecode(parts[1]))

      setHeader(JSON.stringify(headerJson, null, 2))
      setPayload(JSON.stringify(payloadJson, null, 2))
      setSignature(parts[2])

      if (typeof payloadJson.exp === 'number') {
        const expiryDate = new Date(payloadJson.exp * 1000)
        const isExpired = expiryDate.getTime() < Date.now()
        setExpiryInfo(
          `${isExpired ? 'Kedaluwarsa' : 'Berlaku sampai'} ${expiryDate.toLocaleString('id-ID')}`
        )
      }
    } catch {
      setError('Gagal decode token, pastikan format JWT benar')
    }
  }

  function handleCopy(text: string) {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <textarea
          value={token}
          onChange={(event) => setToken(event.target.value)}
          placeholder="Tempel JWT di sini, contoh: eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMifQ.signature"
          rows={4}
          className="w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textPrimary outline-none focus:border-teal"
        />

        <button
          onClick={handleDecode}
          className="mt-3 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
        >
          Decode
        </button>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {payload && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-textPrimary">Payload</h4>
            <button
              onClick={() => handleCopy(payload)}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Tersalin' : 'Copy'}
            </button>
          </div>
          {expiryInfo && <p className="mt-1 text-xs text-teal-light">{expiryInfo}</p>}
          <textarea
            readOnly
            value={payload}
            rows={6}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-surface p-3 font-mono text-xs text-textSecondary"
          />
        </div>
      )}

      {header && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <h4 className="text-sm font-medium text-textPrimary">Header</h4>
          <textarea
            readOnly
            value={header}
            rows={4}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-surface p-3 font-mono text-xs text-textSecondary"
          />
        </div>
      )}

      {signature && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <h4 className="text-sm font-medium text-textPrimary">Signature</h4>
          <p className="mt-2 text-xs text-textMuted">Nggak bisa diverifikasi tanpa secret key, cuma ditampilkan mentah</p>
          <p className="mt-2 break-all rounded-lg border border-border bg-surface p-3 font-mono text-xs text-textSecondary">
            {signature}
          </p>
        </div>
      )}
    </div>
  )
}
