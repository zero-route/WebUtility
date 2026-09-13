import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

export default function SecurityPage() {
  const category = categories.find((item) => item.slug === 'security')!
  return <ToolPlaceholderGrid category={category} />
}
