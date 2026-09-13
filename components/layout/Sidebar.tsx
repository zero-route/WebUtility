'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { categories } from '@/lib/toolsData'

export default function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.aside
            key="panel"
            className="fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-border bg-surface/70 backdrop-blur-xl"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          >
            <div className="px-6 py-6">
              <Link href="/" onClick={onClose} className="font-display text-lg font-bold tracking-tight text-textPrimary">
                KitBox
              </Link>
              <p className="mt-1 text-xs text-textMuted">Personal dev and IT toolkit</p>
            </div>
            <nav className="flex-1 px-3">
              <Link
                href="/"
                onClick={onClose}
                className={`block rounded-md px-3 py-2 text-sm ${
                  pathname === '/' ? 'bg-surface2 text-textPrimary' : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                Ringkasan
              </Link>
              <p className="mt-6 px-3 text-xs text-textMuted">Kategori tools</p>
              <div className="mt-2 flex flex-col gap-1">
                {categories.map((category) => {
                  const href = `/${category.slug}`
                  const active = pathname === href
                  return (
                    <Link
                      key={category.slug}
                      href={href}
                      onClick={onClose}
                      className={`rounded-md px-3 py-2 text-sm ${
                        active ? 'bg-surface2 text-textPrimary' : 'text-textSecondary hover:text-textPrimary'
                      }`}
                    >
                      {category.name}
                    </Link>
                  )
                })}
              </div>
            </nav>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
