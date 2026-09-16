import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Networking and IT support'
}

export default function NetworkingPage() {
  const category = categories.find((item) => item.slug === 'networking')!
  return <ToolPlaceholderGrid category={category} />
}
