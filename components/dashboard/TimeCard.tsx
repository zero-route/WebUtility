'use client'

import { useEffect, useState } from 'react'
import { Clock3, MapPin } from 'lucide-react'
import { formatDate } from '@/lib/time'

function AnalogClock({ date }: { date: Date | null }) {
  const seconds = date ? date.getSeconds() : 0
  const minutes = date ? date.getMinutes() : 0
  const hours = date ? date.getHours() : 0

  const secondAngle = seconds * 6
  const minuteAngle = minutes * 6 + seconds * 0.1
  const hourAngle = (hours % 12) * 30 + minutes * 0.5

  return (
    <div className="relative hidden h-32 w-32 shrink-0 sm:block">
      <div className="absolute inset-0 rounded-full border border-white/[0.08] bg-white/[0.015] shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]" />

      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="clockGlow">
            <stop offset="0%" stopColor="white" stopOpacity="0.06" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="60" cy="60" r="52" fill="url(#clockGlow)" />

        {Array.from({ length: 12 }).map((_, index) => {
          const angle = index * 30
          const major = index % 3 === 0
          const radians = ((angle - 90) * Math.PI) / 180

          const x1 = 60 + Math.cos(radians) * 45
          const y1 = 60 + Math.sin(radians) * 45
          const x2 = 60 + Math.cos(radians) * (major ? 38 : 41)
          const y2 = 60 + Math.sin(radians) * (major ? 38 : 41)

          return (
            <line
              key={index}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="white"
              strokeOpacity={major ? 0.35 : 0.14}
              strokeWidth={major ? 1.4 : 0.8}
              strokeLinecap="round"
            />
          )
        })}

        <line
          x1="60"
          y1="60"
          x2="60"
          y2="30"
          stroke="white"
          strokeOpacity="0.75"
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${hourAngle} 60 60)`}
        />

        <line
          x1="60"
          y1="60"
          x2="60"
          y2="21"
          stroke="white"
          strokeOpacity="0.9"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform={`rotate(${minuteAngle} 60 60)`}
        />

        <line
          x1="60"
          y1="60"
          x2="60"
          y2="18"
          stroke="white"
          strokeOpacity="0.42"
          strokeWidth="0.8"
          strokeLinecap="round"
          transform={`rotate(${secondAngle} 60 60)`}
        />

        <circle cx="60" cy="60" r="2.5" fill="white" fillOpacity="0.9" />
        <circle cx="60" cy="60" r="5" fill="none" stroke="white" strokeOpacity="0.08" />
      </svg>
    </div>
  )
}

export default function TimeCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const time = now
    ? new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta'
      })
        .format(now)
        .replace(/\./g, ' : ')
    : '-- : -- : --'

  return (
    <div className="dashboard-card dashboard-card-shine relative min-h-[180px] overflow-hidden p-5">
      <div className="pointer-events-none absolute -right-16 -top-20 h-48 w-48 rounded-full bg-white/[0.025] blur-3xl" />

      <div className="relative flex h-full items-center justify-between gap-5">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <span className="dashboard-icon">
              <Clock3 size={18} strokeWidth={1.6} />
            </span>

            <div>
              <p className="text-xs font-medium text-textPrimary">
                Waktu sekarang
              </p>
              <p className="mt-0.5 text-[10px] text-textMuted">
                Waktu lokal
              </p>
            </div>
          </div>

          <p className="mt-6 font-mono text-3xl font-medium tracking-[0.08em] text-textPrimary sm:text-[2.15rem]">
            {time}
          </p>

          <p className="mt-2 text-xs text-textSecondary">
            {now ? formatDate(now) : ''}
          </p>

          <div className="mt-3 flex items-center gap-1.5 text-[11px] text-textMuted">
            <MapPin size={12} strokeWidth={1.6} />
            <span>WIB · Asia/Jakarta</span>
          </div>
        </div>

        <AnalogClock date={now} />
      </div>
    </div>
  )
}