'use client'

import { useEffect, useState } from 'react'
import { formatTime, formatDate } from '@/lib/time'

export default function TimeCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="relative overflow-hidden rounded-xl p-5 text-white"
      style={{ background: 'linear-gradient(135deg, #5DCAA5 0%, #1D9E75 55%, #0a4f3e 100%)' }}
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
      <p className="text-xs text-white/75">Waktu sekarang</p>
      <p className="mt-1 text-2xl font-bold">{now ? formatTime(now) : '--.--'}</p>
      <p className="mt-1 text-xs text-white/65">{now ? formatDate(now) : ''}</p>
    </div>
  )
}
