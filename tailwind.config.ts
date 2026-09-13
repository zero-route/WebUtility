import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: 'rgb(var(--kb-page) / <alpha-value>)',
        surface: 'rgb(var(--kb-surface) / <alpha-value>)',
        surface2: 'rgb(var(--kb-surface-2) / <alpha-value>)',
        border: 'rgb(var(--kb-border) / <alpha-value>)',
        borderStrong: 'rgb(var(--kb-border-strong) / <alpha-value>)',
        textPrimary: 'rgb(var(--kb-text-primary) / <alpha-value>)',
        textSecondary: 'rgb(var(--kb-text-secondary) / <alpha-value>)',
        textMuted: 'rgb(var(--kb-text-muted) / <alpha-value>)',
        teal: {
          light: 'rgb(var(--kb-teal-light) / <alpha-value>)',
          DEFAULT: 'rgb(var(--kb-teal) / <alpha-value>)',
          dark: 'rgb(var(--kb-teal-dark) / <alpha-value>)'
        }
      },
      fontFamily: {
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
        mono: ['var(--font-mono)']
      }
    }
  },
  plugins: []
}

export default config
