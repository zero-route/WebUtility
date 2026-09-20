import type { Metadata } from 'next'
import IpNetworkInfo from '@/components/networking/ip-network-info/IpNetworkInfo'
import SubnetCalc from '@/components/networking/subnet-calc/SubnetCalc'
import TimestampTool from '@/components/networking/timestamp-conv/TimestampTool'
import DnsLookup from '@/components/networking/dns-lookup/DnsLookup'
import PingTester from '@/components/networking/ping-tester/PingTester'
import MacVendorLookup from '@/components/networking/mac-vendor-lookup/MacVendorLookup'
import WhoisLookup from '@/components/networking/whois-lookup/WhoisLookup'
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
          component: <SubnetCalc />
        },
        {
          id: 'timestamp-converter',
          name: 'Epoch timestamp converter',
          description: 'Konversi Unix epoch timestamp ke format waktu yang mudah dibaca.',
          component: <TimestampTool />
        },
        {
          id: 'dns-lookup',
          name: 'DNS Lookup',
          description: 'Lihat record DNS sebuah domain: A, AAAA, MX, TXT, NS, CNAME.',
          component: <DnsLookup />
        },
        {
          id: 'ping-tester',
          name: 'Ping/Latency tester',
          description: 'Cek kecepatan respons ke beberapa endpoint publik.',
          component: <PingTester />
        },
        {
          id: 'mac-vendor-lookup',
          name: 'MAC Address vendor lookup',
          description: 'Cari tahu vendor perangkat dari MAC address.',
          component: <MacVendorLookup />
        },
        {
          id: 'whois-lookup',
          name: 'WHOIS/domain info lookup',
          description: 'Cek registrar, tanggal daftar, dan kedaluwarsa sebuah domain.',
          component: <WhoisLookup />
        }
      ]}
    />
  )
}
