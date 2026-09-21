'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

function hexToHsl(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60
    else if (max === g) h = ((b - r) / d + 2) * 60
    else h = ((r - g) / d + 4) * 60
  }

  return [h, s * 100, l * 100]
}

function hslToHex(h: number, s: number, l: number): string {
  const hue = ((h % 360) + 360) % 360
  const sat = s / 100
  const light = l / 100

  const c = (1 - Math.abs(2 * light - 1)) * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = light - c / 2

  let r = 0
  let g = 0
  let b = 0

  if (hue < 60) [r, g, b] = [c, x, 0]
  else if (hue < 120) [r, g, b] = [x, c, 0]
  else if (hue < 180) [r, g, b] = [0, c, x]
  else if (hue < 240) [r, g, b] = [0, x, c]
  else if (hue < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]

  const toHex = (value: number) =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, '0')

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#1D9E75')
  const [copiedHex, setCopiedHex] = useState<string | null>(null)

  const [h, s, l] = hexToHsl(baseColor)

  const palettes = {
    Complementary: [baseColor, hslToHex(h + 180, s, l)],
    Analogous: [hslToHex(h - 30, s, l), baseColor, hslToHex(h + 30, s, l)],
    Triadic: [baseColor, hslToHex(h + 120, s, l), hslToHex(h + 240, s, l)],
    Shades: [hslToHex(h, s, Math.min(l + 30, 95)), baseColor, hslToHex(h, s, Math.max(l - 30, 5))]
  }

  function handleCopy(hex: string) {
    navigator.clipboard.writeText(hex)
    setCopiedHex(hex)
    setTimeout(() => setCopiedHex(null), 2000)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <input
          type="color"
          value={baseColor}
          onChange={(event) => setBaseColor(event.target.value)}
          className="h-11 w-16 shrink-0 cursor-pointer rounded-lg border border-border bg-surface2"
        />
        <input
          value={baseColor}
          onChange={(event) => setBaseColor(event.target.value)}
          className="w-full rounded-lg border border-border bg-surface2 px-3 py-2 font-mono text-sm text-textPrimary outline-none focus:border-teal"
        />
      </div>

      {Object.entries(palettes).map(([name, colors]) => (
        <div key={name} className="rounded-lg border border-border bg-surface2 p-4">
          <h4 className="text-sm font-medium text-textPrimary">{name}</h4>
          <div className="mt-3 flex gap-2">
            {colors.map((hex, index) => (
              <button
                key={`${hex}-${index}`}
                onClick={() => handleCopy(hex)}
                className="flex flex-1 flex-col items-center gap-2 rounded-lg border border-border p-2 transition-colors hover:border-teal/40"
              >
                <span className="h-12 w-full rounded-md" style={{ backgroundColor: hex }} />
                <span className="flex items-center gap-1 font-mono text-xs text-textSecondary">
                  {copiedHex === hex ? <Check size={10} /> : <Copy size={10} />}
                  {hex}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
