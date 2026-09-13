import { ToolCategory } from '@/lib/toolsData'

export default function ToolPlaceholderGrid({ category }: { category: ToolCategory }) {
  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-medium text-textPrimary">{category.name}</h1>
        <p className="text-sm text-textSecondary">{category.description}</p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {category.tools.map((tool) => (
          <div
            key={tool}
            className="flex flex-col justify-between rounded-xl border border-border bg-surface p-5"
          >
            <h3 className="font-display text-base font-medium text-textPrimary">{tool}</h3>
            <p className="mt-2 text-sm text-textMuted">Belum diimplementasikan</p>
          </div>
        ))}
      </div>
    </div>
  )
}
