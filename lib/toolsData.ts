export type ToolCategory = {
  slug: string
  name: string
  description: string
  toolCount: number
  tools: string[]
}

export const categories: ToolCategory[] = [
  {
    slug: 'downloaders',
    name: 'Media downloader',
    description: 'Ambil video dan audio dari platform media sosial tanpa watermark',
    toolCount: 4,
    tools: ['TikTok', 'YouTube', 'Instagram', 'X and Threads']
  },
  {
    slug: 'design-tools',
    name: 'Design tools',
    description: 'Konversi gambar, buat QR code, dan olah aset visual ringan',
    toolCount: 3,
    tools: ['SVG vectorizer', 'Base64 converter', 'QR and barcode generator']
  },
  {
    slug: 'security',
    name: 'Security tools',
    description: 'Enkripsi teks, buat password kuat, dan hitung hash satu arah',
    toolCount: 4,
    tools: ['Base64 encode/decode', 'AES encryptor', 'Password generator', 'Hash generator']
  },
  {
    slug: 'utilities',
    name: 'Utilities and web dev',
    description: 'Rapikan JSON, baca JWT, dan uji pola regex',
    toolCount: 5,
    tools: ['JSON formatter', 'JWT decoder', 'Markdown notes', 'URL parser', 'Regex tester']
  },
  {
    slug: 'networking',
    name: 'Networking and IT support',
    description: 'Info jaringan, kalkulator subnet, dan konversi timestamp',
    toolCount: 3,
    tools: ['IP and network info', 'CIDR/subnet calculator', 'Epoch timestamp converter']
  }
]
