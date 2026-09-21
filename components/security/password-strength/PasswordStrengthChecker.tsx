'use client'

import { useState } from 'react'

function formatDuration(seconds: number): string {
  if (seconds < 1) return 'kurang dari 1 detik'
  const units: [number, string][] = [
    [60, 'detik'],
    [60, 'menit'],
    [24, 'jam'],
    [365, 'hari'],
    [100, 'tahun']
  ]

  let value = seconds
  let unitLabel = 'detik'

  for (const [divisor, label] of units) {
    if (value < divisor) {
      unitLabel = label
      break
    }
    value = value / divisor
    unitLabel = label
  }

  if (unitLabel === 'tahun' && value > 1000) return 'ribuan tahun'

  return `${Math.round(value)} ${unitLabel}`
}

function calcStrength(password: string) {
  let charsetSize = 0
  if (/[a-z]/.test(password)) charsetSize += 26
  if (/[A-Z]/.test(password)) charsetSize += 26
  if (/[0-9]/.test(password)) charsetSize += 10
  if (/[^a-zA-Z0-9]/.test(password)) charsetSize += 32

  const entropy = password.length * Math.log2(charsetSize || 1)
  const guessesOffline = 10_000_000_000
  const guessesOnline = 100

  const secondsOffline = Math.pow(2, entropy) / guessesOffline
  const secondsOnline = Math.pow(2, entropy) / guessesOnline

  let label: string
  let color: string
  if (entropy < 28) {
    label = 'Sangat lemah'
    color = 'text-red-400'
  } else if (entropy < 40) {
    label = 'Lemah'
    color = 'text-amber-400'
  } else if (entropy < 60) {
    label = 'Sedang'
    color = 'text-amber-400'
  } else if (entropy < 80) {
    label = 'Kuat'
    color = 'text-teal-light'
  } else {
    label = 'Sangat kuat'
    color = 'text-teal-light'
  }

  return { entropy, label, color, secondsOffline, secondsOnline }
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('')

  const checks = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^a-zA-Z0-9]/.test(password)
  }

  const result = password ? calcStrength(password) : null

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Ketik password yang mau dicek"
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
        />
      </div>

      {result && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <p className={`text-sm font-medium ${result.color}`}>{result.label}</p>
          <p className="mt-1 text-xs text-textMuted">{Math.round(result.entropy)} bit entropy</p>

          <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
            <div className={`flex items-center gap-2 ${checks.length ? 'text-teal-light' : 'text-textMuted'}`}>
              {checks.length ? '✓' : '○'} Minimal 12 karakter
            </div>
            <div className={`flex items-center gap-2 ${checks.lower ? 'text-teal-light' : 'text-textMuted'}`}>
              {checks.lower ? '✓' : '○'} Huruf kecil
            </div>
            <div className={`flex items-center gap-2 ${checks.upper ? 'text-teal-light' : 'text-textMuted'}`}>
              {checks.upper ? '✓' : '○'} Huruf besar
            </div>
            <div className={`flex items-center gap-2 ${checks.number ? 'text-teal-light' : 'text-textMuted'}`}>
              {checks.number ? '✓' : '○'} Angka
            </div>
            <div className={`flex items-center gap-2 ${checks.symbol ? 'text-teal-light' : 'text-textMuted'}`}>
              {checks.symbol ? '✓' : '○'} Simbol
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 text-xs">
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
              <span className="text-textMuted">Estimasi ditebak (offline, cepat)</span>
              <span className="font-mono text-textPrimary">{formatDuration(result.secondsOffline)}</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
              <span className="text-textMuted">Estimasi ditebak (online, dibatasi)</span>
              <span className="font-mono text-textPrimary">{formatDuration(result.secondsOnline)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
