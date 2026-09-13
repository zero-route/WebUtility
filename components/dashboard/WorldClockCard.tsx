'use client'

import { useEffect, useState } from 'react'

const zones = [
  { label: 'WIB', timeZone: 'Asia/Jakarta' },
  { label: 'London', timeZone: 'Europe/London' },
  { label: 'Tokyo', timeZone: 'Asia/Tokyo' },
  { label: 'New York', timeZone: 'America/New_York' }
]

export default function WorldClockCard() {
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="font-display text-sm font-medium text-textPrimary">Jam dunia</h3>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {zones.map((zone) => (
          <div key={zone.label} className="rounded-lg border border-border bg-surface2 px-3 py-2">
            <p className="text-xs text-textMuted">{zone.label}</p>
            <p className="mt-1 text-sm font-medium text-textPrimary">
              {now
                ? new Intl.DateTimeFormat('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                    timeZone: zone.timeZone
                  }).format(now)
                : '--.--'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
