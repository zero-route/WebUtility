import type { Metadata } from 'next'
import { Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import Sidebar from '@/components/layout/Sidebar'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '700']
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500']
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500']
})

export const metadata: Metadata = {
  title: 'KitBox',
  description: 'Dashboard developer dan IT pribadi'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className={`${spaceGrotesk.variable} ${inter.variable} ${plexMono.variable} bg-page`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 px-6 py-8 md:px-10 md:py-10">{children}</main>
        </div>
      </body>
    </html>
  )
}
