'use client'

import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LockKeyhole, X } from 'lucide-react'
import type { ReactNode } from 'react'
import type { ToolPageItem } from './ToolPage'
import { useToolEnabled } from '@/lib/hooks/useToolEnabled'
import { useDisabledToolsNote } from '@/lib/hooks/useDisabledToolsNote'

export default function ToolModal({
  tool,
  onClose
}: {
  tool: ToolPageItem | null
  onClose: () => void
}) {
  return (
    <AnimatePresence>
      {tool && (
        <ToolModalContent
          key={tool.id}
          tool={tool}
          onClose={onClose}
        />
      )}
    </AnimatePresence>
  )
}

function ToolModalContent({
  tool,
  onClose
}: {
  tool: ToolPageItem
  onClose: () => void
}) {
  const { enabled, status, reason } = useToolEnabled(tool.id)
  const disabledNote = useDisabledToolsNote()

  const loading = enabled === false && status === 'unavailable'
  const adminDisabled = status === 'admin_disabled'
  const unavailable = status === 'unavailable'
  const active = status === 'active'
  
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
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
          {loading && (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-border border-t-teal" />

              <p className="mt-4 text-sm font-medium text-textPrimary">
                Tools Dikunci Sementara
              </p>

              <p className="mt-2 text-xs text-textMuted">
                Status : features_flags No info
              </p>
            </div>
          )}

          {unavailable && !loading && (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface2 text-textSecondary">
                <LockKeyhole
                  size={23}
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-4 font-display text-base font-medium text-textPrimary">
                Tools Dikunci Sementara
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-textMuted">
                Status : features_flags No info
              </p>
            </div>
          )}

          {adminDisabled && (
            <div className="flex min-h-[180px] flex-col items-center justify-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-surface2 text-textSecondary">
                <LockKeyhole
                  size={23}
                  strokeWidth={1.8}
                />
              </div>

              <h3 className="mt-4 font-display text-base font-medium text-textPrimary">
                Tools Dinonaktifkan Oleh Admin
              </h3>

              {(reason || disabledNote) && (
                <p className="mt-2 max-w-md text-sm leading-6 text-textMuted">
                  {reason ?? disabledNote}
                </p>
              )}
            </div>
          )}

          {active && (tool.component as ReactNode)}
        </div>
      </motion.div>
    </motion.div>
  )
}