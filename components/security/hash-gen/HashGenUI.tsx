'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import { generateHash, HASH_ALGORITHMS, HashAlgorithm } from '@/lib/hash'

export default function HashGenUI() {
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256')
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  async function handleInputChange(value: string) {
    setInput(value)
    if (!value) {
      setOutput('')
      return
    }
    const hash = await generateHash(value, algorithm)
    setOutput(hash)
  }

  async function handleAlgorithmChange(next: HashAlgorithm) {
    setAlgorithm(next)
    if (input) {
      const hash = await generateHash(input, next)
      setOutput(hash)
    }
  }

  function handleCopy() {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {HASH_ALGORITHMS.map((algo) => (
          <button
            key={algo}
            onClick={() => handleAlgorithmChange(algo)}
            className={`rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              algorithm === algo
                ? 'border border-teal bg-teal/10 text-teal-light'
                : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
            }`}
          >
            {algo}
          </button>
        ))}
      </div>

      <textarea
        value={input}
        onChange={(event) => handleInputChange(event.target.value)}
        placeholder="Masukkan teks yang mau di-hash"
        rows={4}
        className="mt-4 w-full resize-none rounded-lg border border-border bg-surface2 p-3 text-sm text-textPrimary outline-none focus:border-teal"
      />

      {output && (
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-textMuted">Hasil ({algorithm})</p>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Tersalin' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 break-all rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textSecondary">
            {output}
          </p>
        </div>
      )}
    </div>
  )
}
