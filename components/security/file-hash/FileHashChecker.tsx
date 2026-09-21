'use client'

import { useRef, useState } from 'react'
import { Copy, Check, Upload } from 'lucide-react'
import { generateFileHash, HASH_ALGORITHMS, HashAlgorithm } from '@/lib/hash'

export default function FileHashChecker() {
  const [algorithm, setAlgorithm] = useState<HashAlgorithm>('SHA-256')
  const [fileName, setFileName] = useState<string | null>(null)
  const [hash, setHash] = useState<string | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [copied, setCopied] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setHash(null)
    setIsProcessing(true)

    const result = await generateFileHash(file, algorithm)
    setHash(result)
    setIsProcessing(false)
  }

  function handleCopy() {
    if (!hash) return
    navigator.clipboard.writeText(hash)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <div className="flex flex-wrap gap-2">
          {HASH_ALGORITHMS.map((algo) => (
            <button
              key={algo}
              onClick={() => setAlgorithm(algo)}
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

        <input ref={fileInputRef} type="file" onChange={handleFileChange} className="hidden" />
        <button
          onClick={() => fileInputRef.current?.click()}
          className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-borderStrong px-4 py-8 text-sm text-textSecondary transition-colors hover:border-teal hover:text-textPrimary"
        >
          <Upload size={16} />
          {fileName ? fileName : 'Pilih file'}
        </button>
      </div>

      {isProcessing && <p className="text-xs text-textMuted">Menghitung hash...</p>}

      {hash && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-textPrimary">Hash ({algorithm})</h4>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Tersalin' : 'Copy'}
            </button>
          </div>
          <p className="mt-2 break-all font-mono text-xs text-textSecondary">{hash}</p>
        </div>
      )}
    </div>
  )
}
