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

  const hour = now ? now.getHours() % 12 : 0
  const minute = now ? now.getMinutes() : 0
  const second = now ? now.getSeconds() : 0

  const hourAngle = hour * 30 + minute * 0.5
  const minuteAngle = minute * 6 + second * 0.1
  const secondAngle = second * 6

  return (
    <div className="dashboard-card-shine relative min-h-[190px] overflow-hidden rounded-2xl border border-border bg-surface p-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_50%,rgba(255,255,255,0.045),transparent_30%)]" />

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

      <div className="pointer-events-none absolute right-5 top-1/2 flex h-32 w-32 -translate-y-1/2 items-center justify-center sm:right-6">
        <div className="absolute inset-0 rounded-full border border-white/[0.055]" />

        <div className="absolute inset-[13px] rounded-full border border-white/[0.045]" />

        <div className="absolute inset-[25px] rounded-full border border-white/[0.035]" />

        {Array.from({ length: 12 }).map((_, index) => {
          const angle = index * 30

          return (
            <span
              key={index}
              className="absolute left-1/2 top-1/2 h-[5px] w-px bg-white/20"
              style={{
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-59px)`
              }}
            />
          )
        })}

        <span
          className="absolute left-1/2 top-1/2 h-[34px] w-[2px] origin-bottom rounded-full bg-white/70"
          style={{
            transform: `translate(-50%, -100%) rotate(${hourAngle}deg)`
          }}
        />

        <span
          className="absolute left-1/2 top-1/2 h-[45px] w-px origin-bottom rounded-full bg-white/55"
          style={{
            transform: `translate(-50%, -100%) rotate(${minuteAngle}deg)`
          }}
        />

        <span
          className="absolute left-1/2 top-1/2 h-[50px] w-px origin-bottom rounded-full bg-white/25"
          style={{
            transform: `translate(-50%, -100%) rotate(${secondAngle}deg)`
          }}
        />

        <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 bg-white/90" />
      </div>
    </div>
  )
}