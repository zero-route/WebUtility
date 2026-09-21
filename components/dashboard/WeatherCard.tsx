'use client'

import { useEffect, useState } from 'react'
import {
  Cloud,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  MapPin,
  RefreshCw,
  Sun,
  Wind,
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
    return { label: 'Pagi', emoji: '🌅' }
  }

  if (hour >= 11 && hour < 15) {
    return { label: 'Siang', emoji: '☀️' }
  }

  if (hour >= 15 && hour < 18) {
    return { label: 'Sore', emoji: '🌇' }
  }

  return { label: 'Malam', emoji: '🌙' }
}

function getTemperatureStatus(temp: number) {
  if (temp < 20) {
    return {
      label: 'Dingin',
      emoji: '🧊'
    }
  }

  if (temp > 30) {
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
  if (speed < 5) return 'Tenang'
  if (speed < 15) return 'Sejuk'
  if (speed < 30) return 'Berangin'
  return 'Kencang'
}

function TemperatureGauge({
  temperature,
  apparentTemperature,
  Icon
}: {
  temperature: number
  apparentTemperature: number
  Icon: LucideIcon
}) {
  const min = 0
  const max = 45

  const normalized = Math.max(
    0,
    Math.min(1, (temperature - min) / (max - min))
  )

  const circumference = 2 * Math.PI * 62
  const progress = circumference * 0.74
  const dashOffset = progress * (1 - normalized)

  return (
    <div className="relative mx-auto h-48 w-48">
      <svg
        viewBox="0 0 160 160"
        className="absolute inset-0 h-full w-full -rotate-[135deg]"
      >
        <circle
          cx="80"
          cy="80"
          r="62"
          fill="none"
          stroke="white"
          strokeOpacity="0.06"
          strokeWidth="5"
          strokeDasharray={`${progress} ${circumference}`}
          strokeLinecap="round"
        />

        <circle
          cx="80"
          cy="80"
          r="62"
          fill="none"
          stroke="white"
          strokeOpacity="0.9"
          strokeWidth="5"
          strokeDasharray={`${progress} ${circumference}`}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          style={{
            filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.18))'
          }}
        />

        <circle
          cx="80"
          cy="18"
          r="3.5"
          fill="white"
          fillOpacity="0.85"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Icon
          size={19}
          strokeWidth={1.5}
          className="mb-2 text-white/65"
        />

        <p className="font-mono text-[2rem] font-medium tracking-tight text-textPrimary">
          {temperature}°C
        </p>

        <p className="mt-1 text-[10px] text-textMuted">
          Terasa {apparentTemperature}°
        </p>
      </div>
    </div>
  )
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

          setUpdatedAt(new Date())
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
      <div className="dashboard-card min-h-[390px] p-5">
        <div className="flex items-center gap-3">
          <span className="dashboard-icon">
            <Sun size={18} />
          </span>

          <div>
            <h3 className="text-sm font-medium text-textPrimary">Cuaca</h3>
            <p className="mt-0.5 text-[10px] text-textMuted">
              Kondisi cuaca saat ini
            </p>
          </div>
        </div>

        <div className="flex h-[310px] items-center justify-center text-xs text-textMuted">
          Memuat data cuaca...
        </div>
      </div>
    )
  }

  if (status === 'error' || !data) {
    return (
      <div className="dashboard-card min-h-[390px] p-5">
        <div className="flex items-center gap-3">
          <span className="dashboard-icon">
            <Cloud size={18} />
          </span>

          <div>
            <h3 className="text-sm font-medium text-textPrimary">Cuaca</h3>
            <p className="mt-0.5 text-[10px] text-textMuted">
              Kondisi cuaca saat ini
            </p>
          </div>
        </div>

        <div className="flex h-[310px] items-center justify-center text-xs text-textMuted">
          Gagal memuat data cuaca
        </div>
      </div>
    )
  }

  const Icon = weatherIcon(data.code)
  const weather = describeWeather(data.code)
  const timePeriod = getTimePeriod()
  const temperatureStatus = getTemperatureStatus(data.temperature)
  const windStatus = getWindStatus(data.windSpeed)

  const updatedTime = updatedAt
    ? new Intl.DateTimeFormat('id-ID', {
        hour: '2-digit',
        minute: '2-digit'
      })
        .format(updatedAt)
        .replace('.', ':')
    : '--:--'

  return (
    <div className="dashboard-card dashboard-card-shine relative min-h-[390px] overflow-hidden p-5">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.018] blur-3xl" />

      <div className="relative z-10">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="dashboard-icon">
              <Icon size={18} strokeWidth={1.6} />
            </span>

            <div>
              <h3 className="text-sm font-medium text-textPrimary">
                Cuaca
              </h3>

              <p className="mt-0.5 text-[10px] text-textMuted">
                Kondisi cuaca saat ini
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="rounded-lg border border-border bg-white/[0.02] px-3 py-2">
              <p className="text-[8px] uppercase tracking-[0.12em] text-textMuted">
                Cuaca
              </p>

              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-[11px] text-textPrimary">
                  {weather}
                </span>
                <span className="text-sm">
                  {data.code === 0 ? '☀️' : '☁️'}
                </span>
              </div>
            </div>

            <div className="rounded-lg border border-border bg-white/[0.02] px-3 py-2">
              <p className="text-[8px] uppercase tracking-[0.12em] text-textMuted">
                Waktu
              </p>

              <div className="mt-0.5 flex items-center gap-2">
                <span className="text-[11px] text-textPrimary">
                  {timePeriod.label}
                </span>
                <span className="text-sm">
                  {timePeriod.emoji}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <TemperatureGauge
            temperature={data.temperature}
            apparentTemperature={data.apparentTemperature}
            Icon={Icon}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-border bg-surface2/65 px-3.5 py-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] text-textMuted">Suhu</p>

                <p className="mt-1 text-sm font-medium text-textPrimary">
                  {temperatureStatus.label}
                </p>

                <p className="mt-1 text-[9px] text-textMuted">
                  {data.temperature - 3}°C – {data.temperature + 3}°C
                </p>
              </div>

              <span className="text-lg">
                {temperatureStatus.emoji}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface2/65 px-3.5 py-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[10px] text-textMuted">Angin</p>

                <p className="mt-1 text-sm font-medium text-textPrimary">
                  {windStatus}
                </p>

                <p className="mt-1 text-[9px] text-textMuted">
                  {data.windSpeed} km/j
                </p>
              </div>

              <span className="text-lg">🌬️</span>
            </div>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3 text-[9px] text-textMuted">
          <div className="flex items-center gap-1.5">
            <MapPin size={11} strokeWidth={1.5} />

            <span>
              {data.source === 'manual'
                ? 'Lokasi diset manual'
                : 'Lokasi berdasarkan IP pengunjung'}
            </span>
          </div>

          <div className="flex shrink-0 items-center gap-1.5">
            <RefreshCw size={10} strokeWidth={1.5} />
            <span>Diperbarui {updatedTime}</span>
          </div>
        </div>
      </div>
    </div>
  )
}