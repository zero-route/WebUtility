'use client'

import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import { Copy, Check, Trash2 } from 'lucide-react'

const STORAGE_KEY = 'kitbox-markdown-notes'

const SANITIZE_CONFIG = {
  ALLOWED_TAGS: [
    'a',
    'blockquote',
    'br',
    'code',
    'del',
    'em',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'li',
    'ol',
    'p',
    'pre',
    'strong',
    'ul'
  ],
  ALLOWED_ATTR: [
    'href',
    'title',
    'target',
    'rel'
  ],
  FORBID_TAGS: [
    'script',
    'style',
    'iframe',
    'object',
    'embed',
    'form',
    'input',
    'button',
    'textarea',
    'select',
    'option',
    'video',
    'audio',
    'source',
    'svg',
    'math'
  ],
  FORBID_ATTR: [
    'style',
    'id',
    'class',
    'src',
    'srcset',
    'onerror',
    'onload',
    'onclick',
    'onmouseover',
    'onfocus',
    'onmouseenter',
    'onmouseleave'
  ],
  ALLOW_DATA_ATTR: false
}

export default function MarkdownNotes() {
  const [markdown, setMarkdown] = useState('')
  const [tab, setTab] = useState<'write' | 'preview'>('write')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)

    if (saved) {
      setMarkdown(saved)
    }
  }, [])

  const renderedHtml = useMemo(() => {
    const rawHtml = marked.parse(
      markdown || '_Belum ada catatan_'
    ) as string

    return DOMPurify.sanitize(rawHtml, SANITIZE_CONFIG)
  }, [markdown])

  function handleChange(value: string) {
    setMarkdown(value)
    localStorage.setItem(STORAGE_KEY, value)
  }

  function handleClear() {
    setMarkdown('')
    localStorage.removeItem(STORAGE_KEY)
  }

  async function handleCopy() {
    if (!markdown) return

    await navigator.clipboard.writeText(markdown)

    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div>
      <div className="flex gap-2">
        <button
          onClick={() => setTab('write')}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            tab === 'write'
              ? 'border border-teal bg-teal/10 text-teal-light'
              : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
          }`}
        >
          Tulis
        </button>

        <button
          onClick={() => setTab('preview')}
          className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
            tab === 'preview'
              ? 'border border-teal bg-teal/10 text-teal-light'
              : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
          }`}
        >
          Preview
        </button>
      </div>

      {tab === 'write' ? (
        <textarea
          value={markdown}
          onChange={(event) => handleChange(event.target.value)}
          placeholder="Tulis catatan pakai Markdown, contoh: # Judul, **bold**, - list"
          rows={12}
          className="mt-3 w-full resize-none rounded-lg border border-border bg-surface2 p-3 font-mono text-sm text-textPrimary outline-none focus:border-teal"
        />
      ) : (
        <div
          className="mt-3 min-h-[280px] rounded-lg border border-border bg-surface2 p-4 text-sm text-textPrimary [&_a]:text-teal-light [&_a]:underline [&_blockquote]:border-l-2 [&_blockquote]:border-border [&_blockquote]:pl-3 [&_blockquote]:text-textMuted [&_code]:rounded [&_code]:bg-surface [&_code]:px-1 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-xs [&_h1]:mb-2 [&_h1]:font-display [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:mb-2 [&_h2]:font-display [&_h2]:text-base [&_h2]:font-semibold [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-2 [&_strong]:font-semibold [&_ul]:list-disc [&_ul]:pl-5"
          dangerouslySetInnerHTML={{
            __html: renderedHtml
          }}
        />
      )}

      <div className="mt-3 flex gap-2">
        <button
          onClick={handleCopy}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border px-3 py-2 text-xs text-textSecondary hover:text-textPrimary"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}

          {copied ? 'Tersalin' : 'Copy'}
        </button>

        <button
          onClick={handleClear}
          className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-border px-3 py-2 text-xs text-textSecondary hover:text-textPrimary"
        >
          <Trash2 size={12} />

          Hapus
        </button>
      </div>
    </div>
  )
}