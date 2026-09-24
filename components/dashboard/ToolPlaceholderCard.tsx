'use client'

import { motion } from 'framer-motion'
import {
  Braces,
  Code2,
  Database,
  Download,
  ExternalLink,
  Fingerprint,
  FileDiff,
  FileImage,
  Globe,
  Instagram,
  LockKeyhole,
  Clock3,
  Music2,
  Network,
  QrCode,
  Regex,
  ShieldCheck,
  Terminal,
  WandSparkles,
  Youtube
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
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.035, 0.16),
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={active ? { y: -2 } : undefined}
      whileTap={active ? { scale: 0.99 } : undefined}
      className={`
        group relative isolate w-full overflow-hidden rounded-[14px]
        border text-left transition-all duration-300
        ${
          disabled
            ? 'cursor-not-allowed border-white/[0.055] bg-white/[0.012]'
            : 'border-white/[0.075] bg-white/[0.018] hover:border-white/[0.14] hover:bg-white/[0.028]'
        }
      `}
    >
      <div
        className={`
          pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500
          ${active ? 'group-hover:opacity-100' : ''}
        `}
      >
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[35%]" />

        <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/[0.025] to-transparent" />
      </div>

      <Icon
        size={150}
        strokeWidth={1}
        className="
          pointer-events-none absolute
          -bottom-12 -right-8
          rotate-[-10deg]
          text-white/[0.018]
          transition-all duration-500
          group-hover:rotate-[-7deg]
          group-hover:text-white/[0.035]
        "
      />

      <div
        className={`
          relative flex min-h-[142px] flex-col p-3.5
          sm:min-h-[152px] sm:p-4
          md:min-h-[158px]
          ${disabled ? 'blur-[3px] opacity-20' : ''}
        `}
      >
        <div className="flex items-start justify-between gap-3">
          <div
            className={`
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-[10px] border border-white/[0.07]
              bg-white/[0.025] text-textSecondary
              transition-all duration-300
              sm:h-10 sm:w-10
              ${
                active
                  ? 'group-hover:border-white/[0.14] group-hover:bg-white/[0.045] group-hover:text-textPrimary'
                  : ''
              }
            `}
          >
            <Icon
              size={17}
              strokeWidth={1.55}
              className={`
                transition-transform duration-400 ease-out
                sm:h-[18px] sm:w-[18px]
                ${
                  active
                    ? 'group-hover:-translate-y-0.5 group-hover:rotate-[-3deg]'
                    : ''
                }
              `}
            />
          </div>

          <span
            className={`
              mt-1 flex h-6 w-6 shrink-0 items-center justify-center
              rounded-full border border-white/[0.06]
              text-textMuted transition-all duration-300
              ${
                active
                  ? 'group-hover:border-white/[0.13] group-hover:bg-white/[0.035] group-hover:text-textPrimary'
                  : ''
              }
            `}
          >
            <ExternalLink
              size={11}
              strokeWidth={1.8}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </span>
        </div>

        <div className="mt-3 min-w-0">
          <h3 className="truncate font-display text-[13px] font-medium leading-tight text-textPrimary sm:text-sm">
            {tool.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-[10px] leading-[1.45] text-textSecondary sm:text-[11px]">
            {tool.description}
          </p>
        </div>

        <div className="mt-auto pt-3">
          <div
            className={`
              flex h-7 items-center justify-between
              rounded-lg border border-white/[0.06]
              bg-white/[0.018] px-2.5
              text-[10px] text-textMuted
              transition-all duration-300
              ${
                active
                  ? 'group-hover:border-white/[0.11] group-hover:bg-white/[0.035] group-hover:text-textPrimary'
                  : ''
              }
            `}
          >
            <span>Gunakan tools</span>

            <span
              className={`
                h-1 w-1 rounded-full bg-white/25
                transition-all duration-300
                ${
                  active
                    ? 'group-hover:w-2 group-hover:bg-white/60'
                    : ''
                }
              `}
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/20 backdrop-blur-[3px]">
          <div className="h-5 w-5 animate-spin rounded-full border border-white/[0.1] border-t-white/60" />
        </div>
      )}

      {disabled && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-5 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.08] bg-white/[0.025] text-textSecondary">
            <LockKeyhole size={18} strokeWidth={1.6} />
          </div>

          <p className="mt-2.5 font-display text-xs font-medium text-textPrimary sm:text-sm">
            Tools Dinonaktifkan Oleh Admin
          </p>

          {disabledNote && (
            <p className="mt-1 max-w-[260px] text-[10px] leading-4 text-textMuted sm:text-xs">
              {disabledNote}
            </p>
          )}
        </div>
      )}
    </motion.button>
  )
}