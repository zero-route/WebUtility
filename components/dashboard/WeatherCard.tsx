'use client'

import { useEffect, useState } from 'react'
import { Cloud, CloudRain, CloudFog, Sun, CloudSnow, CloudLightning, LucideIcon } from 'lucide-react'
import { getManualLocation, getWeatherMode } from '@/lib/settings'

type WeatherSource = 'manual' | 'ip'

type WeatherData = {
  temperature: number
  apparentTemperature: number
  humidity: number
  windSpeed: number
  code: number
  source: WeatherSource
}

function describeWeather(code: number) {
  if (code === 0) return 'Cerah'
  if ([1, 2, 3].includes(code)) return 'Berawan'
  if ([45, 48].includes(code)) return 'Berkabut'
  if ([51, 53, 55].includes(code)) return 'Gerimis'
  if ([61, 63, 65, 80, 81, 82].includes(code)) return 'Hujan'
  if ([71, 73, 75].includes(code)) return 'Salju'
  if ([95, 96, 99].includes(code)) return 'Badai petir'
  return 'Tidak diketahui'
}

function weatherIcon(code: number): LucideIcon {
  if (code === 0) return Sun
  if ([1, 2, 3].includes(code)) return Cloud
  if ([45, 48].includes(code)) return CloudFog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain
  if ([71, 73, 75].includes(code)) return CloudSnow
  if ([95, 96, 99].includes(code)) return CloudLightning
  return Cloud
}

export default function WeatherCard() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  useEffect(() => {
    let cancelled = false

    function loadFromCoords(latitude: number, longitude: number, source: WeatherSource) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      )
        .then((res) => res.json())
        .then((json) => {
          if (cancelled) return
          setData({
            temperature: Math.round(json.current.temperature_2m),
            apparentTemperature: Math.round(json.current.apparent_temperature),
            humidity: Math.round(json.current.relative_humidity_2m),
            windSpeed: Math.round(json.current.wind_speed_10m),
            code: json.current.weather_code,
            source
          })
          setStatus('ready')
        })
        .catch(() => {
          if (!cancelled) setStatus('error')
        })
    }

    function loadFromIp() {
      fetch('https://ipapi.co/json/')
        .then((res) => res.json())
        .then((json) => {
          if (cancelled) return
          if (typeof json.latitude === 'number' && typeof json.longitude === 'number') {
            loadFromCoords(json.latitude, json.longitude, 'ip')
          } else {
            setStatus('error')
          }
        })
        .catch(() => {
          if (!cancelled) setStatus('error')
        })
    }

    getWeatherMode().then((mode) => {
      if (cancelled) return
      if (mode === 'manual') {
        getManualLocation().then((manual) => {
          if (cancelled) return
          if (manual) {
            loadFromCoords(manual.latitude, manual.longitude, 'manual')
          } else {
            loadFromIp()
          }
        })
      } else {
        loadFromIp()
      }
    })

    return () => {
      cancelled = true
    }
  }, [])

  if (status === 'loading') {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display text-sm font-medium text-textPrimary">Cuaca</h3>
        <p className="mt-4 text-sm text-textMuted">Memuat...</p>
      </div>
    )
  }

  if (status === 'error' || !data) {
    return (
      <div className="rounded-xl border border-border bg-surface p-5">
        <h3 className="font-display text-sm font-medium text-textPrimary">Cuaca</h3>
        <p className="mt-4 text-sm text-textMuted">Gagal memuat data cuaca</p>
      </div>
    )
  }

  const Icon = weatherIcon(data.code)

  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-sm font-medium text-textPrimary">Cuaca</h3>
        <span className="text-xs text-textMuted">{describeWeather(data.code)}</span>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-teal-light">
          <Icon size={20} />
        </span>
        <div>
          <p className="text-2xl font-bold text-textPrimary">{data.temperature}°C</p>
          <p className="text-xs text-textMuted">Terasa {data.apparentTemperature}°C</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg border border-border bg-surface2 px-3 py-2">
          <p className="text-xs text-textMuted">Kelembapan</p>
          <p className="mt-1 text-sm font-medium text-textPrimary">{data.humidity}%</p>
        </div>
        <div className="rounded-lg border border-border bg-surface2 px-3 py-2">
          <p className="text-xs text-textMuted">Angin</p>
          <p className="mt-1 text-sm font-medium text-textPrimary">{data.windSpeed} km/j</p>
        </div>
      </div>
      {data.source === 'manual' && <p className="mt-3 text-xs text-textMuted">Lokasi diset manual</p>}
      {data.source === 'ip' && <p className="mt-3 text-xs text-textMuted">Lokasi berdasarkan IP pengunjung</p>}
    </div>
  )
}
