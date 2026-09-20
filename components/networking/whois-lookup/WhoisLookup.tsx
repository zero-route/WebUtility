'use client'

import { useState } from 'react'

type RdapEvent = {
  eventAction: string
  eventDate: string
}

type RdapEntity = {
  roles?: string[]
  vcardArray?: unknown[]
  handle?: string
}

type RdapResponse = {
  ldhName?: string
  events?: RdapEvent[]
  entities?: RdapEntity[]
  nameservers?: { ldhName: string }[]
  status?: string[]
}

function getEventDate(events: RdapEvent[] | undefined, action: string): string | null {
  const event = events?.find((item) => item.eventAction === action)
  if (!event) return null
  return new Date(event.eventDate).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

function getRegistrarName(entities: RdapEntity[] | undefined): string | null {
  const registrar = entities?.find((entity) => entity.roles?.includes('registrar'))
  if (!registrar) return null

  const vcard = registrar.vcardArray
  if (Array.isArray(vcard) && Array.isArray(vcard[1])) {
    const fields = vcard[1] as unknown[]
    const fnField = fields.find((field) => Array.isArray(field) && field[0] === 'fn') as unknown[] | undefined
    if (fnField && typeof fnField[3] === 'string') return fnField[3]
  }

  return registrar.handle ?? null
}

export default function WhoisLookup() {
  const [domain, setDomain] = useState('')
  const [result, setResult] = useState<RdapResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleLookup() {
    setError(null)
    setResult(null)

    if (!domain.trim()) {
      setError('Masukkan nama domain')
      return
    }

    setIsLoading(true)

    try {
      const res = await fetch(`https://rdap.org/domain/${encodeURIComponent(domain)}`)

      if (!res.ok) {
        setError('Domain tidak ditemukan atau data RDAP tidak tersedia')
        return
      }

      const data = (await res.json()) as RdapResponse
      setResult(data)
    } catch {
      setError('Gagal mengambil data domain')
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

      {result && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="col-span-2">
              <p className="text-xs text-textMuted">Domain</p>
              <p className="mt-1 font-mono text-textPrimary">{result.ldhName ?? domain}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Registrar</p>
              <p className="mt-1 text-textPrimary">{getRegistrarName(result.entities) ?? 'Tidak diketahui'}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Terdaftar sejak</p>
              <p className="mt-1 text-textPrimary">{getEventDate(result.events, 'registration') ?? '-'}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Kedaluwarsa</p>
              <p className="mt-1 text-textPrimary">{getEventDate(result.events, 'expiration') ?? '-'}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Terakhir diubah</p>
              <p className="mt-1 text-textPrimary">{getEventDate(result.events, 'last changed') ?? '-'}</p>
            </div>
          </div>

          {result.nameservers && result.nameservers.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-textMuted">Nameserver</p>
              <div className="mt-1 flex flex-col gap-1">
                {result.nameservers.map((ns) => (
                  <p key={ns.ldhName} className="font-mono text-xs text-textSecondary">
                    {ns.ldhName}
                  </p>
                ))}
              </div>
            </div>
          )}

          {result.status && result.status.length > 0 && (
            <div className="mt-4">
              <p className="text-xs text-textMuted">Status</p>
              <div className="mt-1 flex flex-wrap gap-1">
                {result.status.map((status) => (
                  <span
                    key={status}
                    className="rounded-md border border-border bg-surface px-2 py-1 text-xs text-textSecondary"
                  >
                    {status}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
