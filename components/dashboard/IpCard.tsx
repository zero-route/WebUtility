'use client'

import { useEffect, useState } from 'react'
import { Copy, Network, Globe2 } from 'lucide-react'

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

  const copyIp = async () => {
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
    <div className="dashboard-card-shine relative min-h-[190px] overflow-hidden rounded-2xl border border-border bg-surface p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(255,255,255,0.055),transparent_34%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-borderStrong bg-surface2 text-textPrimary">
              <Network size={21} strokeWidth={1.5} />
            </div>

            <div>
              <p className="font-display text-base font-medium text-textPrimary">
                IP publik
              </p>

              <p className="mt-1 text-sm text-textMuted">
                Identitas koneksi
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-border bg-surface2 px-3 py-2 text-xs text-textMuted">
              IPv4
            </span>

            <button
              type="button"
              onClick={copyIp}
              disabled={!ip}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface2 text-textMuted transition-colors hover:text-textPrimary disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Salin IP"
            >
              <Copy size={15} />
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <p className="font-mono text-2xl font-medium tracking-wide text-textPrimary sm:text-3xl">
            {failed ? 'Tidak tersedia' : ip ?? 'Memuat...'}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm text-textSecondary">
            <span className="h-2 w-2 rounded-full bg-white" />
            <span>
              {failed
                ? 'Gagal memuat'
                : copied
                  ? 'IP disalin'
                  : 'Terhubung'}
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-8 top-1/2 h-48 w-48 -translate-y-1/2 opacity-80">
        <svg
          viewBox="0 0 220 220"
          className="h-full w-full"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <radialGradient
              id="ipGlobeFade"
              cx="50%"
              cy="42%"
              r="64%"
            >
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity="0.24"
              />
              <stop
                offset="48%"
                stopColor="white"
                stopOpacity="0.14"
              />
              <stop
                offset="78%"
                stopColor="white"
                stopOpacity="0.07"
              />
              <stop
                offset="100%"
                stopColor="white"
                stopOpacity="0"
              />
            </radialGradient>

            <linearGradient
              id="ipGlobeLineFade"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="white"
                stopOpacity="0.14"
              />
              <stop
                offset="60%"
                stopColor="white"
                stopOpacity="0.08"
              />
              <stop
                offset="100%"
                stopColor="white"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          <circle
            cx="110"
            cy="110"
            r="76"
            stroke="url(#ipGlobeFade)"
            strokeWidth="1.4"
          />

          <ellipse
            cx="110"
            cy="110"
            rx="76"
            ry="31"
            stroke="url(#ipGlobeLineFade)"
            strokeWidth="1"
          />

          <ellipse
            cx="110"
            cy="110"
            rx="76"
            ry="54"
            stroke="url(#ipGlobeLineFade)"
            strokeWidth="1"
          />

          <ellipse
            cx="110"
            cy="110"
            rx="31"
            ry="76"
            stroke="url(#ipGlobeLineFade)"
            strokeWidth="1"
          />

          <ellipse
            cx="110"
            cy="110"
            rx="54"
            ry="76"
            stroke="url(#ipGlobeLineFade)"
            strokeWidth="1"
          />

          <path
            d="M34 110H186"
            stroke="white"
            strokeOpacity="0.075"
          />

          <path
            d="M110 34V186"
            stroke="white"
            strokeOpacity="0.065"
          />

          <circle
            cx="110"
            cy="110"
            r="12"
            fill="url(#ipGlobeFade)"
          />

          <circle
            cx="110"
            cy="110"
            r="3"
            fill="white"
            fillOpacity="0.28"
          />

          <Globe2
            x="174"
            y="174"
            width="18"
            height="18"
            stroke="white"
            strokeOpacity="0.22"
            strokeWidth="1.2"
          />
        </svg>
      </div>
    </div>
  )
}