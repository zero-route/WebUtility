import type { Metadata } from 'next'

import CategoryCard from '@/components/dashboard/CategoryCard'
import TimeCard from '@/components/dashboard/TimeCard'
import IpCard from '@/components/dashboard/IpCard'
import WorldClockCard from '@/components/dashboard/WorldClockCard'
import WeatherCard from '@/components/dashboard/WeatherCard'
import { categories } from '@/lib/toolsData'

export const metadata: Metadata = {
  title: 'Ringkasan tools'
}

export default function HomePage() {
  return (
    <div className="dashboard-page">
      <h1 className="text-center font-display text-xl font-medium tracking-tight text-textPrimary sm:text-2xl">
        Ringkasan tools
      </h1>

      <section className="mt-7 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TimeCard />
        <IpCard />
      </section>

      <section className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <WorldClockCard />
        <WeatherCard />
      </section>

      <section className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-2">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.slug}
            category={category}
            index={index}
          />
        ))}
      </section>
    </div>
  )
}