
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
  Code2,
  Database,
  Download,
  FileCheck,
  FileCode,
  FileText,
  GitCompare,
  Fingerprint,
  Globe,
  Hash,
  Image,
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
  Smartphone,
  Terminal,
  Youtube,
  Music2,
  FileImage,
  WandSparkles,
  CircleDot,
  type LucideIcon
} from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'
import { useDisabledToolsNote } from '@/lib/hooks/useDisabledToolsNote'
import type { ToolItem } from '@/lib/toolsData'

const icons: Record<string, LucideIcon> = {
  'tiktok-downloader': Music2,
  'youtube-downloader': Youtube,
  'instagram-downloader': Instagram,
  'x-threads-downloader': Download,
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
      className={`group relative flex h-full min-h-[246px] flex-col overflow-hidden rounded-xl border bg-surface p-3 text-left transition-colors duration-200 ${
        active
          ? 'border-border hover:border-borderStrong'
          : 'border-border'
      }`}
    >
      <div
        className={`pointer-events-none absolute -bottom-7 -right-5 opacity-[0.035] ${
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
          <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface2 text-textSecondary">
            <Icon size={14} strokeWidth={1.7} />
          </div>

          <span className="flex h-6 w-6 items-center justify-center rounded-md text-textMuted">
            <ArrowUpRight size={12} strokeWidth={1.7} />
          </span>
        </div>

        <h3 className="mt-2.5 line-clamp-1 text-[11px] font-semibold leading-4 text-textPrimary sm:text-xs">
          {tool.name}
        </h3>

        <p className="mt-1 line-clamp-3 min-h-[38px] text-[9px] leading-[1.35] text-textSecondary sm:text-[10px]">
          {tool.description}
        </p>

        <div className="my-2 border-t border-border/70" />

        <p className="mb-1.5 text-[7px] font-semibold uppercase tracking-[0.18em] text-textMuted sm:text-[8px]">
          Langkah penggunaan
        </p>

        <ol className="space-y-1">
          {Array.from({ length: 5 }, (_, stepIndex) => {
            const step =
              tool.steps?.[stepIndex] ??
              [
                'Buka tool yang ingin digunakan.',
                'Masukkan data atau pilih file yang diperlukan.',
                'Atur opsi sesuai kebutuhan.',
                'Jalankan proses dan periksa hasilnya.',
                'Salin atau unduh hasil yang tersedia.'
              ][stepIndex]

            return (
              <li
                key={`${tool.id}-${stepIndex}`}
                className="flex min-w-0 items-start gap-1.5 text-[8px] leading-[1.3] text-textSecondary sm:text-[9px]"
              >
                <span className="mt-px flex h-[12px] w-[12px] shrink-0 items-center justify-center rounded-full border border-border text-[7px] text-textMuted">
                  {stepIndex + 1}
                </span>

                <span className="line-clamp-2">{step}</span>
              </li>
            )
          })}
        </ol>

        <button
          type="button"
          onClick={onOpen}
          disabled={!active}
          className="mt-auto flex min-h-7 w-full items-center justify-between gap-2 rounded-lg border border-border bg-surface2/70 px-2.5 py-1.5 pt-2 text-left text-[9px] text-textMuted transition-colors hover:border-borderStrong hover:text-textPrimary disabled:cursor-not-allowed"
        >
          <span>Gunakan tools</span>
          <ArrowUpRight size={11} />
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
