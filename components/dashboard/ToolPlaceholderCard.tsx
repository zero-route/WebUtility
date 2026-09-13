'use client'

import { motion } from 'framer-motion'
import { fadeUpItem } from '@/lib/motion'

export default function ToolPlaceholderCard({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      variants={fadeUpItem}
      className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5"
    >
      <h3 className="font-display text-base font-medium text-textPrimary">{name}</h3>
      <p className="mt-2 text-sm text-textMuted">Belum diimplementasikan</p>
    </motion.div>
  )
}
