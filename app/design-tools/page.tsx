import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

export default function DesignToolsPage() {
  const category = categories.find((item) => item.slug === 'design-tools')!
  return <ToolPlaceholderGrid category={category} />
}
