export type ToolItem = {
  id: string
  name: string
  description: string
}

export type ToolCategory = {
  slug: string
  name: string
  description: string
  toolCount: number
  tools: string[]
  items: ToolItem[]
}

export const categories: ToolCategory[] = [
  {
    slug: 'downloaders',
    name: 'Media downloader',
    description: 'Ambil video dan audio dari platform media sosial tanpa watermark',
    toolCount: 4,
    tools: ['TikTok', 'YouTube', 'Instagram', 'X and Threads'],
    items: [
      {
        id: 'tiktok-downloader',
        name: 'TikTok downloader',
        description: 'Unduh video TikTok dengan cepat dari sebuah URL.'
      },
      {
        id: 'youtube-downloader',
        name: 'YouTube downloader',
        description: 'Unduh konten YouTube melalui tautan video.'
      },
      {
        id: 'instagram-downloader',
        name: 'Instagram downloader',
        description: 'Ambil media Instagram menggunakan URL konten.'
      },
      {
        id: 'x-threads-downloader',
        name: 'X and Threads downloader',
        description: 'Unduh media dari X dan Threads menggunakan tautan konten.'
      }
    ]
  },
  {
    slug: 'design-tools',
    name: 'Design tools',
    description: 'Konversi gambar, buat QR code, dan olah aset visual ringan',
    toolCount: 3,
    tools: ['SVG vectorizer', 'Base64 converter', 'QR and barcode generator'],
    items: [
      {
        id: 'svg-vectorizer',
        name: 'SVG vectorizer',
        description: 'Konversi gambar raster menjadi SVG vector yang dapat diedit.'
      },
      {
        id: 'base64-converter',
        name: 'Base64 converter',
        description: 'Ubah gambar menjadi Data URI Base64 secara langsung.'
      },
      {
        id: 'qr-barcode-generator',
        name: 'QR and barcode generator',
        description: 'Buat QR code dan barcode dari teks atau data sederhana.'
      }
    ]
  },
  {
    slug: 'security',
    name: 'Security tools',
    description: 'Enkripsi teks, buat password kuat, dan hitung hash satu arah',
    toolCount: 4,
    tools: ['Base64 encode/decode', 'AES encryptor', 'Password generator', 'Hash generator'],
    items: [
      {
        id: 'base64-encode-decode',
        name: 'Base64 encode/decode',
        description: 'Encode atau decode teks menggunakan format Base64.'
      },
      {
        id: 'aes-encryptor',
        name: 'AES encryptor',
        description: 'Enkripsi dan dekripsi teks menggunakan AES.'
      },
      {
        id: 'password-generator',
        name: 'Password generator',
        description: 'Buat password acak dengan panjang dan karakter yang dapat diatur.'
      },
      {
        id: 'hash-generator',
        name: 'Hash generator',
        description: 'Ubah teks menjadi hash satu arah menggunakan beberapa algoritma.'
      }
    ]
  },
  {
    slug: 'utilities',
    name: 'Utilities and web dev',
    description: 'Rapikan JSON, baca JWT, dan uji pola regex',
    toolCount: 5,
    tools: ['JSON formatter', 'JWT decoder', 'Markdown notes', 'URL parser', 'Regex tester'],
    items: [
      {
        id: 'json-formatter',
        name: 'JSON formatter',
        description: 'Rapikan dan validasi struktur JSON dengan cepat.'
      },
      {
        id: 'jwt-decoder',
        name: 'JWT decoder',
        description: 'Baca payload JWT tanpa melakukan verifikasi signature.'
      },
      {
        id: 'markdown-notes',
        name: 'Markdown notes',
        description: 'Tempat sederhana untuk menulis dan mengolah catatan Markdown.'
      },
      {
        id: 'url-parser',
        name: 'URL parser',
        description: 'Inspect bagian-bagian sebuah URL secara lebih detail.'
      },
      {
        id: 'regex-tester',
        name: 'Regex tester',
        description: 'Uji regular expression terhadap teks secara langsung.'
      }
    ]
  },
  {
    slug: 'networking',
    name: 'Networking and IT support',
    description: 'Info jaringan, kalkulator subnet, dan konversi timestamp',
    toolCount: 3,
    tools: ['IP and network info', 'CIDR/subnet calculator', 'Epoch timestamp converter'],
    items: [
      {
        id: 'ip-network-info',
        name: 'IP and network info',
        description: 'Lihat informasi IP dan data jaringan yang tersedia.'
      },
      {
        id: 'subnet-calculator',
        name: 'CIDR/subnet calculator',
        description: 'Hitung network, host, broadcast, dan informasi subnet.'
      },
      {
        id: 'timestamp-converter',
        name: 'Epoch timestamp converter',
        description: 'Konversi Unix epoch timestamp ke format waktu yang mudah dibaca.'
      }
    ]
  }
]