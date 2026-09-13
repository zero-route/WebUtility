import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

export default function DownloadersPage() {
  const category = categories.find((item) => item.slug === 'downloaders')!
  return <ToolPlaceholderGrid category={category} />
}
