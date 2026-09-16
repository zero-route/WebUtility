import { categories } from '@/lib/toolsData'
import ToolPlaceholderGrid from '@/components/dashboard/ToolPlaceholderGrid'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Media downloader'
}

export default function DownloadersPage() {
  const category = categories.find((item) => item.slug === 'downloaders')!
  return <ToolPlaceholderGrid category={category} />
}
