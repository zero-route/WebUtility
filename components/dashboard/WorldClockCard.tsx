'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, Globe2, Moon, Sun } from 'lucide-react'

const zones = [
  { label: 'London', timeZone: 'Europe/London', offset: 'GMT+1' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo', offset: 'GMT+9' },
  { label: 'New York', timeZone: 'America/New_York', offset: 'GMT-4' }
]

function getTime(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone
  }).format(date)
}

function getDate(date: Date, timeZone: string) {
  return new Intl.DateTimeFormat('id-ID', {
    weekday: 'short',
    day: '2-digit',
    month: 'short',
    timeZone
  }).format(date)
}

function isDay(date: Date, timeZone: string) {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone
    }).format(date)
  )

  return hour >= 6 && hour < 18
}

export default function WorldClockCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    const update = () => setNow(new Date())

    update()

    const interval = setInterval(update, 1000)

    return () => clearInterval(interval)
  }, [])

  const localDay = now ? isDay(now, 'Asia/Jakarta') : true

  return (
    <div className="dashboard-card-shine relative overflow-hidden rounded-2xl border border-border bg-surface p-6">
      <div className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-borderStrong bg-surface2 text-textPrimary">
              <Globe2 size={21} strokeWidth={1.5} />
            </div>

            <div>
              <h3 className="font-display text-base font-medium text-textPrimary">
                Jam dunia
              </h3>
              <p className="mt-1 text-sm text-textMuted">
                Waktu di beberapa zona
              </p>
            </div>
          </div>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface2 text-textMuted transition-colors hover:text-textPrimary"
            aria-label="Buka jam dunia"
          >
            <ArrowUpRight size={17} />
          </button>
        </div>

        <div className="relative mt-5 overflow-hidden rounded-xl border border-border bg-surface2/50 p-5">
          <div className="relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-textMuted">
                  WIB
                </p>

                <p className="mt-2 text-sm text-textSecondary">
                  Jakarta
                </p>

                <p className="mt-5 font-mono text-3xl font-medium tracking-[0.12em] text-textPrimary sm:text-4xl">
                  {now ? getTime(now, 'Asia/Jakarta') : '-- : --'}
                </p>

                <p className="mt-2 text-xs text-textMuted">
                  {now
                    ? `${getDate(now, 'Asia/Jakarta')} · GMT+7`
                    : ''}
                </p>
              </div>

              <div className="relative z-10 flex h-9 w-9 items-center justify-center text-textPrimary">
                {localDay ? (
                  <Sun size={21} strokeWidth={1.4} />
                ) : (
                  <Moon size={21} strokeWidth={1.4} />
                )}
              </div>
            </div>
          </div>

          <div className="pointer-events-none absolute right-0 top-1/2 h-[90%] w-[58%] -translate-y-1/2 opacity-100">
            <svg
              viewBox="0 0 600 300"
              className="h-full w-full"
              fill="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="worldMapFade"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0%" stopColor="white" stopOpacity="0.16" />
                  <stop offset="48%" stopColor="white" stopOpacity="0.09" />
                  <stop offset="100%" stopColor="white" stopOpacity="0" />
                </linearGradient>
              </defs>

              <g
                stroke="url(#worldMapFade)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M58 92L77 77L102 79L117 92L111 107L92 110L79 123L65 116L53 100Z" />
                <path d="M119 128L136 136L142 154L134 174L129 197L118 215L109 202L113 181L106 164L111 147Z" />
                <path d="M184 82L202 72L228 75L242 87L235 100L216 99L207 110L190 105L179 95Z" />
                <path d="M231 112L248 108L260 118L273 120L281 136L270 145L255 140L247 151L235 145L224 130Z" />
                <path d="M270 154L287 158L299 175L297 195L287 211L273 203L267 185L259 174Z" />
                <path d="M305 85L329 77L355 81L373 91L389 91L402 103L391 115L371 113L360 125L343 121L332 108L316 104Z" />
                <path d="M363 132L381 127L399 135L407 148L398 157L382 156L370 167L357 157Z" />
                <path d="M408 104L428 99L444 108L460 109L474 121L466 132L448 130L437 140L420 134L414 120Z" />
                <path d="M458 153L475 150L493 161L503 177L496 190L478 187L469 176Z" />
              </g>

              <g fill="white" fillOpacity="0.08">
                {Array.from({ length: 80 }).map((_, index) => {
                  const x = 40 + (index % 10) * 48
                  const y = 55 + Math.floor(index / 10) * 28

                  return <circle key={index} cx={x} cy={y} r="1.4" />
                })}
              </g>
            </svg>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-3 gap-3">
          {zones.map((zone) => {
            const day = now ? isDay(now, zone.timeZone) : true

            return (
              <div
                key={zone.label}
                className="rounded-xl border border-border bg-surface2 px-3 py-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-medium text-textPrimary">
                    {zone.label}
                  </p>

                  {day ? (
                    <Sun size={13} className="text-textMuted" />
                  ) : (
                    <Moon size={13} className="text-textMuted" />
                  )}
                </div>

                <p className="mt-4 font-mono text-sm font-medium text-textPrimary">
                  {now ? getTime(now, zone.timeZone) : '-- : --'}
                </p>

                <p className="mt-1 text-[10px] text-textMuted">
                  {zone.offset}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}