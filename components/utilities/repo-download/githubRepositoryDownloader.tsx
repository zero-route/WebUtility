'use client'

import { useState } from 'react'
import {
  AlertCircle,
  CheckCircle2,
  Download,
  Github,
  Loader2
} from 'lucide-react'

type Status = 'idle' | 'checking' | 'success' | 'error'

interface ParsedRepo {
  owner: string
  repo: string
  branch: string | null
}

function parseGithubUrl(raw: string): ParsedRepo | null {
  const trimmed = raw.trim()

  if (!trimmed) return null

  const cleaned = trimmed
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')

  const match = cleaned.match(
    /^github\.com\/([^/\s#?]+)\/([^/\s#?]+?)(?:\.git)?(?:\/(?:tree|blob)\/([^/\s#?]+))?(?:[/#?].*)?$/i
  )

  if (!match) return null

  const [, owner, repo, branch] = match

  return {
    owner,
    repo,
    branch: branch ? decodeURIComponent(branch) : null
  }
}

function triggerDownload(url: string) {
  const link = document.createElement('a')

  link.href = url
  link.rel = 'noopener'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function GithubRepositoryDownloader() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [resolved, setResolved] = useState<ParsedRepo | null>(null)
  const [manualLink, setManualLink] = useState<string | null>(null)

  const handleDownload = async () => {
    setStatus('checking')
    setMessage('')
    setResolved(null)
    setManualLink(null)

    const parsed = parseGithubUrl(url)

    if (!parsed) {
      setStatus('error')
      setMessage(
        'URL GitHub tidak valid. Contoh format yang benar: https://github.com/owner/nama-repo'
      )
      return
    }

    let branch = parsed.branch

    try {
      if (!branch) {
        const res = await fetch(
          `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`
        )

        if (res.status === 404) {
          setStatus('error')
          setMessage(
            'Repository tidak ditemukan. Pastikan URL benar dan repo bersifat publik.'
          )
          return
        }

        if (res.status === 403) {
          setStatus('error')
          setMessage(
            'Terlalu banyak permintaan ke GitHub API saat ini. Coba lagi beberapa menit lagi, atau tambahkan nama branch langsung di URL (contoh: .../tree/main).'
          )
          return
        }

        if (!res.ok) {
          setStatus('error')
          setMessage('Gagal mengambil info repository dari GitHub.')
          return
        }

        const data: { default_branch?: string } = await res.json()

        branch = data.default_branch ?? null

        if (!branch) {
          setStatus('error')
          setMessage(
            'Branch default repository tidak dapat ditemukan. Tambahkan branch secara langsung pada URL repository.'
          )
          return
        }
      }

      const resolvedBranch = branch

      if (!resolvedBranch) {
        setStatus('error')
        setMessage(
          'Branch repository tidak dapat ditentukan. Coba gunakan URL dengan nama branch, misalnya /tree/main.'
        )
        return
      }

      const zipUrl =
        `https://codeload.github.com/${parsed.owner}/${parsed.repo}` +
        `/zip/refs/heads/${encodeURIComponent(resolvedBranch)}`

      triggerDownload(zipUrl)

      setResolved({
        owner: parsed.owner,
        repo: parsed.repo,
        branch: resolvedBranch
      })

      setManualLink(zipUrl)
      setStatus('success')
      setMessage(
        'Download dimulai. Kalau tidak otomatis berjalan, pakai tautan manual di bawah.'
      )
    } catch {
      setStatus('error')
      setMessage(
        'Gagal terhubung ke GitHub. Cek koneksi internet kamu dan coba lagi.'
      )
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!url.trim() || status === 'checking') return

    handleDownload()
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full border border-borderStrong bg-surface2 text-textPrimary">
          <Github size={21} strokeWidth={1.6} />
        </div>

        <div>
          <h3 className="font-display text-base font-medium text-textPrimary">
            GitHub Repository Downloader
          </h3>

          <p className="mt-1 text-sm text-textMuted">
            Unduh seluruh isi repository GitHub sebagai file ZIP
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6">
        <label
          htmlFor="github-repo-url"
          className="text-xs font-medium uppercase tracking-[0.1em] text-textMuted"
        >
          URL Repository
        </label>

        <div className="mt-2 flex flex-col gap-3 sm:flex-row">
          <input
            id="github-repo-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/owner/nama-repo"
            className="w-full rounded-xl border border-border bg-surface2 px-4 py-3 text-sm text-textPrimary placeholder:text-textMuted outline-none transition-colors focus:border-teal/50"
          />

          <button
            type="submit"
            disabled={!url.trim() || status === 'checking'}
            className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-textPrimary px-5 py-3 text-sm font-medium text-surface transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
          >
            {status === 'checking' ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Download size={16} />
            )}

            Download ZIP
          </button>
        </div>

        <p className="mt-2 text-xs text-textMuted">
          Cukup tempel link repo (boleh dengan atau tanpa{' '}
          <code>/tree/branch</code>). Hanya untuk repository publik.
        </p>
      </form>

      {status === 'error' && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0 text-red-400"
          />

          <p className="text-sm leading-5 text-red-200">{message}</p>
        </div>
      )}

      {status === 'success' && resolved && (
        <div className="mt-4 flex items-start gap-3 rounded-xl border border-teal/20 bg-teal/5 p-4">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0 text-teal-light"
          />

          <div className="text-sm leading-5 text-textSecondary">
            <p>{message}</p>

            <p className="mt-1 font-mono text-xs text-textMuted">
              {resolved.owner}/{resolved.repo}@{resolved.branch}
            </p>

            {manualLink && (
              <a
                href={manualLink}
                className="mt-2 inline-block text-xs font-medium text-teal-light underline underline-offset-2"
              >
                Buka tautan download manual
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  )
}