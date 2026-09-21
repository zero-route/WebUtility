'use client'

import { useEffect, useState } from 'react'
import { Check, Copy, Globe2, Network } from 'lucide-react'

function InternetGlobe() {
  return (
    <div className="pointer-events-none absolute -right-4 top-1/2 h-48 w-48 -translate-y-1/2 opacity-[0.13]">
      <svg viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <radialGradient id="globeFade">
            <stop offset="0%" stopColor="white" stopOpacity="0.18" />
            <stop offset="65%" stopColor="white" stopOpacity="0.04" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="82" fill="url(#globeFade)" />

        <circle
          cx="100"
          cy="100"
          r="67"
          fill="none"
          stroke="white"
          strokeOpacity="0.3"
          strokeWidth="1"
        />

        <ellipse
          cx="100"
          cy="100"
          rx="67"
          ry="27"
          fill="none"
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <ellipse
          cx="100"
          cy="100"
          rx="67"
          ry="48"
          fill="none"
          stroke="white"
          strokeOpacity="0.14"
          strokeWidth="1"
        />

        <ellipse
          cx="100"
          cy="100"
          rx="25"
          ry="67"
          fill="none"
          stroke="white"
          strokeOpacity="0.18"
          strokeWidth="1"
        />

        <ellipse
          cx="100"
          cy="100"
          rx="47"
          ry="67"
          fill="none"
          stroke="white"
          strokeOpacity="0.13"
          strokeWidth="1"
        />

        <path
          d="M35 83 C65 66 137 62 168 83"
          fill="none"
          stroke="white"
          strokeOpacity="0.1"
        />

        <path
          d="M34 117 C67 136 137 139 168 117"
          fill="none"
          stroke="white"
          strokeOpacity="0.1"
        />

        <path
          d="M31 100 H169"
          fill="none"
          stroke="white"
          strokeOpacity="0.1"
        />

        <circle cx="100" cy="100" r="3" fill="white" fillOpacity="0.5" />
        <circle cx="100" cy="100" r="6" fill="none" stroke="white" strokeOpacity="0.18" />

        <path
          d="M27 100 C27 62 59 33 100 33"
          fill="none"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="1"
        />

        <path
          d="M173 100 C173 138 141 167 100 167"
          fill="none"
          stroke="white"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      </svg>
    </div>
  )
}

export default function IpCard() {
  const [ip, setIp] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    let active = true

    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        if (active) setIp(data.ip)
      })
      .catch(() => {
        if (active) setFailed(true)
      })

    return () => {
      active = false
    }
  }, [])

  async function copyIp() {
    if (!ip) return

    try {
      await navigator.clipboard.writeText(ip)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 1500)
    } catch {}
  }

  return (
    <div className="dashboard-card dashboard-card-shine relative min-h-[180px] overflow-hidden p-5">
      <InternetGlobe />

      <div className="relative z-10 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="dashboard-icon">
              <Network size={18} strokeWidth={1.6} />
            </span>

            <div>
              <p className="text-xs font-medium text-textPrimary">
                IP publik
              </p>
              <p className="mt-0.5 text-[10px] text-textMuted">
                Identitas koneksi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md border border-border bg-white/[0.025] px-2 py-1 text-[9px] text-textMuted">
              IPv4
            </span>

            <button
              type="button"
              onClick={copyIp}
              disabled={!ip}
              aria-label="Salin IP"
              className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-white/[0.025] text-textMuted transition-colors hover:bg-white/[0.06] hover:text-textPrimary disabled:opacity-40"
            >
              {copied ? (
                <Check size={13} />
              ) : (
                <Copy size={13} />
              )}
            </button>
          </div>
        </div>

        <div>
          <p className="font-mono text-2xl font-medium tracking-tight text-textPrimary">
            {failed ? 'Tidak tersedia' : ip ?? 'Memuat...'}
          </p>

          <div className="mt-3 flex items-center gap-2">
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                failed ? 'bg-textMuted' : 'bg-white'
              }`}
            />

            <span className="text-xs text-textSecondary">
              {failed ? 'Gagal memuat' : 'Terhubung'}
            </span>
          </div>
        </div>
      </div>

      <Globe2
        size={14}
        className="pointer-events-none absolute bottom-4 right-5 z-10 text-white/20"
      />
    </div>
  )
}