'use client'

import { useEffect, useState } from 'react'
import { Copy, Check } from 'lucide-react'

function formatRelative(ms: number) {
  const diff = Date.now() - ms
  const abs = Math.abs(diff)
  const seconds = Math.floor(abs / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  let value: string
  if (days > 0) value = `${days} hari`
  else if (hours > 0) value = `${hours} jam`
  else if (minutes > 0) value = `${minutes} menit`
  else value = `${seconds} detik`

  return diff >= 0 ? `${value} yang lalu` : `${value} lagi`
}

export default function TimestampTool() {
  const [now, setNow] = useState<number | null>(null)
  const [epochInput, setEpochInput] = useState('')
  const [epochError, setEpochError] = useState<string | null>(null)
  const [epochResult, setEpochResult] = useState<{ local: string; utc: string; relative: string } | null>(null)

  const [dateInput, setDateInput] = useState('')
  const [dateResult, setDateResult] = useState<{ seconds: number; millis: number } | null>(null)
  const [dateError, setDateError] = useState<string | null>(null)

  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  useEffect(() => {
    setNow(Date.now())
    const interval = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(interval)
  }, [])

  function handleUseNow() {
    if (!now) return
    setEpochInput(String(Math.floor(now / 1000)))
  }

  function handleConvertEpoch() {
    setEpochError(null)
    setEpochResult(null)

    const raw = epochInput.trim()
    if (!raw || Number.isNaN(Number(raw))) {
      setEpochError('Masukkan angka epoch timestamp yang valid')
      return
    }

    const numeric = Number(raw)
    const ms = raw.length > 10 ? numeric : numeric * 1000

    const date = new Date(ms)
    if (Number.isNaN(date.getTime())) {
      setEpochError('Timestamp di luar jangkauan yang valid')
      return
    }

    setEpochResult({
      local: date.toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'medium' }),
      utc: date.toUTCString(),
      relative: formatRelative(ms)
    })
  }

  function handleConvertDate() {
    setDateError(null)
    setDateResult(null)

    if (!dateInput) {
      setDateError('Pilih tanggal dan waktu dulu')
      return
    }

    const ms = new Date(dateInput).getTime()
    if (Number.isNaN(ms)) {
      setDateError('Format tanggal tidak valid')
      return
    }

    setDateResult({ seconds: Math.floor(ms / 1000), millis: ms })
  }

  function handleCopy(key: string, value: string) {
    navigator.clipboard.writeText(value)
    setCopiedKey(key)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-lg border border-border bg-surface2 p-4">
        <p className="text-xs text-textMuted">Timestamp sekarang</p>
        <p className="mt-1 font-mono text-lg text-textPrimary">{now ? Math.floor(now / 1000) : '...'}</p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-textPrimary">Epoch ke tanggal</h4>
        <div className="mt-2 flex gap-2">
          <input
            value={epochInput}
            onChange={(event) => setEpochInput(event.target.value)}
            placeholder="Contoh: 1700000000"
            className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
          />
          <button
            onClick={handleUseNow}
            className="shrink-0 rounded-lg border border-border px-3 py-2 text-xs text-textSecondary hover:text-textPrimary"
          >
            Sekarang
          </button>
        </div>
        <button
          onClick={handleConvertEpoch}
          className="mt-2 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
        >
          Convert
        </button>
        {epochError && <p className="mt-2 text-xs text-red-400">{epochError}</p>}

        {epochResult && (
          <div className="mt-3 rounded-lg border border-border bg-surface2 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-textMuted">Waktu lokal</p>
                <p className="mt-1 text-sm text-textPrimary">{epochResult.local}</p>
              </div>
              <button
                onClick={() => handleCopy('local', epochResult.local)}
                className="flex shrink-0 items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
              >
                {copiedKey === 'local' ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>
            <div className="mt-3">
              <p className="text-xs text-textMuted">UTC</p>
              <p className="mt-1 font-mono text-xs text-textSecondary">{epochResult.utc}</p>
            </div>
            <p className="mt-3 text-xs text-teal-light">{epochResult.relative}</p>
          </div>
        )}
      </div>

      <div>
        <h4 className="text-sm font-medium text-textPrimary">Tanggal ke epoch</h4>
        <input
          type="datetime-local"
          value={dateInput}
          onChange={(event) => setDateInput(event.target.value)}
          className="mt-2 w-full rounded-lg border border-border bg-surface2 px-3 py-2 text-sm text-textPrimary outline-none focus:border-teal"
        />
        <button
          onClick={handleConvertDate}
          className="mt-2 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
        >
          Convert
        </button>
        {dateError && <p className="mt-2 text-xs text-red-400">{dateError}</p>}

        {dateResult && (
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface2 px-3 py-2">
              <div>
                <p className="text-xs text-textMuted">Detik (seconds)</p>
                <p className="font-mono text-sm text-textPrimary">{dateResult.seconds}</p>
              </div>
              <button
                onClick={() => handleCopy('seconds', String(dateResult.seconds))}
                className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
              >
                {copiedKey === 'seconds' ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface2 px-3 py-2">
              <div>
                <p className="text-xs text-textMuted">Milidetik (milliseconds)</p>
                <p className="font-mono text-sm text-textPrimary">{dateResult.millis}</p>
              </div>
              <button
                onClick={() => handleCopy('millis', String(dateResult.millis))}
                className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
              >
                {copiedKey === 'millis' ? <Check size={12} /> : <Copy size={12} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
