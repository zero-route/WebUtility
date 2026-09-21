'use client'

import { useState } from 'react'
import { Copy, Check, RefreshCw } from 'lucide-react'

export default function UuidGenerator() {
  const [count, setCount] = useState(5)
  const [uuids, setUuids] = useState<string[]>([])
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const [copiedAll, setCopiedAll] = useState(false)

  function handleGenerate() {
    const list = Array.from({ length: count }, () => crypto.randomUUID())
    setUuids(list)
    setCopiedIndex(null)
    setCopiedAll(false)
  }

  function handleCopyOne(index: number) {
    navigator.clipboard.writeText(uuids[index])
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  function handleCopyAll() {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopiedAll(true)
    setTimeout(() => setCopiedAll(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex items-center gap-3">
          <input
            type="number"
            min={1}
            max={50}
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className="w-24 rounded-lg border border-border bg-surface2 px-3 py-2 text-sm text-textPrimary outline-none focus:border-teal"
          />
          <span className="text-xs text-textMuted">jumlah UUID (max 50)</span>
        </div>
        <button
          onClick={handleGenerate}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
        >
          <RefreshCw size={14} />
          Generate
        </button>
      </div>

      {uuids.length > 0 && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-textPrimary">{uuids.length} UUID</h4>
            <button
              onClick={handleCopyAll}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
            >
              {copiedAll ? <Check size={12} /> : <Copy size={12} />}
              {copiedAll ? 'Tersalin' : 'Copy semua'}
            </button>
          </div>
          <div className="mt-3 flex flex-col gap-1">
            {uuids.map((uuid, index) => (
              <div
                key={uuid}
                className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2"
              >
                <span className="font-mono text-xs text-textSecondary">{uuid}</span>
                <button
                  onClick={() => handleCopyOne(index)}
                  className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
                >
                  {copiedIndex === index ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
