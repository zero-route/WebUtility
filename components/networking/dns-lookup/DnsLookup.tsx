'use client'

import { useState } from 'react'

type DnsAnswer = {
  name: string
  type: number
  TTL: number
  data: string
}

const RECORD_TYPES = ['A', 'AAAA', 'MX', 'TXT', 'NS', 'CNAME']

export default function DnsLookup() {
  const [domain, setDomain] = useState('')
  const [results, setResults] = useState<Record<string, DnsAnswer[]>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLookup() {
    setError(null)
    setResults({})

    if (!domain.trim()) {
      setError('Masukkan nama domain')
      return
    }

    setIsLoading(true)

    try {
      const entries = await Promise.all(
        RECORD_TYPES.map(async (type) => {
          const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`)
          const data = await res.json()
          return [type, (data.Answer as DnsAnswer[]) || []] as const
        })
      )

      const grouped: Record<string, DnsAnswer[]> = {}
      entries.forEach(([type, answers]) => {
        if (answers.length > 0) grouped[type] = answers
      })

      setResults(grouped)

      if (Object.keys(grouped).length === 0) {
        setError('Tidak ada record DNS ditemukan untuk domain ini')
      }
    } catch {
      setError('Gagal mengambil data DNS')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          value={domain}
          onChange={(event) => setDomain(event.target.value)}
          placeholder="contoh.com"
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 text-sm text-textPrimary outline-none focus:border-teal"
        />
        <button
          onClick={handleLookup}
          disabled={isLoading}
          className="mt-3 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
        >
          {isLoading ? 'Mencari...' : 'Lookup'}
        </button>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {Object.entries(results).map(([type, answers]) => (
        <div key={type} className="rounded-lg border border-border bg-surface2 p-4">
          <h4 className="font-mono text-sm font-medium text-teal-light">{type}</h4>
          <div className="mt-2 flex flex-col gap-1">
            {answers.map((answer, index) => (
              <p key={index} className="break-all font-mono text-xs text-textSecondary">
                {answer.data}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
