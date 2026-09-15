'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import ToolPlaceholderCard from './ToolPlaceholderCard'
import ToolModal from './ToolModal'
import type { ToolItem } from '@/lib/toolsData'

export type ToolPageItem = ToolItem & {
  component: ReactNode
}

export default function ToolPage({
  title,
  description,
  tools
}: {
  title: string
  description: string
  tools: ToolPageItem[]
}) {
  const [selectedTool, setSelectedTool] = useState<ToolPageItem | null>(null)

  return (
    <>
      <div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center"
        >
          <h1 className="font-display text-2xl font-medium text-textPrimary">
            {title}
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-textMuted">
            {description}
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {tools.map((tool, index) => (
            <ToolPlaceholderCard
              key={tool.id}
              tool={tool}
              index={index}
              onOpen={() => setSelectedTool(tool)}
            />
          ))}
        </div>
      </div>

      <ToolModal
        tool={selectedTool}
        onClose={() => setSelectedTool(null)}
      />
    </>
  )
}