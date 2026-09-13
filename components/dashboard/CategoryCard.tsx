'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Download, Palette, ShieldCheck, Wrench, Network, LucideIcon } from 'lucide-react'
import { ToolCategory } from '@/lib/toolsData'
import { fadeUpItem } from '@/lib/motion'

const icons: Record<string, LucideIcon> = {
  downloaders: Download,
  'design-tools': Palette,
  security: ShieldCheck,
  utilities: Wrench,
  networking: Network
}

export default function CategoryCard({ category, index }: { category: ToolCategory; index: number }) {
  const Icon = icons[category.slug] ?? Wrench

  return (
    <motion.div custom={index} initial="hidden" animate="visible" variants={fadeUpItem}>
      <Link
        href={`/${category.slug}`}
        className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-teal-dark"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-teal/10 text-teal-light">
              <Icon size={16} />
            </span>
            <h3 className="font-display text-base font-medium text-textPrimary">{category.name}</h3>
          </div>
          <p className="mt-3 text-sm text-textSecondary">{category.description}</p>
        </div>
        <div className="mt-5 flex flex-col gap-1">
          {category.tools.map((tool, toolIndex) => (
            <div key={tool} className="flex items-center gap-2 text-xs text-textSecondary">
              <span className="font-mono text-teal-light">{String(toolIndex + 1).padStart(2, '0')}</span>
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}
