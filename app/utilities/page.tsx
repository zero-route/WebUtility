import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

export default function UtilitiesPage() {
  const category = categories.find((item) => item.slug === 'utilities')!
  return <ToolPlaceholderGrid category={category} />
}
