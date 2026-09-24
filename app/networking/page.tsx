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
          description:
            'Menampilkan informasi alamat IP dan detail jaringan yang dapat digunakan untuk membantu memahami konfigurasi koneksi dan identitas jaringan.',
          steps: [
            'Buka tool IP and network info.',
            'Tunggu proses pengambilan informasi jaringan selesai.',
            'Periksa alamat IP dan informasi jaringan yang tersedia.',
            'Gunakan detail tersebut untuk kebutuhan troubleshooting atau dokumentasi.',
            'Salin informasi yang diperlukan jika tersedia.'
          ],
          component: <IpNetworkInfo />
        },
        {
          id: 'subnet-calculator',
          name: 'CIDR/subnet calculator',
          description:
            'Menghitung informasi subnet berdasarkan alamat IP dan prefix CIDR, termasuk network address, broadcast, host, dan kapasitas alamat.',
          steps: [
            'Masukkan alamat IP yang ingin dihitung.',
            'Masukkan prefix CIDR atau subnet mask.',
            'Jalankan perhitungan subnet.',
            'Periksa network, broadcast, host range, dan informasi lainnya.',
            'Gunakan hasil perhitungan untuk konfigurasi jaringan.'
          ],
          component: <SubnetCalc />
        },
        {
          id: 'timestamp-converter',
          name: 'Epoch timestamp converter',
          description:
            'Mengonversi Unix epoch timestamp menjadi tanggal dan waktu yang lebih mudah dibaca serta membantu melakukan konversi kembali ke format timestamp.',
          steps: [
            'Masukkan nilai Unix epoch timestamp.',
            'Pilih satuan timestamp jika tersedia.',
            'Jalankan proses konversi.',
            'Periksa tanggal dan waktu hasil konversi.',
            'Salin hasil yang diperlukan.'
          ],
          component: <TimestampTool />
        },
        {
          id: 'dns-lookup',
          name: 'DNS Lookup',
          description:
            'Memeriksa record DNS sebuah domain untuk melihat informasi seperti A, AAAA, MX, TXT, NS, dan CNAME yang tersedia.',
          steps: [
            'Masukkan nama domain yang ingin diperiksa.',
            'Pilih jenis record DNS jika tersedia.',
            'Jalankan proses DNS lookup.',
            'Periksa record DNS yang ditemukan.',
            'Gunakan hasilnya untuk analisis atau troubleshooting domain.'
          ],
          component: <DnsLookup />
        },
        {
          id: 'ping-tester',
          name: 'Ping/Latency tester',
          description:
            'Menguji waktu respons jaringan terhadap endpoint yang tersedia untuk membantu melihat latency dan kestabilan koneksi dari sisi browser.',
          steps: [
            'Pilih atau masukkan endpoint yang ingin diuji.',
            'Mulai pengujian latency.',
            'Tunggu beberapa request selesai.',
            'Periksa waktu respons yang dihasilkan.',
            'Bandingkan hasil jika ingin menguji beberapa endpoint.'
          ],
          component: <PingTester />
        },
        {
          id: 'mac-vendor-lookup',
          name: 'MAC Address vendor lookup',
          description:
            'Mengidentifikasi vendor atau organisasi yang terkait dengan MAC address berdasarkan prefix OUI yang terdaftar.',
          steps: [
            'Masukkan MAC address perangkat.',
            'Pastikan format MAC address sudah benar.',
            'Jalankan proses lookup.',
            'Periksa vendor yang terkait dengan prefix MAC tersebut.',
            'Gunakan informasi tersebut sebagai referensi identifikasi perangkat.'
          ],
          component: <MacVendorLookup />
        },
        {
          id: 'whois-lookup',
          name: 'WHOIS/domain info lookup',
          description:
            'Mencari informasi registrasi domain seperti registrar, tanggal pendaftaran, tanggal kedaluwarsa, dan data domain yang tersedia melalui layanan WHOIS.',
          steps: [
            'Masukkan nama domain yang ingin diperiksa.',
            'Jalankan proses WHOIS lookup.',
            'Tunggu informasi domain berhasil diperoleh.',
            'Periksa registrar dan tanggal penting domain.',
            'Gunakan informasi tersebut untuk kebutuhan pengecekan domain.'
          ],
          component: <WhoisLookup />
        }
      ]}
    />
  )
}