'use client'

import { useState } from 'react'

function normalizeMac(input: string): string | null {
  const hex = input.replace(/[^a-fA-F0-9]/g, '')
  if (hex.length < 6) return null
  return hex.slice(0, 12).toUpperCase()
}

export default function MacVendorLookup() {
  const [input, setInput] = useState('')
  const [vendor, setVendor] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLookup() {
    setError(null)
    setVendor(null)

    const normalized = normalizeMac(input)
    if (!normalized) {
      setError('Format MAC address tidak valid')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(`https://api.macvendors.com/${normalized}`)

      if (res.status === 404) {
        setError('Vendor tidak ditemukan untuk MAC address ini')
        return
      }

      if (!res.ok) {
        setError('Gagal mengambil data vendor, coba lagi sebentar lagi')
        return
      }

      const text = await res.text()
      setVendor(text)
    } catch {
      setError('Gagal mengambil data vendor')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Contoh: 00:1A:2B:3C:4D:5E"
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
        />
        <button
          onClick={handleLookup}
          disabled={isLoading}
          className="mt-3 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
        >
          {isLoading ? 'Mencari...' : 'Cari vendor'}
        </button>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {vendor && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <p className="text-xs text-textMuted">Vendor</p>
          <p className="mt-1 text-sm text-textPrimary">{vendor}</p>
        </div>
      )}
    </div>
  )
}
