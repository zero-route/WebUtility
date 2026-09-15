'use client'

import { useState } from 'react'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import ThemeToggle from '@/components/theme/ThemeToggle'

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="min-h-screen bg-page">
      <div className="fixed left-4 top-4 z-50 flex items-center gap-2">
        <button
          onClick={() => setOpen(true)}
          aria-label="Buka menu"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface/80 text-textSecondary backdrop-blur-md transition-colors hover:text-textPrimary"
        >
          <Menu size={16} />
        </button>
        <ThemeToggle />
      </div>
      <Sidebar open={open} onClose={() => setOpen(false)} />
      <main className="px-6 pb-16 pt-24 md:px-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  )
}
