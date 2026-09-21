'use client'

import { useEffect, useState } from 'react'
import { CalendarDays, Clock3 } from 'lucide-react'
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
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-5 text-textPrimary">
      <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-white/[0.035] blur-2xl" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs text-textMuted">
            Waktu sekarang
          </p>

          <p className="mt-1 text-2xl font-semibold tracking-tight">
            {now ? formatTime(now) : '--:--'}
          </p>

          <div className="mt-1 flex items-center gap-1.5 text-[10px] text-textMuted">
            <CalendarDays size={11} />
            <span>{now ? formatDate(now) : ''}</span>
          </div>
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface2 text-textSecondary">
          <Clock3 size={16} />
        </div>
      </div>
    </div>
  )
}