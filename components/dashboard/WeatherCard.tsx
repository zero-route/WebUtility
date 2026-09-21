'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun,
  Moon,
  LucideIcon
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
  if ([95, 96, 99].includes(code)) return 'Badai petir'
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

function weatherIcon(code: number): LucideIcon {
  if (code === 0) return Sun
  if ([1, 2, 3].includes(code)) return Cloud
  if ([45, 48].includes(code)) return CloudFog
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return CloudRain
  if ([71, 73, 75].includes(code)) return CloudSnow
  if ([95, 96, 99].includes(code)) return CloudLightning
  return Cloud
}

function getTimePeriod() {
  const hour = new Date().getHours()

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

function getTemperatureStatus(temperature: number) {
  if (temperature < 20) {
    return {
      label: 'Dingin',
      emoji: '🧊'
    }
  }

  if (temperature >= 30) {
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

function getWindStatus(windSpeed: number) {
  if (windSpeed < 10) return 'Tenang'
  if (windSpeed < 20) return 'Sedang'
  return 'Kencang'
}

function getGaugeProgress(temperature: number) {
  const min = 0
  const max = 45
  const value = Math.min(Math.max(temperature, min), max)

  return (value - min) / (max - min)
}

function Gauge({
  temperature
}: {
  temperature: number
}) {
  const radius = 72
  const circumference = 2 * Math.PI * radius
  const progress = getGaugeProgress(temperature)
  const dashOffset = circumference * (1 - progress)

  return (
    <div className="relative h-[154px] w-[154px]">
      <svg
        viewBox="0 0 180 180"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-white/[0.06]"
        />

        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          className="text-white transition-all duration-700"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-semibold tracking-tight text-textPrimary">
          {temperature}°
        </span>
        <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-textMuted">
          Celsius
        </span>
      </div>
    </div>
  )
}

export default function WeatherCard() {
  const [data, setData] = useState<WeatherData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [now, setNow] = useState<Date | null>(null)

  useEffect(() => {
    setNow(new Date())

    const interval = setInterval(() => {
      setNow(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

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
            loadFromCoords(
              manual.latitude,
              manual.longitude,
              'manual'
            )
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

  const timePeriod = useMemo(() => getTimePeriod(), [now])

  if (status === 'loading') {
    return (
      <div className="min-h-[280px] rounded-2xl border border-border bg-surface p-5">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-textMuted">Memuat cuaca...</p>
        </div>
      </div>
    )
  }

  if (status === 'error' || !data) {
    return (
      <div className="min-h-[280px] rounded-2xl border border-border bg-surface p-5">
        <div className="flex h-full items-center justify-center">
          <p className="text-sm text-textMuted">
            Gagal memuat data cuaca
          </p>
        </div>
      </div>
    )
  }

  const Icon = weatherIcon(data.code)
  const temperatureStatus = getTemperatureStatus(data.temperature)

  return (
    <div className="min-h-[280px] rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <div className="flex h-full flex-col">
        <div className="grid grid-cols-2 gap-2">
          <div className="flex min-w-0 items-center justify-between rounded-xl border border-border bg-surface2 px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-textMuted">
                Cuaca
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-textPrimary">
                = {describeWeather(data.code)}
              </p>
            </div>

            <span className="ml-2 text-lg">
              {weatherEmoji(data.code)}
            </span>
          </div>

          <div className="flex min-w-0 items-center justify-between rounded-xl border border-border bg-surface2 px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-[0.12em] text-textMuted">
                Waktu
              </p>
              <p className="mt-0.5 truncate text-xs font-medium text-textPrimary">
                = {timePeriod.label}
              </p>
            </div>

            <span className="ml-2 text-lg">
              {timePeriod.emoji}
            </span>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center py-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-white/[0.02] blur-2xl" />
            <Gauge temperature={data.temperature} />

            <div className="absolute -right-1 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface2 text-textSecondary">
              <Icon size={13} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between rounded-xl border border-border bg-surface2 px-3 py-2.5">
            <div>
              <p className="text-[10px] text-textMuted">
                Suhu
              </p>
              <p className="mt-0.5 text-xs font-medium text-textPrimary">
                {temperatureStatus.label}
              </p>
            </div>

            <span className="text-lg">
              {temperatureStatus.emoji}
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-border bg-surface2 px-3 py-2.5">
            <div>
              <p className="text-[10px] text-textMuted">
                Angin
              </p>
              <p className="mt-0.5 text-xs font-medium text-textPrimary">
                {getWindStatus(data.windSpeed)}
              </p>
            </div>

            <span className="text-lg">
              🌬
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}