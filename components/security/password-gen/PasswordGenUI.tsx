'use client'

import { useEffect, useState } from 'react'
import { Copy, Check, RefreshCw, KeyRound } from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'

const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'
const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const NUMBERS = '0123456789'
const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?'

function buildCharset(useLower: boolean, useUpper: boolean, useNumbers: boolean, useSymbols: boolean) {
  let charset = ''
  if (useLower) charset += LOWERCASE
  if (useUpper) charset += UPPERCASE
  if (useNumbers) charset += NUMBERS
  if (useSymbols) charset += SYMBOLS
  return charset
}

function generatePassword(length: number, charset: string) {
  if (!charset) return ''
  const randomValues = crypto.getRandomValues(new Uint32Array(length))
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset[randomValues[i] % charset.length]
  }
  return result
}

function getStrengthLabel(length: number, categoryCount: number) {
  if (length >= 12 && categoryCount >= 3) return 'Kuat'
  if (length >= 8 && categoryCount >= 2) return 'Sedang'
  return 'Lemah'
}

export default function PasswordGenUI() {
  const { enabled, reason } = useToolEnabled('password-generator')

  const [length, setLength] = useState(16)
  const [useLower, setUseLower] = useState(true)
  const [useUpper, setUseUpper] = useState(true)
  const [useNumbers, setUseNumbers] = useState(true)
  const [useSymbols, setUseSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const charset = buildCharset(useLower, useUpper, useNumbers, useSymbols)
  const categoryCount = [useLower, useUpper, useNumbers, useSymbols].filter(Boolean).length

  function handleGenerate() {
    setPassword(generatePassword(length, charset))
    setCopied(false)
  }

  useEffect(() => {
    if (enabled) {
      setPassword(generatePassword(length, buildCharset(true, true, true, true)))
    }
  }, [enabled])

  function handleCopy() {
    if (!password) return
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (enabled === null) {
    return <div className="rounded-xl border border-border bg-surface p-5 text-sm text-textMuted">Memuat...</div>
  }

  if (!enabled) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <KeyRound size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">Password generator</h3>
        </div>
        <p className="mt-2 text-sm text-textMuted">Tool ini sedang dinonaktifkan admin</p>
        {reason && <p className="mt-1 text-xs text-textMuted">{reason}</p>}
      </div>
    )
  }

  const strength = getStrengthLabel(length, categoryCount)

  return (
    <div className="rounded-xl border border-border bg-surface p-5 transition-colors hover:border-borderStrong">
      <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
            <KeyRound size={16} />
          </span>
          <h3 className="font-display text-base font-medium text-textPrimary">Password generator</h3>
        </div>
      <p className="mt-1 text-sm text-textSecondary">Bikin password acak yang kuat, generate baru kapan pun</p>

      <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-border bg-surface2 px-3 py-3">
        <span className="flex-1 break-all font-mono text-sm text-textPrimary">{password || '—'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md border border-border px-2 py-1 text-xs text-textSecondary hover:text-textPrimary"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Tersalin' : 'Copy'}
        </button>
      </div>

      <p className="mt-2 text-xs text-textMuted">
        Kekuatan: <span className="text-teal-light">{strength}</span>
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="text-xs text-textMuted">Panjang</p>
          <span className="font-mono text-xs text-teal-light">{length}</span>
        </div>
        <input
          type="range"
          min={4}
          max={64}
          value={length}
          onChange={(event) => setLength(Number(event.target.value))}
          className="mt-2 w-full accent-[#9aa7ad]"
        />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <label className="flex items-center gap-2 text-sm text-textSecondary">
          <input type="checkbox" checked={useLower} onChange={(event) => setUseLower(event.target.checked)} className="accent-[#9aa7ad]" />
          Huruf kecil
        </label>
        <label className="flex items-center gap-2 text-sm text-textSecondary">
          <input type="checkbox" checked={useUpper} onChange={(event) => setUseUpper(event.target.checked)} className="accent-[#9aa7ad]" />
          Huruf besar
        </label>
        <label className="flex items-center gap-2 text-sm text-textSecondary">
          <input type="checkbox" checked={useNumbers} onChange={(event) => setUseNumbers(event.target.checked)} className="accent-[#9aa7ad]" />
          Angka
        </label>
        <label className="flex items-center gap-2 text-sm text-textSecondary">
          <input type="checkbox" checked={useSymbols} onChange={(event) => setUseSymbols(event.target.checked)} className="accent-[#9aa7ad]" />
          Simbol
        </label>
      </div>

      {!charset && <p className="mt-3 text-xs text-red-400">Pilih minimal satu jenis karakter</p>}

      <button
        onClick={handleGenerate}
        disabled={!charset}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark disabled:opacity-50"
      >
        <RefreshCw size={14} />
        Generate baru
      </button>
    </div>
  )
}
