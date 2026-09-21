'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Droplets,
  MapPin,
  RefreshCw,
  Sun,
  Wind
} from 'lucide-react'
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
  if ([95, 96, 99].includes(code)) return 'Badai'
  return 'Tidak diketahui'
}

function weatherEmoji(code: number) {
  if (code === 0) return '☀️'
  if ([1, 2, 3].includes(code)) return '☁️'
  if ([45, 48].includes(code)) return '🌫️'
  if ([51, 53, 55].includes(code)) return '🌦️'
  if ([61, 63, 65, 80, 81, 82].includes(code)) return '🌧️'
  if ([71, 73, 75].includes(code)) return '❄️'
  if ([95, 96, 99].includes(code)) return '⛈️'
  return '🌤️'
}

function getWeatherIcon(code: number) {
  if (code === 0) return Sun
  if ([1, 2, 3].includes(code)) return Cloud
  if ([45, 48].includes(code)) return CloudFog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain
  if ([71, 73, 75].includes(code)) return CloudSnow
  if ([95, 96, 99].includes(code)) return CloudLightning
  return Cloud
}

function getTemperatureStatus(temperature: number) {
  if (temperature < 22) {
    return {
      label: 'Dingin',
      emoji: '🧊'
    }
  }

  if (temperature > 28) {
    return {
      label: 'Panas',
      emoji: '🔥'
    }
  }

  return {
    label: 'Ideal',
    emoji: '🍃'
  }
}

function getWindStatus(speed: number) {
  if (speed < 10) return 'Tenang'
  if (speed < 25) return 'Sedang'
  if (speed < 40) return 'Kencang'
  return 'Sangat kencang'
}

function getDayPeriod() {
  const hour = Number(
    new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      hour12: false,
      timeZone: 'Asia/Jakarta'
    }).format(new Date())
  )

  if (hour >= 5 && hour < 11) {
    return {
      label: 'Pagi',
      emoji: '🌅'
    }
  }

  if (hour >= 11 && hour < 15) {
    return {
      label: 'Siang',
      emoji: '☀️'
    }
  }

  if (hour >= 15 && hour < 18) {
    return {
      label: 'Sore',
      emoji: '🌇'
    }
  }

  return {
    label: 'Malam',
    emoji: '🌙'
  }
}

function getGaugeOffset(temperature: number) {
  const min = 0
  const max = 40
  const value = Math.max(min, Math.min(max, temperature))
  return 282 - (value / max) * 210
}

