import { ToolCategory } from '@/lib/toolsData'
import ToolPlaceholderCard from './ToolPlaceholderCard'

export default function ToolPlaceholderGrid({ category }: { category: ToolCategory }) {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">{category.name}</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {category.tools.map((tool, index) => (
          <ToolPlaceholderCard key={tool} name={tool} index={index} />
        ))}
      </div>
    </div>
  )
}
