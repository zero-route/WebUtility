'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { ToolCategory, ToolItem } from '@/lib/toolsData'
import ToolPlaceholderCard from './ToolPlaceholderCard'
import ToolModal from './ToolModal'

export default function ToolPlaceholderGrid({
  category
}: {
  category: ToolCategory
}) {
  const [selectedTool, setSelectedTool] = useState<ToolItem | null>(null)

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
            {category.name}
          </h1>

          <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-textMuted">
            {category.description}
          </p>
        </motion.div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {category.items.map((tool, index) => (
            <ToolPlaceholderCard
              key={tool.id}
              tool={tool}
              index={index}
              onOpen={setSelectedTool}
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