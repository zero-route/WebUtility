'use client'

import { useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'

export default function IpNetworkInfo() {
  const [publicIp, setPublicIp] = useState<string | null>(null)
  const [ipStatus, setIpStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [copied, setCopied] = useState(false)
  const [info, setInfo] = useState<{
    userAgent: string
    platform: string
    language: string
    screenSize: string
    viewportSize: string
    timezone: string
    online: boolean
  } | null>(null)

  useEffect(() => {
    setInfo({
      userAgent: navigator.userAgent,
      platform: navigator.platform || 'Tidak diketahui',
      language: navigator.language,
      screenSize: `${window.screen.width} x ${window.screen.height}`,
      viewportSize: `${window.innerWidth} x ${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      online: navigator.onLine
    })

    fetch('https://api.ipify.org?format=json')
      .then((res) => res.json())
      .then((data) => {
        setPublicIp(data.ip)
        setIpStatus('ready')
      })
      .catch(() => setIpStatus('error'))
  }, [])

  function handleCopy() {
    if (!publicIp) return
    navigator.clipboard.writeText(publicIp)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border bg-surface2 p-4">
        <p className="text-xs text-textMuted">IP publik</p>
        <div className="mt-1 flex items-center justify-between gap-3">
          <p className="font-mono text-lg text-textPrimary">
            {ipStatus === 'loading' && 'Memuat...'}
            {ipStatus === 'error' && 'Gagal memuat'}
            {ipStatus === 'ready' && publicIp}
          </p>
          {ipStatus === 'ready' && (
            <button
              onClick={handleCopy}
              className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
            >
              {copied ? <Check size={12} /> : <Copy size={12} />}
              {copied ? 'Tersalin' : 'Copy'}
            </button>
          )}
        </div>
      </div>

      {info && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-textMuted">Platform</p>
              <p className="mt-1 text-textPrimary">{info.platform}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Bahasa browser</p>
              <p className="mt-1 text-textPrimary">{info.language}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Resolusi layar</p>
              <p className="mt-1 font-mono text-textPrimary">{info.screenSize}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Ukuran viewport</p>
              <p className="mt-1 font-mono text-textPrimary">{info.viewportSize}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Timezone</p>
              <p className="mt-1 text-textPrimary">{info.timezone}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Status koneksi</p>
              <p className={`mt-1 ${info.online ? 'text-teal-light' : 'text-red-400'}`}>
                {info.online ? 'Online' : 'Offline'}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-textMuted">User agent</p>
            <p className="mt-1 break-all font-mono text-xs text-textSecondary">{info.userAgent}</p>
          </div>
        </div>
      )}
    </div>
  )
}
