'use client'

import { useState } from 'react'

type FlagKey = 'g' | 'i' | 'm' | 's'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [text, setText] = useState('')
  const [flags, setFlags] = useState<Record<FlagKey, boolean>>({
    g: true,
    i: false,
    m: false,
    s: false
  })
  const [error, setError] = useState<string | null>(null)

  function toggleFlag(flag: FlagKey) {
    setFlags((prev) => ({ ...prev, [flag]: !prev[flag] }))
  }

  function getFlagString() {
    const active = (Object.keys(flags) as FlagKey[]).filter((key) => flags[key])
    return active.includes('g') ? active.join('') : active.join('') + 'g'
  }

  let matches: RegExpMatchArray[] = []
  let regexError: string | null = null

  if (pattern) {
    try {
      const regex = new RegExp(pattern, getFlagString())
      matches = Array.from(text.matchAll(regex))
    } catch (err) {
      regexError = err instanceof Error ? err.message : 'Pola regex tidak valid'
    }
  }

  const segments: { text: string; isMatch: boolean }[] = []
  if (pattern && !regexError && text) {
    let lastIndex = 0
    matches.forEach((match) => {
      const start = match.index ?? 0
      const end = start + match[0].length
      if (start > lastIndex) segments.push({ text: text.slice(lastIndex, start), isMatch: false })
      segments.push({ text: match[0], isMatch: true })
      lastIndex = end
    })
    if (lastIndex < text.length) segments.push({ text: text.slice(lastIndex), isMatch: false })
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          value={pattern}
          onChange={(event) => setPattern(event.target.value)}
          placeholder="Contoh: \d+"
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
        />

        <div className="mt-2 flex gap-2">
          {(['g', 'i', 'm', 's'] as FlagKey[]).map((flag) => (
            <button
              key={flag}
              onClick={() => toggleFlag(flag)}
              className={`rounded-lg px-3 py-1.5 font-mono text-xs font-medium transition-colors ${
                flags[flag]
                  ? 'border border-teal bg-teal/10 text-teal-light'
                  : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
              }`}
            >
              {flag}
            </button>
          ))}
        </div>

        <textarea
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Tempel teks yang mau dicek di sini"
          rows={5}
          className="mt-3 w-full resize-none rounded-lg border border-border bg-surface2 p-3 text-sm text-textPrimary outline-none focus:border-teal"
        />

        {regexError && <p className="mt-2 text-xs text-red-400">{regexError}</p>}
      </div>

      {text && pattern && !regexError && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <h4 className="text-sm font-medium text-textPrimary">Preview</h4>
          <p className="mt-3 whitespace-pre-wrap break-all text-sm leading-6 text-textSecondary">
            {segments.map((segment, index) =>
              segment.isMatch ? (
                <span key={index} className="rounded bg-teal/20 px-0.5 text-teal-light">
                  {segment.text}
                </span>
              ) : (
                <span key={index}>{segment.text}</span>
              )
            )}
          </p>
        </div>
      )}

      {matches.length > 0 && !regexError && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <h4 className="text-sm font-medium text-textPrimary">{matches.length} match ditemukan</h4>
          <div className="mt-3 flex flex-col gap-2">
            {matches.map((match, index) => (
              <div key={index} className="rounded-lg border border-border bg-surface px-3 py-2">
                <p className="font-mono text-xs text-teal-light">{match[0]}</p>
                <p className="mt-1 text-xs text-textMuted">
                  Posisi {match.index}
                  {match.length > 1 && ` · Group: ${match.slice(1).join(', ')}`}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