export default function WeatherCard() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null)

  useEffect(() => {
    let cancelled = false

    function loadFromCoords(
      latitude: number,
      longitude: number,
      source: WeatherSource
    ) {
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,wind_speed_10m&timezone=auto`
      )
        .then((res) => {
          if (!res.ok) throw new Error('Weather request failed')
          return res.json()
        })
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

          setUpdatedAt(new Date())
          setStatus('ready')
        })
        .catch(() => {
          if (!cancelled) setStatus('error')
        })
    }

    function loadFromIp() {
      fetch('https://ipapi.co/json/')
        .then((res) => {
          if (!res.ok) throw new Error('Location request failed')
          return res.json()
        })
        .then((json) => {
          if (cancelled) return

          if (
            typeof json.latitude === 'number' &&
            typeof json.longitude === 'number'
          ) {
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

  const period = useMemo(() => getDayPeriod(), [updatedAt])
  const temperatureStatus = data
    ? getTemperatureStatus(data.temperature)
    : null

  if (status === 'loading') {
    return (
      <div className="dashboard-card-shine relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-borderStrong bg-surface2">
            <Sun size={21} className="text-textPrimary" />
          </div>

          <div>
            <h3 className="font-display text-base font-medium text-textPrimary">
              Cuaca
            </h3>
            <p className="mt-1 text-sm text-textMuted">
              Kondisi cuaca saat ini
            </p>
          </div>
        </div>

        <div className="flex h-[330px] items-center justify-center text-sm text-textMuted">
          Memuat data cuaca...
        </div>
      </div>
    )
  }

  if (status === 'error' || !data || !temperatureStatus) {
    return (
      <div className="dashboard-card-shine relative min-h-[420px] overflow-hidden rounded-2xl border border-border bg-surface p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border border-borderStrong bg-surface2">
            <Sun size={21} className="text-textPrimary" />
          </div>

          <div>
            <h3 className="font-display text-base font-medium text-textPrimary">
              Cuaca
            </h3>
            <p className="mt-1 text-sm text-textMuted">
              Kondisi cuaca saat ini
            </p>
          </div>
        </div>

        <p className="mt-8 text-sm text-textMuted">
          Gagal memuat data cuaca
        </p>
      </div>
    )
  }

  const WeatherIcon = getWeatherIcon(data.code)
  const gaugeOffset = getGaugeOffset(data.temperature)

  return (
    <div className="dashboard-card-shine relative overflow-hidden rounded-2xl border border-border bg-surface p-6">
      <div className="relative z-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-borderStrong bg-surface2 text-textPrimary">
              <WeatherIcon size={21} strokeWidth={1.5} />
            </div>

            <div>
              <h3 className="font-display text-base font-medium text-textPrimary">
                Cuaca
              </h3>
              <p className="mt-1 text-sm text-textMuted">
                Kondisi cuaca saat ini
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="rounded-xl border border-border bg-surface2 px-3 py-2">
              <p className="text-[9px] uppercase tracking-[0.16em] text-textMuted">
                Cuaca
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-textPrimary">
                  {describeWeather(data.code)}
                </span>
                <span className="text-sm">{weatherEmoji(data.code)}</span>
              </div>
            </div>

            <div className="rounded-xl border border-border bg-surface2 px-3 py-2">
              <p className="text-[9px] uppercase tracking-[0.16em] text-textMuted">
                Waktu
              </p>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-xs text-textPrimary">
                  {period.label}
                </span>
                <span className="text-sm">{period.emoji}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mx-auto mt-4 h-48 w-48">
          <svg
            viewBox="0 0 220 220"
            className="absolute inset-0 h-full w-full -rotate-[135deg]"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="110"
              cy="110"
              r="78"
              stroke="white"
              strokeOpacity="0.055"
              strokeWidth="8"
              strokeDasharray="408 82"
              strokeLinecap="round"
            />

            <circle
              cx="110"
              cy="110"
              r="78"
              stroke="white"
              strokeOpacity="0.9"
              strokeWidth="8"
              strokeDasharray="408 82"
              strokeDashoffset={gaugeOffset}
              strokeLinecap="round"
              className="transition-all duration-700"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <WeatherIcon
              size={19}
              strokeWidth={1.4}
              className="mb-2 text-textMuted"
            />

            <p className="font-mono text-3xl font-medium text-textPrimary">
              {data.temperature}°C
            </p>

            <p className="mt-1 text-[11px] text-textMuted">
              Terasa {data.apparentTemperature}°
            </p>
          </div>

          <span className="absolute right-[13px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full border-2 border-surface bg-white/80" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-surface2 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-textMuted">Suhu</p>
                <p className="mt-1 text-sm font-medium text-textPrimary">
                  {temperatureStatus.label}
                </p>
                <p className="mt-1 text-[10px] text-textMuted">
                  22°C – 28°C
                </p>
              </div>

              <span className="text-lg">{temperatureStatus.emoji}</span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface2 px-4 py-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs text-textMuted">Angin</p>
                <p className="mt-1 text-sm font-medium text-textPrimary">
                  {getWindStatus(data.windSpeed)}
                </p>
                <p className="mt-1 text-[10px] text-textMuted">
                  {data.windSpeed} km/j
                </p>
              </div>

              <span className="text-lg">🌬️</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-[10px] text-textMuted">
          <div className="flex items-center gap-1.5">
            <MapPin size={11} />
            <span>
              {data.source === 'manual'
                ? 'Lokasi diset manual'
                : 'Lokasi berdasarkan IP pengunjung'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <RefreshCw size={10} />
            <span>
              {updatedAt
                ? `Diperbarui ${new Intl.DateTimeFormat('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit'
                  }).format(updatedAt)}`
                : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}