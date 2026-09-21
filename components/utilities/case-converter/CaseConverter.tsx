'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function splitWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_\-]+/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.toLowerCase())
}

function toCamelCase(words: string[]) {
  return words
    .map((word, index) => (index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)))
    .join('')
}

function toPascalCase(words: string[]) {
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('')
}

function toSnakeCase(words: string[]) {
  return words.join('_')
}

function toKebabCase(words: string[]) {
  return words.join('-')
}

function toTitleCase(words: string[]) {
  return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export default function CaseConverter() {
  const [input, setInput] = useState('')
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const words = splitWords(input)

  const results = input
    ? [
        { key: 'camel', label: 'camelCase', value: toCamelCase(words) },
        { key: 'pascal', label: 'PascalCase', value: toPascalCase(words) },
        { key: 'snake', label: 'snake_case', value: toSnakeCase(words) },
        { key: 'kebab', label: 'kebab-case', value: toKebabCase(words) },
        { key: 'title', label: 'Title Case', value: toTitleCase(words) },
        { key: 'upper', label: 'UPPER CASE', value: input.toUpperCase() },
        { key: 'lower', label: 'lower case', value: input.toLowerCase() }
      ]
    : []

  function handleCopy(key: string, value: string) {
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={input}
        onChange={(event) => setInput(event.target.value)}
        placeholder="Masukkan teks, misal: hello world example"
        rows={3}
        className="w-full resize-none rounded-lg border border-border bg-surface2 p-3 text-sm text-textPrimary outline-none focus:border-teal"
      />

      {results.length > 0 && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="flex flex-col gap-2">
            {results.map((result) => (
              <div
                key={result.key}
                className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="text-xs text-textMuted">{result.label}</p>
                  <p className="truncate font-mono text-sm text-textPrimary">{result.value}</p>
                </div>
                <button
                  onClick={() => handleCopy(result.key, result.value)}
                  className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
                >
                  {copiedKey === result.key ? <Check size={12} /> : <Copy size={12} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
