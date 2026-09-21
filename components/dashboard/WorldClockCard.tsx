'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Globe2, Moon, Sun } from 'lucide-react'

const zones = [
  { label: 'London', timeZone: 'Europe/London' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { label: 'New York', timeZone: 'America/New_York' }
]

function WorldMap() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 w-[58%] overflow-hidden opacity-[0.17]">
      <svg
        viewBox="0 0 700 320"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="mapDots"
            width="7"
            height="7"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.05" fill="white" fillOpacity="0.55" />
          </pattern>

          <linearGradient id="mapFade" x1="0" x2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0" />
            <stop offset="35%" stopColor="white" stopOpacity="0.8" />
            <stop offset="100%" stopColor="white" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        <g fill="url(#mapDots)">
          <path d="M80 86 L112 67 L143 70 L166 88 L159 107 L133 109 L117 128 L94 121 L84 103 Z" />
          <path d="M173 143 L202 150 L211 176 L198 202 L190 230 L173 249 L159 227 L166 202 L157 178 Z" />
          <path d="M236 81 L260 68 L291 70 L313 83 L340 78 L360 93 L349 109 L318 108 L299 119 L273 111 L251 115 L230 101 Z" />
          <path d="M314 118 L342 112 L366 122 L381 144 L371 167 L350 173 L337 157 L319 149 Z" />
          <path d="M386 73 L409 63 L432 69 L442 86 L426 96 L403 93 L387 86 Z" />
          <path d="M443 105 L477 94 L506 103 L521 122 L509 139 L482 138 L463 128 L442 131 L430 119 Z" />
          <path d="M478 155 L507 149 L535 164 L549 187 L534 204 L511 199 L497 216 L478 205 L467 183 Z" />
          <path d="M555 117 L582 107 L608 115 L621 131 L611 146 L584 143 L565 134 Z" />
          <path d="M571 178 L593 169 L614 180 L620 199 L605 210 L584 201 Z" />
        </g>

        <path
          d="M65 157 C210 55 420 58 638 156"
          fill="none"
          stroke="url(#mapFade)"
          strokeOpacity="0.2"
          strokeWidth="1"
          strokeDasharray="2 7"
        />

        <path
          d="M91 207 C240 275 454 266 612 197"
          fill="none"
          stroke="white"
          strokeOpacity="0.08"
          strokeWidth="1"
          strokeDasharray="2 8"
        />
      </svg>
    </div>
  )
}

function getZoneTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone
  })
    .format(date)
    .replace(/\./g, ':')
}

function getZoneDate(date: Date) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    timeZone: 'Asia/Jakarta'
  }).format(date)
}

function getDayState(date: Date, timeZone: string) {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone
    }).format(date)
  )

  return hour >= 6 && hour < 18 ? 'day' : 'night'
}

export default function WorldClockCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="dashboard-card dashboard-card-shine relative min-h-[390px] overflow-hidden p-5">
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="dashboard-icon">
              <Globe2 size={18} strokeWidth={1.6} />
            </span>

            <div>
              <h3 className="text-sm font-medium text-textPrimary">
                Jam dunia
              </h3>
              <p className="mt-0.5 text-[10px] text-textMuted">
                Waktu di beberapa zona
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white/[0.025] text-textMuted transition-colors hover:bg-white/[0.06] hover:text-textPrimary"
          >
            <ArrowUpRight size={15} />
          </button>
        </div>

        <div className="relative mt-4 min-h-[172px] overflow-hidden rounded-xl border border-border bg-black/10">
          <WorldMap />

          <div className="relative z-10 flex h-full flex-col justify-center px-5 py-5">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.16em] text-textMuted">
                  WIB
                </p>

                <p className="mt-1 text-xs text-textSecondary">
                  Jakarta
                </p>

                <p className="mt-5 font-mono text-3xl font-medium tracking-[0.05em] text-textPrimary">
                  {now ? getZoneTime(now, 'Asia/Jakarta') : '--:--'}
                </p>

                <p className="mt-1 text-[10px] text-textMuted">
                  {now ? getZoneDate(now) : ''} · GMT+7
                </p>
              </div>

              {now && getDayState(now, 'Asia/Jakarta') === 'day' ? (
                <Sun size={21} className="text-white/65" strokeWidth={1.5} />
              ) : (
                <Moon size={21} className="text-white/65" strokeWidth={1.5} />
              )}
            </div>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2.5">
          {zones.map((zone) => {
            const day = now ? getDayState(now, zone.timeZone) === 'day' : true

            return (
              <div
                key={zone.label}
                className="rounded-xl border border-border bg-surface2/70 px-3 py-3"
              >
                <div className="flex items-center justify-between gap-1">
                  <p className="truncate text-[10px] font-medium text-textPrimary">
                    {zone.label}
                  </p>

                  {day ? (
                    <Sun
                      size={12}
                      className="shrink-0 text-textSecondary"
                      strokeWidth={1.5}
                    />
                  ) : (
                    <Moon
                      size={12}
                      className="shrink-0 text-textSecondary"
                      strokeWidth={1.5}
                    />
                  )}
                </div>

                <p className="mt-4 font-mono text-sm font-medium text-textPrimary">
                  {now ? getZoneTime(now, zone.timeZone) : '--:--'}
                </p>

                <p className="mt-1 text-[9px] text-textMuted">
                  {zone.label === 'London'
                    ? 'GMT+1'
                    : zone.label === 'Tokyo'
                      ? 'GMT+9'
                      : 'GMT-4'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}