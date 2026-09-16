import type { Metadata } from 'next'

import CategoryCard from '@/components/dashboard/CategoryCard'
import TimeCard from '@/components/dashboard/TimeCard'
import IpCard from '@/components/dashboard/IpCard'
import WorldClockCard from '@/components/dashboard/WorldClockCard'
import WeatherCard from '@/components/dashboard/WeatherCard'
import { categories } from '@/lib/toolsData'

export const metadata: Metadata = {
  title: 'Ringkasan tool'
}

export default function HomePage() {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">Ringkasan tools</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TimeCard />
        <IpCard />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <WorldClockCard />
        <WeatherCard />
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category, index) => (
          <CategoryCard key={category.slug} category={category} index={index} />
        ))}
      </div>
    </div>
  )
}
