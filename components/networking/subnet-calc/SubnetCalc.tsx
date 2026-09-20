'use client'

import { useState } from 'react'
import { calculateSubnet, ipToInt, maskToPrefix, SubnetResult } from '@/lib/subnet'

type Mode = 'cidr' | 'mask'

export default function SubnetCalc() {
  const [ip, setIp] = useState('')
  const [mode, setMode] = useState<Mode>('cidr')
  const [cidrValue, setCidrValue] = useState('24')
  const [maskValue, setMaskValue] = useState('255.255.255.0')
  const [result, setResult] = useState<SubnetResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  function handleCalculate() {
    setError(null)
    setResult(null)

    if (ipToInt(ip) === null) {
      setError('IP address tidak valid')
      return
    }

    let prefix: number

    if (mode === 'cidr') {
      prefix = Number(cidrValue)
      if (Number.isNaN(prefix) || prefix < 0 || prefix > 32) {
        setError('CIDR harus antara 0 sampai 32')
        return
      }
    } else {
      const maskInt = ipToInt(maskValue)
      if (maskInt === null) {
        setError('Subnet mask tidak valid')
        return
      }
      prefix = maskToPrefix(maskInt)
    }

    const calculated = calculateSubnet(ip, prefix)
    if (!calculated) {
      setError('Gagal menghitung, cek kembali input')
      return
    }

    setResult(calculated)
  }

  return (
    <div className="flex flex-col gap-4">
      <div>
        <input
          value={ip}
          onChange={(event) => setIp(event.target.value)}
          placeholder="Contoh: 192.168.1.10"
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
        />

        <div className="mt-3 flex gap-2">
          <button
            onClick={() => setMode('cidr')}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              mode === 'cidr'
                ? 'border border-teal bg-teal/10 text-teal-light'
                : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
            }`}
          >
            CIDR
          </button>
          <button
            onClick={() => setMode('mask')}
            className={`flex-1 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              mode === 'mask'
                ? 'border border-teal bg-teal/10 text-teal-light'
                : 'border border-border text-textSecondary hover:border-teal/40 hover:text-textPrimary'
            }`}
          >
            Subnet Mask
          </button>
        </div>

        {mode === 'cidr' ? (
          <div className="mt-3 flex items-center gap-2">
            <span className="font-mono text-sm text-textMuted">/</span>
            <input
              type="number"
              min={0}
              max={32}
              value={cidrValue}
              onChange={(event) => setCidrValue(event.target.value)}
              className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
            />
          </div>
        ) : (
          <input
            value={maskValue}
            onChange={(event) => setMaskValue(event.target.value)}
            placeholder="255.255.255.0"
            className="mt-3 w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
          />
        )}

        <button
          onClick={handleCalculate}
          className="mt-3 w-full rounded-lg bg-teal px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-dark"
        >
          Hitung
        </button>

        {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
      </div>

      {result && (
        <div className="rounded-lg border border-border bg-surface2 p-4">
          <p className="font-mono text-sm text-teal-light">{result.cidrNotation}</p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-xs text-textMuted">Network address</p>
              <p className="mt-1 font-mono text-textPrimary">{result.networkAddress}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Broadcast address</p>
              <p className="mt-1 font-mono text-textPrimary">{result.broadcastAddress}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Subnet mask</p>
              <p className="mt-1 font-mono text-textPrimary">{result.subnetMask}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Wildcard mask</p>
              <p className="mt-1 font-mono text-textPrimary">{result.wildcardMask}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Host pertama</p>
              <p className="mt-1 font-mono text-textPrimary">{result.firstHost}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Host terakhir</p>
              <p className="mt-1 font-mono text-textPrimary">{result.lastHost}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Total alamat</p>
              <p className="mt-1 font-mono text-textPrimary">{result.totalAddresses.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Host usable</p>
              <p className="mt-1 font-mono text-textPrimary">{result.usableHosts.toLocaleString('id-ID')}</p>
            </div>
            <div>
              <p className="text-xs text-textMuted">Kelas IP</p>
              <p className="mt-1 text-textPrimary">{result.ipClass}</p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs text-textMuted">IP dalam biner</p>
            <p className="mt-1 break-all font-mono text-xs text-textSecondary">{result.binaryIp}</p>
          </div>
        </div>
      )}
    </div>
  )
}
