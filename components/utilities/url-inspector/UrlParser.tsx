'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

type ParsedUrl = {
  protocol: string
  host: string
  pathname: string
  hash: string
  params: { key: string; value: string }[]
}

export default function UrlParser() {
  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState<ParsedUrl | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  function handleParse() {
    setError(null)
    setParsed(null)

    try {
      const url = new URL(input)
      const params = Array.from(url.searchParams.entries()).map(([key, value]) => ({ key, value }))

      setParsed({
        protocol: url.protocol.replace(':', ''),
        host: url.host,
        pathname: url.pathname,
        hash: url.hash,
        params
      })
    } catch {
      setError('URL tidak valid, pastikan termasuk https:// atau http://')
    }
  }

  function handleCopy(key: string, value: string) {
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="https://contoh.com/produk?utm_source=ig&utm_campaign=promo"
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 text-sm text-textPrimary outline-none focus:border-teal"
        />
        <button
          onClick={handleParse}
          className="mt-3 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
        >
          Parse
        </button>
        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {parsed && (
        <div className="flex flex-col gap-3">
          <div className="rounded-lg border border-border bg-surface2 p-4">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-textMuted">Protokol</p>
                <p className="mt-1 font-mono text-textPrimary">{parsed.protocol}</p>
              </div>
              <div>
                <p className="text-xs text-textMuted">Host</p>
                <p className="mt-1 break-all font-mono text-textPrimary">{parsed.host}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-textMuted">Path</p>
                <p className="mt-1 break-all font-mono text-textPrimary">{parsed.pathname || '/'}</p>
              </div>
              {parsed.hash && (
                <div className="col-span-2">
                  <p className="text-xs text-textMuted">Fragment</p>
                  <p className="mt-1 break-all font-mono text-textPrimary">{parsed.hash}</p>
                </div>
              )}
            </div>
          </div>

          {parsed.params.length > 0 && (
            <div className="rounded-lg border border-border bg-surface2 p-4">
              <h4 className="text-sm font-medium text-textPrimary">Query parameters</h4>
              <div className="mt-3 flex flex-col gap-2">
                {parsed.params.map((param, index) => (
                  <div
                    key={`${param.key}-${index}`}
                    className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="font-mono text-xs text-teal-light">{param.key}</p>
                      <p className="truncate font-mono text-xs text-textSecondary">{param.value}</p>
                    </div>
                    <button
                      onClick={() => handleCopy(param.key, param.value)}
                      className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
                    >
                      {copiedKey === param.key ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
