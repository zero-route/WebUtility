'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Download,
  Palette,
  ShieldCheck,
  Wrench,
  Network,
  LucideIcon
} from 'lucide-react'
import { ToolCategory } from '@/lib/toolsData'
import { fadeUpItem } from '@/lib/motion'

const icons: Record<string, LucideIcon> = {
  downloaders: Download,
  'design-tools': Palette,
  security: ShieldCheck,
  utilities: Wrench,
  networking: Network
}

export default function CategoryCard({
  category,
  index
}: {
  category: ToolCategory
  index: number
}) {
  const Icon = icons[category.slug] ?? Wrench

  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUpItem}
      className={category.slug === 'networking' ? 'lg:col-span-1' : ''}
    >
      <Link
        href={`/${category.slug}`}
        className="dashboard-card dashboard-card-hover group flex min-h-[235px] flex-col p-5"
      >
        <div>
          <div className="flex items-center gap-3">
            <span className="dashboard-icon">
              <Icon size={16} strokeWidth={1.6} />
            </span>

            <h3 className="font-display text-sm font-medium text-textPrimary">
              {category.name}
            </h3>
          </div>

          <p className="mt-3 max-w-xl text-xs leading-relaxed text-textSecondary">
            {category.description}
          </p>
        </div>

        <div className="mt-5 flex flex-col gap-1.5">
          {category.tools.map((tool, toolIndex) => (
            <div
              key={tool}
              className="flex items-center gap-2 text-[10px] text-textSecondary transition-colors group-hover:text-textPrimary"
            >
              <span className="w-5 font-mono text-[9px] text-textMuted">
                {String(toolIndex + 1).padStart(2, '0')}
              </span>

              <span>{tool}</span>
            </div>
          ))}
        </div>
      </Link>
    </motion.div>
  )
}