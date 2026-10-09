'use client'

import { motion } from 'framer-motion'
import {
  Activity,
  ArrowUpRight,
  Braces,
  Binary,
  CalendarDays,
  Type,
  BadgeCheck,
  Clock,
  FileCheck,
  FileCode,
  FileText,
  GitCompare,
  Fingerprint,
  Globe,
  Hash,
  Instagram,
  KeyRound,
  Link2,
  ListTree,
  LockKeyhole,
  Network,
  Palette,
  QrCode,
  Router,
  Regex,
  Scan,
  ShieldCheck,
  Terminal,
  Youtube,
  Music2,
  FileImage,
  CircleDot,
  Github,
  type LucideProps
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'
import { useDisabledToolsNote } from '@/lib/hooks/useDisabledToolsNote'
import type { ToolItem } from '@/lib/toolsData'

type ToolIcon = ComponentType<LucideProps>

function XLogo({
  size = 24,
  className,
  ...props
}: LucideProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M18.901 1.153h3.308l-7.227 8.26 8.502 13.434h-6.657l-5.214-8.586-7.99 8.586H.313l7.73-8.835L-.01 1.153h6.826l4.713 7.843zM17.743 20.48h1.833L5.522 3.397H3.555z" />
    </svg>
  )
}

const icons: Record<string, ToolIcon> = {
  'tiktok-downloader': Music2,
  'youtube-downloader': Youtube,
  'instagram-downloader': Instagram,
  'x-threads-downloader': XLogo,
  'svg-vectorizer': FileCode,
  'base64-converter': Binary,
  'qr-barcode-generator': QrCode,
  'color-palette-generator': Palette,
  'image-compressor': FileImage,
  'base64-encode-decode': Braces,
  'aes-encryptor': LockKeyhole,
  'password-generator': KeyRound,
  'hash-generator': Hash,
  'uuid-generator': Fingerprint,
  'password-strength-checker': ShieldCheck,
  'file-hash-checker': FileCheck,
  'json-formatter': ListTree,
  'jwt-decoder': BadgeCheck,
  'markdown-notes': FileText,
  'url-parser': Link2,
  'regex-tester': Regex,
  'case-converter': Type,
  'text-diff-checker': GitCompare,
  'cron-parser': CalendarDays,
  'github-repository-downloader': Github,
  'ip-network-info': Network,
  'subnet-calculator': Router,
  'timestamp-converter': Clock,
  'dns-lookup': Globe,
  'ping-tester': Activity,
  'mac-vendor-lookup': Scan,
  'whois-lookup': CircleDot
}

const defaultSteps = [
  'Buka tool yang ingin digunakan.',
  'Masukkan data atau pilih file yang diperlukan.',
  'Atur opsi sesuai kebutuhan.',
  'Jalankan proses dan periksa hasilnya.',
  'Salin atau unduh hasil yang tersedia.'
]

export default function ToolPlaceholderCard({
  tool,
  index,
  onOpen
}: {
  tool: ToolItem
  index: number
  onOpen: () => void
}) {
  const { status, reason, debugDetail } = useToolEnabled(tool.id)
  const disabledNote = useDisabledToolsNote()
  const Icon = icons[tool.id] ?? Terminal

  const loading = status === 'loading'
  const adminDisabled = status === 'admin_disabled'
  const unavailable = status === 'unavailable'
  const hasError = status === 'error'
  const active = status === 'active'
  const locked = adminDisabled || unavailable || hasError

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.025, 0.15),
        duration: 0.28
      }}
      className={`group relative flex h-full min-h-[354px] flex-col overflow-hidden rounded-2xl border bg-surface p-4 text-left transition-colors duration-200 ${
        active
          ? 'border-border hover:border-borderStrong'
          : 'border-border'
      }`}
    >
      <div
        className={`pointer-events-none absolute -bottom-5 -right-4 opacity-[0.035] ${
          locked ? 'blur-sm' : ''
        }`}
      >
        <Icon size={100} strokeWidth={1.1} />
      </div>

      <div
        className={`relative flex min-h-0 flex-1 flex-col ${
          locked ? 'blur-[2px] opacity-40' : ''
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface2 text-textSecondary">
            <Icon size={19} strokeWidth={1.6} />
          </div>

          <span className="flex h-7 w-7 items-center justify-center rounded-lg text-textMuted transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
            <ArrowUpRight size={15} strokeWidth={1.5} />
          </span>
        </div>

        <h3 className="mt-3 text-sm font-semibold leading-5 text-textPrimary">
          {tool.name}
        </h3>

        <p className="mt-1.5 min-h-[54px] text-xs leading-[1.5] text-textSecondary">
          {tool.description}
        </p>

        <div className="my-3 border-t border-border/70" />

        <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-textMuted">
          Langkah penggunaan
        </p>

        <ol className="space-y-1.5">
          {Array.from({ length: 5 }, (_, stepIndex) => {
            const step =
              tool.steps?.[stepIndex] ?? defaultSteps[stepIndex]

            return (
              <li
                key={`${tool.id}-${stepIndex}`}
                className="flex min-w-0 items-start gap-2 text-[11px] leading-[1.45] text-textSecondary"
              >
                <span className="mt-px flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-border text-[9px] text-textMuted">
                  {stepIndex + 1}
                </span>

                <span className="min-w-0">{step}</span>
              </li>
            )
          })}
        </ol>

        <button
  type="button"
  onClick={onOpen}
  disabled={loading || locked}
          className="mt-auto flex min-h-10 w-full items-center justify-between gap-2 rounded-xl border border-border bg-surface2/70 px-3 py-2 text-left text-xs text-textMuted transition-colors hover:border-borderStrong hover:text-textPrimary disabled:cursor-not-allowed"
        >
          <span>Gunakan tools</span>
          <ArrowUpRight size={15} strokeWidth={1.5} />
        </button>
      </div>

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-surface/40">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-textPrimary" />
        </div>
      )}

      {adminDisabled && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <LockKeyhole size={20} className="text-textSecondary" />
          <p className="mt-2 text-xs font-medium text-textPrimary">
            Tools Dinonaktifkan Oleh Admin
          </p>
          {(reason || disabledNote) && (
            <p className="mt-1 max-w-[260px] text-[10px] leading-4 text-textMuted">
              {reason ?? disabledNote}
            </p>
          )}
        </div>
      )}

      {unavailable && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <LockKeyhole size={20} className="text-textSecondary" />
          <p className="mt-2 text-xs font-medium text-textPrimary">
            Tools Belum Tersedia
          </p>
          <p className="mt-1 max-w-[260px] text-[10px] leading-4 text-textMuted">
            Tools ini belum terdaftar di sistem.
          </p>
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-4 text-center">
          <ShieldCheck size={20} className="text-red-400" />
          <p className="mt-2 text-xs font-medium text-textPrimary">
            Status: Error Supabase
          </p>
          {debugDetail && (
            <p className="mt-1 max-w-[260px] break-words font-mono text-[9px] leading-4 text-red-300/80">
              {debugDetail}
            </p>
          )}
        </div>
      )}
    </motion.article>
  )
}