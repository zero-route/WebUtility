import Link from 'next/link'
import { ToolCategory } from '@/lib/toolsData'

export default function CategoryCard({ category }: { category: ToolCategory }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex flex-col justify-between rounded-xl border border-border bg-surface p-5 transition-colors hover:border-teal-dark"
    >
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-base font-medium text-textPrimary">{category.name}</h3>
          <span className="font-mono text-xs text-teal-light">{category.toolCount}</span>
        </div>
        <p className="mt-2 text-sm text-textSecondary">{category.description}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {category.tools.map((tool) => (
          <span
            key={tool}
            className="rounded-md border border-border bg-surface2 px-2 py-1 text-xs text-textSecondary"
          >
            {tool}
          </span>
        ))}
      </div>
    </Link>
  )
}
