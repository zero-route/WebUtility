'use client'

import { motion } from 'framer-motion'
import {
  Braces,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileCode2,
  Fingerprint,
  Image,
  ImageDown,
  LockKeyhole,
  Network,
  Palette,
  QrCode,
  Regex,
  Shield,
  ShieldCheck,
  Terminal,
  Youtube,
  Instagram
} from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'
import { useDisabledToolsNote } from '@/lib/hooks/useDisabledToolsNote'
import type { ToolItem } from '@/lib/toolsData'

function TikTokIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M15.2 4.1C15.65 5.7 16.65 6.75 18.2 7.15V10.1C17.05 10 16.05 9.65 15.2 9.1V15.15C15.2 18.2 12.9 20.2 10.15 20.2C7.4 20.2 5.2 18.35 5.2 15.65C5.2 12.8 7.55 10.75 10.4 10.75C10.75 10.75 11.1 10.8 11.4 10.9V13.85C11.1 13.7 10.8 13.6 10.45 13.6C9.25 13.6 8.3 14.4 8.3 15.55C8.3 16.55 9.1 17.35 10.2 17.35C11.45 17.35 12.35 16.45 12.35 15.05V3.8H15.2V4.1Z"
        fill="currentColor"
      />
    </svg>
  )
}

const icons = {
  'tiktok-downloader': TikTokIcon,
  'youtube-downloader': Youtube,
  'instagram-downloader': Instagram,
  'x-threads-downloader': Download,

  'svg-vectorizer': Code2,
  'base64-converter': Braces,
  'qr-barcode-generator': QrCode,
  'color-picker-palette': Palette,
  'image-compressor': ImageDown,

  'base64-encode-decode': Braces,
  'aes-encryptor': LockKeyhole,
  'password-generator': Shield,
  'hash-generator': Fingerprint,
  'uuid-guid-generator': Code2,
  'password-strength-checker': ShieldCheck,
  'file-hash-checker': FileCode2,

  'json-formatter': Braces,
  'jwt-decoder': ShieldCheck,
  'markdown-notes': Code2,
  'url-parser': Network,
  'regex-tester': Regex,
  'case-converter': Code2,
  'text-diff-checker': Code2,
  'cron-expression-parser': Terminal,

  'ip-network-info': Network,
  'subnet-calculator': Network,
  'timestamp-converter': Database,
  'dns-lookup': Network,
  'ping-latency-tester': Terminal,
  'mac-address-vendor-lookup': Network,
  'whois-domain-info': Network
} as const

export default function ToolPlaceholderCard({
  tool,
  index,
  onOpen
}: {
  tool: ToolItem
  index: number
  onOpen: () => void
}) {
  const { enabled } = useToolEnabled(tool.id)
  const disabledNote = useDisabledToolsNote()

  const Icon = icons[tool.id as keyof typeof icons] ?? Code2

  const loading = enabled === null
  const disabled = enabled === false
  const active = enabled === true

  return (
    <motion.button
      type="button"
      disabled={!active}
      onClick={onOpen}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.035, 0.2),
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={active ? { y: -2 } : undefined}
      whileTap={active ? { scale: 0.985 } : undefined}
      className={`group relative min-w-0 overflow-hidden rounded-xl border bg-surface px-3 py-4 text-center transition-all duration-300 ${
        disabled
          ? 'cursor-not-allowed border-border'
          : 'border-border hover:border-textMuted hover:bg-surface2'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent transition-transform duration-700 ease-out ${
          active ? 'group-hover:translate-x-[300%]' : ''
        }`}
      />

      <div
        className={`relative flex min-h-[172px] flex-col items-center ${
          disabled ? 'blur-[3px] opacity-20' : ''
        }`}
      >
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-surface2 text-textPrimary transition-all duration-300 ${
            active
              ? 'group-hover:border-textMuted group-hover:bg-surface group-hover:scale-105'
              : ''
          }`}
        >
          <Icon
            size={21}
            strokeWidth={1.8}
            className={`transition-transform duration-300 ${
              active
                ? 'group-hover:scale-105'
                : ''
            }`}
          />
        </div>

        <h3 className="mt-3 line-clamp-2 min-h-[32px] font-display text-[11px] font-medium leading-4 text-textPrimary">
          {tool.name}
        </h3>

        <p className="mt-1 line-clamp-2 min-h-[34px] text-[9px] leading-4 text-textSecondary">
          {tool.description}
        </p>

        <div
          className={`mt-auto flex items-center gap-1 rounded-full border border-border bg-surface2 py-1 pl-2.5 pr-1 text-[9px] font-medium text-textSecondary transition-all duration-300 ${
            active
              ? 'group-hover:border-textMuted group-hover:bg-surface group-hover:text-textPrimary'
              : ''
          }`}
        >
          Kunjungi

          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full border border-border bg-surface text-textMuted transition-all duration-300 ${
              active
                ? 'group-hover:text-textPrimary'
                : ''
            }`}
          >
            <ExternalLink size={9} strokeWidth={2} />
          </span>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-border border-t-textPrimary" />
        </div>
      )}

      {disabled && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-3 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-borderStrong bg-surface2 text-textSecondary shadow-lg">
            <LockKeyhole size={18} strokeWidth={1.8} />
          </div>

          <p className="mt-2.5 font-display text-[10px] font-medium leading-4 text-textPrimary">
            Tools Dinonaktifkan Oleh Admin
          </p>

          {disabledNote && (
            <p className="mt-1 max-w-[180px] text-[9px] leading-4 text-textMuted">
              {disabledNote}
            </p>
          )}
        </div>
      )}
    </motion.button>
  )
}