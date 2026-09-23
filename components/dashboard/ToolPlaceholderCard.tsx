'use client'

import { motion } from 'framer-motion'
import {
  Braces,
  Code2,
  Database,
  Download,
  ExternalLink,
  Fingerprint,
  Image,
  LockKeyhole,
  Network,
  QrCode,
  ShieldCheck,
  Terminal,
  Instagram,
  Youtube,
  Music2,
  WandSparkles,
  FileImage,
  FileDiff,
  KeyRound,
  Regex,
  Globe,
  Clock3
} from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'
import { useDisabledToolsNote } from '@/lib/hooks/useDisabledToolsNote'
import type { ToolItem } from '@/lib/toolsData'

const icons = {
  'tiktok-downloader': Music2,
  'youtube-downloader': Youtube,
  'instagram-downloader': Instagram,
  'x-threads-downloader': Download,

  'svg-vectorizer': Code2,
  'base64-converter': Braces,
  'qr-barcode-generator': QrCode,
  'color-picker': WandSparkles,
  'image-compressor': FileImage,

  'base64-encode-decode': Braces,
  'aes-encryptor': LockKeyhole,
  'password-generator': ShieldCheck,
  'hash-generator': Fingerprint,
  'uuid-generator': Code2,
  'password-strength-checker': ShieldCheck,
  'file-hash-checker': Fingerprint,

  'json-formatter': Braces,
  'jwt-decoder': ShieldCheck,
  'markdown-notes': Code2,
  'url-parser': Network,
  'regex-tester': Regex,
  'case-converter': Code2,
  'text-diff-checker': FileDiff,
  'cron-expression-parser': Clock3,

  'ip-network-info': Network,
  'subnet-calculator': Network,
  'timestamp-converter': Database,
  'dns-lookup': Globe,
  'ping-latency-tester': Terminal,
  'mac-address-vendor-lookup': Network,
  'whois-domain-info': Globe
}

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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.045, 0.18),
        duration: 0.34,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={active ? { y: -2 } : undefined}
      whileTap={active ? { y: 0 } : undefined}
      className={`group relative aspect-square w-full overflow-hidden rounded-xl border p-4 text-center backdrop-blur-xl transition-all duration-500 ${
        disabled
          ? 'cursor-not-allowed border-white/[0.06] bg-white/[0.015]'
          : 'border-white/[0.07] bg-white/[0.025] hover:border-white/[0.13] hover:bg-white/[0.035]'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 ${
          active ? 'group-hover:opacity-100' : ''
        }`}
      >
        <div className="absolute -inset-x-20 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-[55%]" />
      </div>

      <div
        className={`relative flex h-full flex-col items-center transition-all duration-300 ${
          disabled ? 'blur-[3px] opacity-20' : ''
        }`}
      >
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/[0.07] bg-white/[0.025] text-textSecondary transition-all duration-500 ${
            active
              ? 'group-hover:border-white/[0.14] group-hover:bg-white/[0.05] group-hover:text-textPrimary'
              : ''
          }`}
        >
          <Icon
            size={17}
            strokeWidth={1.7}
            className={`transition-transform duration-500 ease-out ${
              active
                ? 'group-hover:translate-y-[-1px] group-hover:rotate-[-4deg]'
                : ''
            }`}
          />
        </div>

        <h3 className="mt-2 shrink-0 font-display text-[12px] font-medium leading-tight text-textPrimary">
          {tool.name}
        </h3>

        <p className="mt-1 line-clamp-2 max-w-[92%] flex-1 text-[10px] leading-[1.35] text-textSecondary">
          {tool.description}
        </p>

        <div
          className={`group/button relative mt-2 flex h-8 w-[112px] shrink-0 items-center justify-center gap-1.5 overflow-hidden rounded-md border border-black/10 bg-white px-4 text-[10px] font-medium text-black transition-all duration-500 ${
            active ? 'hover:border-white hover:text-white' : ''
          }`}
        >
          <span
            className={`absolute inset-0 origin-left scale-x-0 bg-[#151515] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              active ? 'group-hover/button:scale-x-100' : ''
            }`}
          />

          <span className="relative z-10 whitespace-nowrap transition-transform duration-500 ease-out group-hover/button:translate-x-[-1px]">
            Kunjungi
          </span>

          <span className="relative z-10 flex items-center justify-center">
            <ExternalLink
              size={11}
              strokeWidth={2}
              className="transition-transform duration-500 ease-out group-hover/button:translate-x-[2px] group-hover/button:translate-y-[-2px]"
            />
          </span>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/10 border-t-white/60" />
        </div>
      )}

      {disabled && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.025] text-textSecondary">
            <LockKeyhole
              size={19}
              strokeWidth={1.7}
            />
          </div>

          <p className="mt-2 font-display text-xs font-medium text-textPrimary">
            Tools Dinonaktifkan Oleh Admin
          </p>

          {disabledNote && (
            <p className="mt-1 max-w-[220px] text-[10px] leading-4 text-textMuted">
              {disabledNote}
            </p>
          )}
        </div>
      )}
    </motion.button>
  )
}
