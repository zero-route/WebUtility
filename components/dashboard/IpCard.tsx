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
    <div
      className="relative overflow-hidden rounded-xl p-5 text-white"
      style={{ background: 'linear-gradient(135deg, #E0954C 0%, #BA5B17 60%, #7a3d10 100%)' }}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15 blur-2xl" />
      <p className="text-xs text-white/75">IP publik</p>
      <p className="mt-1 text-lg font-bold">{failed ? 'Tidak tersedia' : ip ?? 'Memuat...'}</p>
      <p className="mt-1 text-xs text-white/65">{failed ? 'Gagal memuat' : 'Terhubung'}</p>
    </div>
  )
}
