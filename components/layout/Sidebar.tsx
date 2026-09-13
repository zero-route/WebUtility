'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { categories } from '@/lib/toolsData'

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 border-r border-border bg-surface md:flex md:flex-col">
      <div className="px-6 py-6">
        <Link href="/" className="font-display text-lg font-bold tracking-tight text-textPrimary">
          KitBox
        </Link>
        <p className="mt-1 text-xs text-textMuted">Personal dev and IT toolkit</p>
      </div>
      <nav className="flex-1 px-3">
        <Link
          href="/"
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
                className={`flex items-center justify-between rounded-md px-3 py-2 text-sm ${
                  active ? 'bg-surface2 text-textPrimary' : 'text-textSecondary hover:text-textPrimary'
                }`}
              >
                <span>{category.name}</span>
                <span className="font-mono text-xs text-textMuted">{category.toolCount}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </aside>
  )
}
