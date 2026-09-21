'use client'

import { useState } from 'react'

type DiffLine = {
  type: 'same' | 'added' | 'removed'
  text: string
}

function computeDiff(original: string, modified: string): DiffLine[] {
  const a = original.split('\n')
  const b = modified.split('\n')
  const m = a.length
  const n = b.length

  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0))

  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1])
    }
  }

  const result: DiffLine[] = []
  let i = 0
  let j = 0

  while (i < m && j < n) {
    if (a[i] === b[j]) {
      result.push({ type: 'same', text: a[i] })
      i++
      j++
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      result.push({ type: 'removed', text: a[i] })
      i++
    } else {
      result.push({ type: 'added', text: b[j] })
      j++
    }
  }

  while (i < m) {
    result.push({ type: 'removed', text: a[i] })
    i++
  }

  while (j < n) {
    result.push({ type: 'added', text: b[j] })
    j++
  }

  return result
}

export default function TextDiffChecker() {
  const [original, setOriginal] = useState('')
  const [modified, setModified] = useState('')
  const [diff, setDiff] = useState<DiffLine[] | null>(null)

  function handleCompare() {
    setDiff(computeDiff(original, modified))
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-xs text-textMuted">Teks asli</p>
        <textarea
          value={original}
          onChange={(event) => setOriginal(event.target.value)}
          rows={5}
          className="mt-1 w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textPrimary outline-none focus:border-teal"
        />
      </div>

      <div>
        <p className="text-xs text-textMuted">Teks baru</p>
        <textarea
          value={modified}
          onChange={(event) => setModified(event.target.value)}
          rows={5}
          className="mt-1 w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-xs text-textPrimary outline-none focus:border-teal"
        />
      </div>

      <button
        onClick={handleCompare}
        className="w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
      >
        Bandingkan
      </button>

      {diff && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex flex-col gap-0.5 font-mono text-xs">
            {diff.map((line, index) => (
              <div
                key={index}
                className={
                  line.type === 'added'
                    ? 'rounded bg-teal/10 px-2 py-0.5 text-teal-light'
                    : line.type === 'removed'
                      ? 'rounded bg-red-400/10 px-2 py-0.5 text-red-400 line-through'
                      : 'px-2 py-0.5 text-textSecondary'
                }
              >
                {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}
                {line.text || ' '}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
