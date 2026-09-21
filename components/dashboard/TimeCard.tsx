'use client'

import { useEffect, useState } from 'react'
import { formatTime, formatDate } from '@/lib/time'

export default function TimeCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface2 p-5 text-textPrimary">
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/5 blur-2xl" />

      <p className="text-xs text-textSecondary">Waktu sekarang</p>

      <p className="mt-1 text-2xl font-bold">
        {now ? formatTime(now) : '--.--'}
      </p>

      <p className="mt-1 text-xs text-textMuted">
        {now ? formatDate(now) : ''}
      </p>
    </div>
  )
}