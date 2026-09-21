'use client'

import { useEffect, useState } from 'react'

export default function IpCard() {
  const [ip, setIp] = useState<string | null>(null)
  const [failed, setFailed] = useState(false)

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

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface2 p-5 text-textPrimary">
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/5 blur-2xl" />

      <p className="text-xs text-textSecondary">IP publik</p>

      <p className="mt-1 text-lg font-bold">
        {failed ? 'Tidak tersedia' : ip ?? 'Memuat...'}
      </p>

      <p className="mt-1 text-xs text-textMuted">
        {failed ? 'Gagal memuat' : 'Terhubung'}
      </p>
    </div>
  )
}