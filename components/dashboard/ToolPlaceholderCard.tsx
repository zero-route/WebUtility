'use client'

import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  Braces,
  Cloud,
  Code2,
  Database,
  Download,
  Fingerprint,
  Image,
  LockKeyhole,
  Network,
  QrCode,
  ShieldCheck,
  Terminal,
  Wifi
} from 'lucide-react'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'
import { useDisabledToolsNote } from '@/lib/hooks/useDisabledToolsNote'
import type { ToolItem } from '@/lib/toolsData'

const icons = {
  'tiktok-downloader': Download,
  'youtube-downloader': Download,
  'instagram-downloader': Image,
  'x-threads-downloader': Download,
  'svg-vectorizer': Code2,
  'base64-converter': Braces,
  'qr-barcode-generator': QrCode,
  'base64-encode-decode': Braces,
  'aes-encryptor': LockKeyhole,
  'password-generator': ShieldCheck,
  'hash-generator': Fingerprint,
  'json-formatter': Braces,
  'jwt-decoder': ShieldCheck,
  'markdown-notes': Code2,
  'url-parser': Network,
  'regex-tester': Terminal,
  'ip-network-info': Network,
  'subnet-calculator': Network,
  'timestamp-converter': Database
}

export default function ToolPlaceholderCard({
  tool,
  index,
  onOpen
}: {
  tool: ToolItem
  index: number
  onOpen: (tool: ToolItem) => void
}) {
  const { enabled } = useToolEnabled(tool.id)
  const disabledNote = useDisabledToolsNote()
  const Icon = icons[tool.id as keyof typeof icons] ?? Cloud

  const isLoading = enabled === null
  const isDisabled = enabled === false

  return (
    <motion.button
      type="button"
      onClick={() => {
        if (!isDisabled && !isLoading) {
          onOpen(tool)
        }
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: Math.min(index * 0.045, 0.18),
        duration: 0.32,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={!isDisabled && !isLoading ? { y: -3 } : undefined}
      whileTap={!isDisabled && !isLoading ? { scale: 0.99 } : undefined}
      className={`group relative min-h-[156px] w-full overflow-hidden rounded-2xl border border-border bg-surface p-5 text-left transition-[border-color,background-color] duration-300 ${
        isDisabled
          ? 'cursor-not-allowed'
          : 'cursor-pointer hover:border-teal/50 hover:bg-surface2'
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-teal/10 to-transparent transition-transform duration-700 ease-out ${
          !isDisabled && !isLoading ? 'group-hover:translate-x-[300%]' : ''
        }`}
      />

      <div
        className={`pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 ${
          !isDisabled && !isLoading
            ? 'bg-[radial-gradient(circle_at_85%_15%,rgba(45,212,191,0.10),transparent_32%)] opacity-0 group-hover:opacity-100'
            : ''
        }`}
      />

      <div
        className={`relative flex h-full flex-col ${
          isDisabled ? 'blur-[3px] opacity-35' : ''
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface2 text-teal-light transition-all duration-500 ease-out ${
              !isDisabled && !isLoading
                ? 'group-hover:rotate-3 group-hover:rounded-2xl group-hover:border-teal/50 group-hover:bg-teal/10'
                : ''
            }`}
          >
            <Icon
              size={20}
              strokeWidth={1.8}
              className={`transition-transform duration-500 ${
                !isDisabled && !isLoading
                  ? 'group-hover:rotate-[-6deg] group-hover:scale-110'
                  : ''
              }`}
            />
          </div>

          <span
            className={`flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-surface2 text-textMuted transition-all duration-400 ${
              !isDisabled && !isLoading
                ? 'group-hover:border-teal/40 group-hover:bg-teal/10 group-hover:text-teal-light'
                : ''
            }`}
          >
            <ArrowUpRight
              size={17}
              className={`transition-transform duration-400 ${
                !isDisabled && !isLoading
                  ? 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                  : ''
              }`}
            />
          </span>
        </div>

        <div className="mt-auto pt-6">
          <h3 className="font-display text-base font-medium text-textPrimary">
            {tool.name}
          </h3>

          <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-textSecondary">
            {tool.description}
          </p>
        </div>
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-border border-t-teal" />
        </div>
      )}

      {isDisabled && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-borderStrong bg-surface2 text-textSecondary">
            <LockKeyhole size={19} strokeWidth={1.8} />
          </div>

          <p className="mt-3 font-display text-sm font-medium text-textPrimary">
            Tools Dinonaktifkan Oleh Admin
          </p>

          {disabledNote && (
            <p className="mt-1.5 max-w-[280px] text-xs leading-5 text-textMuted">
              {disabledNote}
            </p>
          )}
        </div>
      )}
    </motion.button>
  )
}