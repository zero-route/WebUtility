'use client'

import dynamic from 'next/dynamic'
import { AnimatePresence, motion } from 'framer-motion'
import { X, Wrench } from 'lucide-react'
import type { ToolItem } from '@/lib/toolsData'

const VectorizerUI = dynamic(
  () => import('@/components/design-tools/svg-vectorizer/VectorizerUI')
)

const Base64UI = dynamic(
  () => import('@/components/design-tools/base64-converter/Base64UI')
)

const QrUI = dynamic(
  () => import('@/components/design-tools/qr-barcode/QrUI')
)

const Base64EncodeDecodeUI = dynamic(
  () =>
    import(
      '@/components/security/base64-encode-decode/Base64EncodeDecodeUI'
    )
)

const EncryptorUI = dynamic(
  () => import('@/components/security/text-encryptor/EncryptorUI')
)

const PasswordGenUI = dynamic(
  () => import('@/components/security/password-gen/PasswordGenUI')
)

const HashGenUI = dynamic(
  () => import('@/components/security/hash-gen/HashGenUI')
)

const JsonTool = dynamic(
  () => import('@/components/utilities/json-validator/JsonTool')
)

const SubnetCalc = dynamic(
  () => import('@/components/utilities/subnet-calc/SubnetCalc')
)

const TimestampTool = dynamic(
  () => import('@/components/utilities/timestamp-conv/TimestampTool')
)

const UrlParser = dynamic(
  () => import('@/components/utilities/url-inspector/UrlParser')
)

const TikTokDownloader = dynamic(
  () => import('@/components/downloaders/tiktok/TikTokDownloader')
)

const YouTubeDownloader = dynamic(
  () => import('@/components/downloaders/youtube/YouTubeDownloader')
)

const InstagramDownloader = dynamic(
  () => import('@/components/downloaders/instagram/InstagramDownloader')
)

const XDownloader = dynamic(
  () => import('@/components/downloaders/x-threads/XDownloader')
)

function ToolContent({ toolId }: { toolId: string }) {
  switch (toolId) {
    case 'svg-vectorizer':
      return <VectorizerUI />

    case 'base64-converter':
      return <Base64UI />

    case 'qr-barcode-generator':
      return <QrUI />

    case 'base64-encode-decode':
      return <Base64EncodeDecodeUI />

    case 'aes-encryptor':
      return <EncryptorUI />

    case 'password-generator':
      return <PasswordGenUI />

    case 'hash-generator':
      return <HashGenUI />

    case 'json-formatter':
      return <JsonTool />

    case 'subnet-calculator':
      return <SubnetCalc />

    case 'timestamp-converter':
      return <TimestampTool />

    case 'url-parser':
      return <UrlParser />

    case 'tiktok-downloader':
      return <TikTokDownloader />

    case 'youtube-downloader':
      return <YouTubeDownloader />

    case 'instagram-downloader':
      return <InstagramDownloader />

    case 'x-threads-downloader':
      return <XDownloader />

    default:
      return (
        <div className="rounded-2xl border border-border bg-surface2 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-surface text-teal-light">
            <Wrench size={20} strokeWidth={1.8} />
          </div>

          <h3 className="mt-4 font-display text-base font-medium text-textPrimary">
            Tool belum tersedia
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-textMuted">
            Tool ini sudah terdaftar di WebUtility, tetapi implementasinya
            belum tersedia pada project saat ini.
          </p>
        </div>
      )
  }
}

export default function ToolModal({
  tool,
  onClose
}: {
  tool: ToolItem | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {tool && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-4 backdrop-blur-sm sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose()
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.985 }}
            transition={{
              duration: 0.24,
              ease: [0.22, 1, 0.36, 1]
            }}
            className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-border bg-page shadow-2xl"
          >
            <div className="flex shrink-0 items-center justify-between border-b border-border bg-surface/95 px-5 py-4 backdrop-blur-xl">
              <div className="min-w-0 pr-4">
                <h2 className="truncate font-display text-lg font-medium text-textPrimary">
                  {tool.name}
                </h2>

                <p className="mt-0.5 truncate text-xs text-textMuted">
                  {tool.description}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Tutup tool"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface2 text-textMuted transition-all duration-300 hover:border-teal/40 hover:bg-teal/10 hover:text-teal-light"
              >
                <X size={17} />
              </button>
            </div>

            <div className="min-h-0 overflow-y-auto p-4 sm:p-6">
              <ToolContent toolId={tool.id} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}