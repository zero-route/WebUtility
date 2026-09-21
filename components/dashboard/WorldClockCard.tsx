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

          <div className="pointer-events-none absolute inset-y-0 right-[-4%] flex w-[68%] items-center justify-end">
            <div
              className="relative h-[92%] w-full"
              style={{
                maskImage:
                  'linear-gradient(to bottom, black 0%, black 52%, rgba(0,0,0,0.72) 72%, transparent 100%)',
                WebkitMaskImage:
                  'linear-gradient(to bottom, black 0%, black 52%, rgba(0,0,0,0.72) 72%, transparent 100%)'
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/4/4d/BlankMap-World.svg"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-contain object-right"
                style={{
                  filter:
                    'brightness(0) invert(1) contrast(0.8)',
                  opacity: 0.19
                }}
              />

              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 35%, rgba(15,16,18,0.2) 68%, rgba(15,16,18,0.75) 100%)'
                }}
              />
            </div>
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