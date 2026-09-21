 'use client'

import { useState } from 'react'

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des']
const DAY_NAMES = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']

function describeField(field: string, unit: string, names?: string[]): string {
  if (field === '*') return `setiap ${unit}`

  if (field.includes('/')) {
    const [, step] = field.split('/')
    return `tiap ${step} ${unit}`
  }

  if (field.includes(',')) {
    const values = field.split(',')
    const labels = names ? values.map((value) => names[Number(value)] ?? value) : values
    return `${unit} ${labels.join(', ')}`
  }

  if (field.includes('-')) {
    const [start, end] = field.split('-')
    const startLabel = names ? names[Number(start)] ?? start : start
    const endLabel = names ? names[Number(end)] ?? end : end
    return `${unit} ${startLabel} sampai ${endLabel}`
  }

  const label = names ? names[Number(field)] ?? field : field
  return `${unit} ${label}`
}

function describeCron(expression: string): string | null {
  const parts = expression.trim().split(/\s+/)
  if (parts.length !== 5) return null

  const [minute, hour, day, month, weekday] = parts

  const segments: string[] = []

  if (minute === '*' && hour === '*') {
    segments.push('setiap menit')
  } else if (minute !== '*' && hour !== '*' && !minute.includes('/') && !hour.includes('/')) {
    segments.push(`jam ${hour.padStart(2, '0')}:${minute.padStart(2, '0')}`)
  } else {
    segments.push(describeField(minute, 'menit ke-'))
    segments.push(describeField(hour, 'jam'))
  }

  if (day !== '*') segments.push(describeField(day, 'tanggal'))
  if (month !== '*') segments.push(describeField(month, 'bulan', MONTH_NAMES))
  if (weekday !== '*') segments.push(describeField(weekday, 'hari', DAY_NAMES))

  return segments.join(', ')
}

export default function CronParser() {
  const [expression, setExpression] = useState('')

  const description = expression.trim() ? describeCron(expression) : null

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          value={expression}
          onChange={(event) => setExpression(event.target.value)}
          placeholder="Contoh: 0 9 * * 1-5"
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
        />
        <p className="mt-2 text-xs text-textMuted">Format: menit jam tanggal bulan hari</p>
      </div>

      {expression.trim() && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          {description ? (
            <p className="text-sm text-textPrimary">{description}</p>
          ) : (
            <p className="text-xs text-red-400">Format cron tidak valid, harus 5 bagian dipisah spasi</p>
          )}
        </div>
      )}
    </div>
  )
}
