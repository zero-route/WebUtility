'use client'

import { motion } from 'framer-motion'
import type { ToolCategory } from '@/lib/toolsData'
import ToolPlaceholderCard from './ToolPlaceholderCard'

export default function ToolPlaceholderGrid({
  category
}: {
  category: ToolCategory
}) {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1]
        }}
        className="mx-auto max-w-2xl text-center"
      >
        <h1 className="font-display text-2xl font-medium tracking-tight text-textPrimary sm:text-3xl">
          {category.name}
        </h1>

        <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-textMuted">
          {category.description}
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: {
            transition: {
              staggerChildren: 0.035
            }
          }
        }}
        className="
          mt-7 grid grid-cols-1 gap-[10px]
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
      >
        {category.items.map((tool, index) => (
          <motion.div
            key={tool.id}
            variants={{
              hidden: {
                opacity: 0,
                y: 6
              },
              show: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1]
                }
              }
            }}
            className="min-w-0"
          >
            <ToolPlaceholderCard
              tool={tool}
              index={index}
              onOpen={() => {}}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}