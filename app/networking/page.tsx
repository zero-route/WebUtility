import type { Metadata } from 'next'
import IpNetworkInfo from '@/components/networking/ip-network-info/IpNetworkInfo'
import ComingSoonBody from '@/components/dashboard/ComingSoonBody'
import ToolPage from '@/components/dashboard/ToolPage'

export const metadata: Metadata = {
  title: 'Networking and IT support'
}

export default function NetworkingPage() {
  return (
    <ToolPage
      title="Networking and IT support"
      description="Info jaringan, kalkulator subnet, dan konversi timestamp"
      tools={[
        {
          id: 'ip-network-info',
          name: 'IP and network info',
          description: 'Lihat informasi IP dan data jaringan yang tersedia.',
          component: <IpNetworkInfo />
        },
        {
          id: 'subnet-calculator',
          name: 'CIDR/subnet calculator',
          description: 'Hitung network, host, broadcast, dan informasi subnet.',
          component: <ComingSoonBody />
        },
        {
          id: 'timestamp-converter',
          name: 'Epoch timestamp converter',
          description: 'Konversi Unix epoch timestamp ke format waktu yang mudah dibaca.',
          component: <ComingSoonBody />
        }
      ]}
    />
  )
}
