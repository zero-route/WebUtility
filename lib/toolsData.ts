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
    tools: [
      'TikTok',
      'YouTube',
      'Instagram',
      'X and Threads'
    ],
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
    toolCount: 5,
    tools: [
      'SVG vectorizer',
      'Base64 converter',
      'QR and barcode generator',
      'Color picker and palette generator',
      'Image compressor'
    ],
    items: [
      {
        id: 'svg-vectorizer',
        name: 'SVG vectorizer',
        description: 'Upload logo PNG/JPG berlatar transparan, lalu generate kode SVG-nya.'
      },
      {
        id: 'base64-converter',
        name: 'Base64 converter',
        description: 'Upload gambar, hasilnya langsung jadi kode data URI Base64.'
      },
      {
        id: 'qr-barcode-generator',
        name: 'QR and barcode generator',
        description: 'Masukkan link atau teks, opsional tambahkan logo di tengah QR.'
      },
      {
        id: 'color-palette-generator',
        name: 'Color picker and palette generator',
        description: 'Pilih satu warna, dapatkan variasi kombinasi otomatis.'
      },
      {
        id: 'image-compressor',
        name: 'Image compressor',
        description: 'Kecilkan ukuran file gambar langsung di browser.'
      }
    ]
  },

  {
    slug: 'security',
    name: 'Security tools',
    description: 'Enkripsi teks, buat password kuat, dan hitung hash satu arah',
    toolCount: 7,
    tools: [
      'Base64 encode/decode',
      'AES encryptor',
      'Password generator',
      'Hash generator',
      'UUID/GUID generator',
      'Password strength checker',
      'File hash checker'
    ],
    items: [
      {
        id: 'base64-encode-decode',
        name: 'Base64 encode/decode',
        description: 'Ubah teks biasa jadi Base64, atau sebaliknya.'
      },
      {
        id: 'aes-encryptor',
        name: 'AES encryptor',
        description: 'Enkripsi teks atau file pakai password, AES asli lewat Web Crypto API.'
      },
      {
        id: 'password-generator',
        name: 'Password generator',
        description: 'Bikin password acak yang kuat, generate baru kapan pun.'
      },
      {
        id: 'hash-generator',
        name: 'Hash generator',
        description: 'Ubah teks jadi hash satu arah, nggak bisa dibalik ke teks asli.'
      },
      {
        id: 'uuid-generator',
        name: 'UUID/GUID generator',
        description: 'Generate ID unik acak, satu atau banyak sekaligus.'
      },
      {
        id: 'password-strength-checker',
        name: 'Password strength checker',
        description: 'Cek seberapa kuat password yang sudah Anda punya.'
      },
      {
        id: 'file-hash-checker',
        name: 'File hash checker',
        description: 'Hitung hash sebuah file untuk verifikasi integritas.'
      }
    ]
  },

  {
    slug: 'utilities',
    name: 'Utilities and web dev',
    description: 'Rapikan JSON, baca JWT, dan uji pola regex',
    toolCount: 8,
    tools: [
      'JSON formatter',
      'JWT decoder',
      'Markdown notes',
      'URL parser',
      'Regex tester',
      'Case converter',
      'Text diff checker',
      'Cron expression parser'
    ],
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
      },
      {
        id: 'case-converter',
        name: 'Case converter',
        description: 'Ubah teks antar format penamaan: camelCase, snake_case, dll.'
      },
      {
        id: 'text-diff-checker',
        name: 'Text diff checker',
        description: 'Bandingkan dua teks dan lihat bagian yang berbeda.'
      },
      {
        id: 'cron-parser',
        name: 'Cron expression parser',
        description: 'Baca ekspresi cron dalam bahasa yang mudah dipahami.'
      }
    ]
  },

  {
    slug: 'networking',
    name: 'Networking and IT support',
    description: 'Info jaringan, kalkulator subnet, dan konversi timestamp',
    toolCount: 7,
    tools: [
      'IP and network info',
      'CIDR/subnet calculator',
      'Epoch timestamp converter',
      'DNS Lookup',
      'Ping/Latency tester',
      'MAC Address vendor lookup',
      'WHOIS/domain info lookup'
    ],
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
      },
      {
        id: 'dns-lookup',
        name: 'DNS Lookup',
        description: 'Lihat record DNS sebuah domain: A, AAAA, MX, TXT, NS, CNAME.'
      },
      {
        id: 'ping-tester',
        name: 'Ping/Latency tester',
        description: 'Cek kecepatan respons ke beberapa endpoint publik.'
      },
      {
        id: 'mac-vendor-lookup',
        name: 'MAC Address vendor lookup',
        description: 'Cari tahu vendor perangkat dari MAC address.'
      },
      {
        id: 'whois-lookup',
        name: 'WHOIS/domain info lookup',
        description: 'Cek registrar, tanggal daftar, dan kedaluwarsa sebuah domain.'
      }
    ]
  }
]