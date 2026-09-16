'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function JsonTool() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  function handleFormat() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, 2))
      setError(null)
    } catch (err) {
      setOutput('')
      setError(err instanceof Error ? err.message : 'JSON tidak valid')
    }
  }

  function handleMinify() {
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed))
      setError(null)
    } catch (err) {
      setOutput('')
      setError(err instanceof Error ? err.message : 'JSON tidak valid')
    }
  }

  function handleCopy() {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder='Tempel JSON di sini, contoh: {"nama":"budi","umur":25}'
          rows={8}
          className="w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textPrimary outline-none focus:border-teal"
        />

        <div className="mt-3 flex gap-2">
          <button
            onClick={handleFormat}
            className="flex-1 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
          >
            Format
          </button>
          <button
            onClick={handleMinify}
            className="flex-1 rounded-lg border border-border px-4 py-2 text-sm font-medium text-textSecondary transition-colors hover:border-teal/40 hover:text-textPrimary"
          >
            Minify
          </button>
        </div>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {output && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-textPrimary">Hasil</h4>
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
            value={output}
            rows={10}
            className="mt-3 w-full resize-none rounded-lg border border-border bg-surface p-3 font-mono text-xs text-textSecondary"
          />
        </div>
      )}
    </div>
  )
}
