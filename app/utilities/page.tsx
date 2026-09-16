import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Utilities and web dev'
}

export default function UtilitiesPage() {
  const category = categories.find((item) => item.slug === 'utilities')!
  return <ToolPlaceholderGrid category={category} />
}
