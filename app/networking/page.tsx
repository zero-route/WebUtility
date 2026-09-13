import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

export default function NetworkingPage() {
  const category = categories.find((item) => item.slug === 'networking')!
  return <ToolPlaceholderGrid category={category} />
}
