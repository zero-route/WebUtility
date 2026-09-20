'use client'

import { useState } from 'react'

const TARGETS = [
  { name: 'Google', url: 'https://www.google.com/favicon.ico' },
  { name: 'Cloudflare', url: 'https://cloudflare.com/favicon.ico' },
  { name: 'GitHub', url: 'https://github.com/favicon.ico' },
  { name: 'Vercel', url: 'https://vercel.com/favicon.ico' }
]

type PingResult = {
  name: string
  latency: number | null
}

function getLatencyColor(latency: number | null) {
  if (latency === null) return 'text-red-400'
  if (latency < 150) return 'text-teal-light'
  if (latency < 400) return 'text-amber-400'
  return 'text-red-400'
}

export default function PingTester() {
  const [results, setResults] = useState<PingResult[]>([])
  const [isTesting, setIsTesting] = useState(false)

  async function handleTest() {
    setIsTesting(true)
    setResults(TARGETS.map((target) => ({ name: target.name, latency: null })))

    const pings = await Promise.all(
      TARGETS.map(async (target) => {
        const start = performance.now()
        try {
          await fetch(target.url, { mode: 'no-cors', cache: 'no-store' })
          return { name: target.name, latency: Math.round(performance.now() - start) }
        } catch {
          return { name: target.name, latency: null }
        }
      })
    )

    setResults(pings)
    setIsTesting(false)
  }

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleTest}
        disabled={isTesting}
        className="w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
      >
        {isTesting ? 'Menguji...' : 'Test latency'}
      </button>

      {results.length > 0 && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex flex-col gap-2">
            {results.map((result) => (
              <div
                key={result.name}
                className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2"
              >
                <span className="text-sm text-textPrimary">{result.name}</span>
                <span className={`font-mono text-sm ${getLatencyColor(result.latency)}`}>
                  {result.latency === null ? 'Timeout' : `${result.latency} ms`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
