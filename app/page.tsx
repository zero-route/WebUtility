import CategoryCard from '@/components/dashboard/CategoryCard'
import { categories } from '@/lib/toolsData'

export default function HomePage() {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">Ringkasan tools</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>
    </div>
  )
}
