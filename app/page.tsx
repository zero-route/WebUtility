import CategoryCard from '@/components/dashboard/CategoryCard'
import { categories } from '@/lib/toolsData'

export default function HomePage() {
  const totalTools = categories.reduce((sum, category) => sum + category.toolCount, 0)

  return (
    <div>
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl font-medium text-textPrimary">Ringkasan tools</h1>
        <p className="text-sm text-textSecondary">
          {totalTools} tools aktif di {categories.length} kategori
        </p>
      </div>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </div>
    </div>
  )
}
