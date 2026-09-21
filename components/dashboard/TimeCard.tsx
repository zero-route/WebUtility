'use client'

import { useEffect, useState } from 'react'
import { Clock3, MapPin } from 'lucide-react'

function getTimeParts(date: Date) {
  const formatter = new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  const parts = formatter.formatToParts(date)

  return {
    weekday: parts.find((part) => part.type === 'weekday')?.value ?? '',
    hour: parts.find((part) => part.type === 'hour')?.value ?? '--',
    minute: parts.find((part) => part.type === 'minute')?.value ?? '--',
    second: parts.find((part) => part.type === 'second')?.value ?? '--'
  }
}

function getDate(date: Date) {
  return new Intl.DateTimeFormat('id-ID', {
    timeZone: 'Asia/Jakarta',
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

export default function TimeCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const update = () => setNow(new Date())

    update()

    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [])

  const time = now ? getTimeParts(now) : null

  return (
    <div className="dashboard-card-shine relative min-h-[190px] overflow-hidden rounded-2xl border border-border bg-surface p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_45%,rgba(255,255,255,0.055),transparent_28%)]" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-borderStrong bg-surface2 text-textPrimary">
            <Clock3 size={22} strokeWidth={1.5} />
          </div>

          <div>
            <p className="font-display text-base font-medium text-textPrimary">
              Waktu sekarang
            </p>
            <p className="mt-1 text-sm text-textMuted">
              Waktu lokal
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <div className="font-mono text-3xl font-medium tracking-[0.18em] text-textPrimary sm:text-4xl">
            {time
              ? `${time.hour} : ${time.minute} : ${time.second}`
              : '-- : -- : --'}
          </div>

          <p className="mt-3 text-sm text-textSecondary">
            {now ? getDate(now) : ''}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-textMuted">
            <MapPin size={13} />
            <span>WIB · Asia/Jakarta</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute right-6 top-1/2 hidden h-32 w-32 -translate-y-1/2 rounded-full border border-white/[0.06] sm:block">
        <div className="absolute inset-3 rounded-full border border-white/[0.05]" />
        <div className="absolute inset-6 rounded-full border border-white/[0.04]" />

        {Array.from({ length: 12 }).map((_, index) => {
          const angle = index * 30

          return (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 h-1.5 w-px origin-[0_64px] bg-white/20"
              style={{ transform: `rotate(${angle}deg)` }}
            />
          )
        })}

        <span className="absolute left-1/2 top-1/2 h-[38px] w-px origin-bottom -translate-x-1/2 -translate-y-full rotate-[35deg] bg-white/60" />
        <span className="absolute left-1/2 top-1/2 h-[48px] w-px origin-bottom -translate-x-1/2 -translate-y-full -rotate-[55deg] bg-white/35" />
        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80" />
      </div>
    </div>
  )
}