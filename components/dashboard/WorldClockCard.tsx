'use client'

import { useEffect, useMemo, useState } from 'react'
import { Globe2, Moon, Sun } from 'lucide-react'

const zones = [
  {
    label: 'WIB',
    city: 'Jakarta',
    timeZone: 'Asia/Jakarta'
  },
  {
    label: 'London',
    city: 'London',
    timeZone: 'Europe/London'
  },
  {
    label: 'Tokyo',
    city: 'Tokyo',
    timeZone: 'Asia/Tokyo'
  },
  {
    label: 'New York',
    city: 'New York',
    timeZone: 'America/New_York'
  }
]

function getTimeInfo(date: Date, timeZone: string) {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone
    }).format(date)
  )

  const isDay = hour >= 6 && hour < 18

  return {
    isDay,
    period: isDay ? 'Siang' : 'Malam',
    emoji: isDay ? '☀️' : '🌙'
  }
}

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
    day: 'numeric',
    month: 'short',
    timeZone
  }).format(date)
}

function getUtcOffset(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone,
    timeZoneName: 'shortOffset'
  }).formatToParts(date)

  return parts.find((part) => part.type === 'timeZoneName')?.value ?? 'UTC'
}

export default function WorldClockCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 30000)

    return () => clearInterval(interval)
  }, [])

  const localZone = zones[0]

  const localInfo = useMemo(() => {
    if (!now) return null
    return getTimeInfo(now, localZone.timeZone)
  }, [now])

  return (
    <div className="min-h-[280px] rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface2 text-textSecondary">
              <Globe2 size={15} />
            </div>

            <div>
              <h3 className="font-display text-sm font-medium text-textPrimary">
                Jam dunia
              </h3>
              <p className="text-[10px] text-textMuted">
                Waktu di beberapa zona
              </p>
            </div>
          </div>

          {localInfo && (
            <span className="flex items-center gap-1.5 text-[10px] text-textMuted">
              {localInfo.isDay ? <Sun size={12} /> : <Moon size={12} />}
              {localInfo.period}
            </span>
          )}
        </div>

        <div className="mt-3 rounded-xl border border-border bg-surface2 px-4 py-3">
          <div className="flex items-end justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-textPrimary">
                  WIB
                </span>

                <span className="text-[10px] text-textMuted">
                  Jakarta
                </span>
              </div>

              <p className="mt-1 text-3xl font-semibold tracking-tight text-textPrimary">
                {now ? getTime(now, localZone.timeZone) : '--:--'}
              </p>

              <p className="mt-0.5 text-[10px] text-textMuted">
                {now
                  ? `${getDate(now, localZone.timeZone)} · ${getUtcOffset(now, localZone.timeZone)}`
                  : ''}
              </p>
            </div>

            {localInfo && (
              <span className="text-2xl">
                {localInfo.emoji}
              </span>
            )}
          </div>
        </div>

        <div className="mt-2 grid flex-1 grid-cols-3 gap-2">
          {zones.slice(1).map((zone) => {
            const info = now
              ? getTimeInfo(now, zone.timeZone)
              : null

            return (
              <div
                key={zone.label}
                className="flex min-w-0 flex-col justify-between rounded-xl border border-border bg-surface2 px-3 py-2.5"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="truncate text-[10px] font-medium text-textPrimary">
                    {zone.label}
                  </span>

                  <span className="text-xs">
                    {info?.emoji ?? '·'}
                  </span>
                </div>

                <div className="mt-2">
                  <p className="text-sm font-semibold text-textPrimary">
                    {now
                      ? getTime(now, zone.timeZone)
                      : '--:--'}
                  </p>

                  <p className="mt-0.5 truncate text-[9px] text-textMuted">
                    {zone.city}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}