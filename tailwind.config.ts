import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#0f1417',
        surface: '#161c20',
        surface2: '#1c2328',
        border: '#262e33',
        borderStrong: '#333d43',
        textPrimary: '#e6edf0',
        textSecondary: '#9aa7ad',
        textMuted: '#6b7780',
        teal: {
          light: '#5DCAA5',
          DEFAULT: '#1D9E75',
          dark: '#0f6e56'
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
