export type ToolItem = {
  id: string
  name: string
  description: string
  steps: string[]
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
    description:
      'Ambil video dan audio dari berbagai platform media sosial menggunakan tautan konten.',
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
        description:
          'Tool untuk mengambil media dari TikTok melalui URL video. Cocok digunakan ketika Anda ingin menyimpan konten untuk penggunaan pribadi tanpa perlu memasang aplikasi tambahan.',
        steps: [
          'Salin URL video TikTok yang ingin diunduh.',
          'Tempel URL ke kolom yang tersedia.',
          'Tekan tombol proses atau download.',
          'Pilih kualitas atau format yang tersedia.',
          'Simpan file hasil download ke perangkat.'
        ]
      },
      {
        id: 'youtube-downloader',
        name: 'YouTube downloader',
        description:
          'Tool untuk memproses tautan video YouTube dan menyediakan hasil media yang dapat diunduh. Gunakan hanya untuk konten yang memang boleh Anda simpan atau gunakan.',
        steps: [
          'Salin URL video YouTube.',
          'Tempel URL ke kolom input.',
          'Tekan tombol proses.',
          'Pilih format atau kualitas yang tersedia.',
          'Unduh file hasilnya ke perangkat.'
        ]
      },
      {
        id: 'instagram-downloader',
        name: 'Instagram downloader',
        description:
          'Mengambil media dari konten Instagram menggunakan URL publik. Tool dapat digunakan untuk memproses media yang tersedia melalui tautan konten.',
        steps: [
          'Salin URL postingan atau media Instagram.',
          'Tempel URL ke kolom input.',
          'Tekan tombol proses.',
          'Tunggu media berhasil ditemukan.',
          'Unduh hasil media yang tersedia.'
        ]
      },
      {
        id: 'x-threads-downloader',
        name: 'X and Threads downloader',
        description:
          'Tool untuk mengambil media dari X dan Threads menggunakan tautan konten. Praktis untuk memproses media tanpa perlu menggunakan aplikasi tambahan.',
        steps: [
          'Salin URL postingan dari X atau Threads.',
          'Tempel URL ke kolom input.',
          'Tekan tombol proses.',
          'Tunggu media berhasil diproses.',
          'Unduh file yang tersedia.'
        ]
      }
    ]
  },

  {
    slug: 'design-tools',
    name: 'Design tools',
    description:
      'Konversi gambar, membuat QR code, mengambil warna, dan mengoptimalkan aset visual.',
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
        description:
          'Mengubah gambar raster seperti PNG atau JPG menjadi representasi SVG. Cocok untuk logo atau aset sederhana dengan latar transparan yang ingin digunakan dalam website.',
        steps: [
          'Pilih atau upload gambar PNG/JPG.',
          'Pastikan objek memiliki kontras yang cukup.',
          'Atur parameter vectorisasi jika tersedia.',
          'Jalankan proses vectorisasi.',
          'Salin atau download hasil SVG.'
        ]
      },
      {
        id: 'base64-converter',
        name: 'Base64 converter',
        description:
          'Mengubah file gambar menjadi Data URI Base64 yang dapat langsung digunakan pada HTML, CSS, atau kode aplikasi. Proses dilakukan langsung di browser.',
        steps: [
          'Pilih gambar dari perangkat.',
          'Tunggu file selesai diproses.',
          'Periksa hasil Data URI Base64.',
          'Salin kode yang dihasilkan.',
          'Gunakan kode tersebut pada project Anda.'
        ]
      },
      {
        id: 'qr-barcode-generator',
        name: 'QR and barcode generator',
        description:
          'Membuat QR code atau barcode dari teks, URL, maupun data tertentu. QR dapat dikustomisasi dan pada konfigurasi tertentu dapat ditambahkan logo di bagian tengah.',
        steps: [
          'Masukkan teks, URL, atau data.',
          'Pilih jenis kode yang diinginkan.',
          'Atur ukuran dan opsi tampilan.',
          'Tambahkan logo jika diperlukan.',
          'Generate lalu download hasilnya.'
        ]
      },
      {
        id: 'color-palette-generator',
        name: 'Color picker and palette generator',
        description:
          'Membantu memilih warna dan menghasilkan kombinasi palette yang serasi. Berguna untuk mencari warna dasar, variasi warna, serta referensi warna untuk desain UI.',
        steps: [
          'Pilih warna utama menggunakan color picker.',
          'Periksa nilai HEX, RGB, atau format lain.',
          'Generate kombinasi warna.',
          'Pilih palette yang sesuai.',
          'Salin kode warna yang diperlukan.'
        ]
      },
      {
        id: 'image-compressor',
        name: 'Image compressor',
        description:
          'Mengurangi ukuran file gambar dengan tetap mempertahankan kualitas visual sebaik mungkin. Cocok untuk mengoptimalkan gambar sebelum digunakan pada website atau dibagikan.',
        steps: [
          'Upload gambar yang ingin dikompres.',
          'Pilih tingkat kompresi jika tersedia.',
          'Jalankan proses kompresi.',
          'Bandingkan ukuran file sebelum dan sesudah.',
          'Download gambar hasil kompresi.'
        ]
      }
    ]
  },

  {
    slug: 'security',
    name: 'Security tools',
    description:
      'Enkripsi data, pembuatan password, hashing, UUID, dan berbagai utilitas keamanan ringan.',
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
        description:
          'Mengubah teks menjadi representasi Base64 atau mengembalikan Base64 menjadi teks. Base64 merupakan encoding, bukan metode enkripsi atau perlindungan keamanan.',
        steps: [
          'Pilih mode Encode atau Decode.',
          'Masukkan teks atau Base64.',
          'Jalankan proses konversi.',
          'Periksa hasil yang ditampilkan.',
          'Salin hasil ke clipboard.'
        ]
      },
      {
        id: 'aes-encryptor',
        name: 'AES encryptor',
        description:
          'Mengenkripsi teks atau data menggunakan algoritma AES melalui Web Crypto API. Data diproses di browser sehingga tool dapat digunakan untuk kebutuhan enkripsi lokal.',
        steps: [
          'Masukkan teks atau data yang ingin dienkripsi.',
          'Masukkan password atau kunci.',
          'Pilih mode enkripsi jika tersedia.',
          'Jalankan proses enkripsi.',
          'Simpan hasil dan password dengan aman.'
        ]
      },
      {
        id: 'password-generator',
        name: 'Password generator',
        description:
          'Membuat password acak dengan kombinasi karakter yang dapat disesuaikan. Berguna untuk menghasilkan password baru yang sulit ditebak daripada menggunakan pola yang mudah diprediksi.',
        steps: [
          'Tentukan panjang password.',
          'Pilih jenis karakter yang digunakan.',
          'Atur opsi tambahan jika tersedia.',
          'Generate password baru.',
          'Salin dan simpan menggunakan password manager.'
        ]
      },
      {
        id: 'hash-generator',
        name: 'Hash generator',
        description:
          'Menghasilkan nilai hash dari teks menggunakan algoritma hash yang tersedia. Hash bersifat satu arah dan umumnya digunakan untuk identifikasi atau pemeriksaan integritas data.',
        steps: [
          'Masukkan teks yang ingin di-hash.',
          'Pilih algoritma hash.',
          'Jalankan proses hashing.',
          'Periksa nilai hash yang dihasilkan.',
          'Salin hash jika diperlukan.'
        ]
      },
      {
        id: 'uuid-generator',
        name: 'UUID/GUID generator',
        description:
          'Menghasilkan UUID atau GUID acak untuk kebutuhan identifikasi objek, database, aplikasi, dan sistem lainnya. Beberapa UUID dapat dibuat sekaligus untuk kebutuhan batch.',
        steps: [
          'Tentukan jumlah UUID yang dibutuhkan.',
          'Pilih versi UUID jika tersedia.',
          'Jalankan proses generate.',
          'Periksa daftar UUID yang dihasilkan.',
          'Salin satu atau seluruh hasil.'
        ]
      },
      {
        id: 'password-strength-checker',
        name: 'Password strength checker',
        description:
          'Menganalisis karakteristik password dan memberikan gambaran mengenai tingkat kekuatannya. Pemeriksaan dapat membantu menemukan password yang terlalu pendek atau mudah ditebak.',
        steps: [
          'Masukkan password ke kolom pemeriksaan.',
          'Tunggu analisis dilakukan.',
          'Periksa indikator kekuatan password.',
          'Lihat karakteristik yang masih lemah.',
          'Perbaiki password jika diperlukan.'
        ]
      },
      {
        id: 'file-hash-checker',
        name: 'File hash checker',
        description:
          'Menghitung nilai hash dari sebuah file untuk membantu memeriksa apakah file berubah atau tetap sama. Berguna untuk verifikasi integritas file setelah download atau transfer.',
        steps: [
          'Pilih file dari perangkat.',
          'Pilih algoritma hash yang diperlukan.',
          'Tunggu proses hashing selesai.',
          'Salin nilai hash yang dihasilkan.',
          'Bandingkan dengan hash referensi.'
        ]
      }
    ]
  },

  {
    slug: 'utilities',
    name: 'Utilities and web dev',
    description:
      'Berbagai utilitas untuk developer seperti JSON, JWT, URL, regex, Markdown, dan pengolahan teks.',
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
        description:
          'Merapikan, memvalidasi, dan membaca struktur JSON dengan lebih mudah. Cocok digunakan saat menangani response API, konfigurasi aplikasi, atau data JSON yang sulit dibaca.',
        steps: [
          'Tempel atau masukkan JSON.',
          'Jalankan proses format atau validasi.',
          'Periksa struktur JSON.',
          'Perbaiki bagian yang mengalami error.',
          'Salin JSON yang sudah dirapikan.'
        ]
      },
      {
        id: 'jwt-decoder',
        name: 'JWT decoder',
        description:
          'Membaca bagian header dan payload dari JSON Web Token tanpa melakukan verifikasi signature. Berguna untuk melihat isi claim JWT saat debugging aplikasi.',
        steps: [
          'Salin JWT dari aplikasi atau request.',
          'Tempel token ke kolom input.',
          'Jalankan proses decode.',
          'Periksa header dan payload.',
          'Gunakan informasi tersebut untuk debugging.'
        ]
      },
      {
        id: 'markdown-notes',
        name: 'Markdown notes',
        description:
          'Editor sederhana untuk membuat dan mengolah catatan menggunakan Markdown. Cocok untuk dokumentasi singkat, catatan teknis, checklist, atau draft README.',
        steps: [
          'Tulis atau tempel catatan Markdown.',
          'Gunakan sintaks Markdown sesuai kebutuhan.',
          'Periksa preview hasilnya.',
          'Edit konten jika diperlukan.',
          'Salin atau simpan hasil catatan.'
        ]
      },
      {
        id: 'url-parser',
        name: 'URL parser',
        description:
          'Memecah URL menjadi bagian-bagian seperti protocol, hostname, port, pathname, query, dan fragment. Berguna untuk debugging URL dan memahami struktur alamat web.',
        steps: [
          'Masukkan URL lengkap.',
          'Jalankan proses parsing.',
          'Periksa setiap bagian URL.',
          'Lihat parameter query yang tersedia.',
          'Salin bagian URL yang diperlukan.'
        ]
      },
      {
        id: 'regex-tester',
        name: 'Regex tester',
        description:
          'Menguji regular expression secara langsung terhadap teks contoh. Tool ini membantu menemukan apakah pola regex sudah sesuai sebelum digunakan dalam kode aplikasi.',
        steps: [
          'Masukkan pola regular expression.',
          'Masukkan teks yang ingin diuji.',
          'Atur flags jika diperlukan.',
          'Periksa bagian yang berhasil di-match.',
          'Perbaiki pola sampai hasil sesuai.'
        ]
      },
      {
        id: 'case-converter',
        name: 'Case converter',
        description:
          'Mengubah teks ke berbagai format penamaan seperti camelCase, PascalCase, snake_case, kebab-case, UPPERCASE, dan lowercase untuk membantu kebutuhan coding atau pengolahan teks.',
        steps: [
          'Masukkan teks yang ingin diubah.',
          'Pilih format case tujuan.',
          'Jalankan proses konversi.',
          'Periksa hasil perubahan.',
          'Salin hasil yang diperlukan.'
        ]
      },
      {
        id: 'text-diff-checker',
        name: 'Text diff checker',
        description:
          'Membandingkan dua teks untuk menemukan bagian yang berubah, ditambahkan, atau dihapus. Berguna untuk memeriksa perubahan konfigurasi, dokumentasi, kode, atau teks lainnya.',
        steps: [
          'Masukkan teks pertama.',
          'Masukkan teks kedua.',
          'Jalankan proses perbandingan.',
          'Periksa bagian yang berbeda.',
          'Gunakan hasil diff untuk mengecek perubahan.'
        ]
      },
      {
        id: 'cron-parser',
        name: 'Cron expression parser',
        description:
          'Membaca ekspresi cron dan menjelaskan jadwal yang direpresentasikan dalam format yang lebih mudah dipahami. Berguna saat membuat atau memeriksa jadwal otomatisasi.',
        steps: [
          'Masukkan ekspresi cron.',
          'Jalankan proses parsing.',
          'Periksa arti setiap bagian ekspresi.',
          'Lihat jadwal eksekusi yang dihasilkan.',
          'Sesuaikan ekspresi jika diperlukan.'
        ]
      }
    ]
  },

  {
    slug: 'networking',
    name: 'Networking and IT support',
    description:
      'Tool untuk membantu pekerjaan jaringan seperti informasi IP, subnetting, DNS, latency, MAC address, dan domain.',
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
        description:
          'Menampilkan informasi IP dan data jaringan yang dapat diperoleh oleh aplikasi. Berguna untuk pemeriksaan cepat konfigurasi atau identitas jaringan dari sisi koneksi pengguna.',
        steps: [
          'Buka tool dan tunggu informasi dimuat.',
          'Periksa alamat IP yang terdeteksi.',
          'Lihat informasi jaringan yang tersedia.',
          'Periksa detail tambahan jika tersedia.',
          'Gunakan data tersebut untuk troubleshooting.'
        ]
      },
      {
        id: 'subnet-calculator',
        name: 'CIDR/subnet calculator',
        description:
          'Menghitung informasi subnet berdasarkan alamat IP dan prefix CIDR. Tool dapat membantu mendapatkan network address, broadcast, range host, dan jumlah alamat yang tersedia.',
        steps: [
          'Masukkan IP address dan prefix CIDR.',
          'Jalankan proses kalkulasi.',
          'Periksa network dan broadcast address.',
          'Lihat range host yang tersedia.',
          'Gunakan hasil untuk perencanaan jaringan.'
        ]
      },
      {
        id: 'timestamp-converter',
        name: 'Epoch timestamp converter',
        description:
          'Mengubah Unix epoch timestamp menjadi tanggal dan waktu yang mudah dibaca, atau melakukan konversi sebaliknya. Berguna saat membaca timestamp dari log, API, dan database.',
        steps: [
          'Masukkan nilai Unix timestamp.',
          'Pilih satuan timestamp jika diperlukan.',
          'Jalankan proses konversi.',
          'Periksa tanggal dan waktu hasil konversi.',
          'Salin hasil yang dibutuhkan.'
        ]
      },
      {
        id: 'dns-lookup',
        name: 'DNS Lookup',
        description:
          'Memeriksa record DNS dari sebuah domain seperti A, AAAA, MX, TXT, NS, dan CNAME. Berguna untuk troubleshooting DNS serta memahami konfigurasi domain.',
        steps: [
          'Masukkan nama domain.',
          'Pilih jenis record DNS.',
          'Jalankan proses lookup.',
          'Periksa record yang ditemukan.',
          'Gunakan hasil untuk analisis DNS.'
        ]
      },
      {
        id: 'ping-tester',
        name: 'Ping/Latency tester',
        description:
          'Mengukur waktu respons terhadap endpoint yang dapat diakses melalui browser. Berguna untuk melihat latency dan membandingkan respons beberapa endpoint jaringan.',
        steps: [
          'Pilih atau masukkan endpoint yang tersedia.',
          'Mulai pengujian latency.',
          'Tunggu beberapa request selesai.',
          'Periksa waktu respons yang dihasilkan.',
          'Bandingkan hasil antar endpoint.'
        ]
      },
      {
        id: 'mac-vendor-lookup',
        name: 'MAC Address vendor lookup',
        description:
          'Mencari informasi vendor berdasarkan OUI atau bagian awal MAC address. Berguna untuk membantu mengidentifikasi produsen perangkat dalam proses troubleshooting jaringan.',
        steps: [
          'Masukkan MAC address perangkat.',
          'Jalankan proses lookup.',
          'Tool membaca OUI dari MAC address.',
          'Periksa vendor yang ditemukan.',
          'Gunakan informasi tersebut sebagai referensi.'
        ]
      },
      {
        id: 'whois-lookup',
        name: 'WHOIS/domain info lookup',
        description:
          'Menampilkan informasi registrasi domain yang tersedia melalui layanan WHOIS, seperti registrar, tanggal registrasi, dan tanggal kedaluwarsa. Data yang tersedia dapat berbeda tergantung domain dan privasi registrar.',
        steps: [
          'Masukkan nama domain.',
          'Jalankan proses WHOIS lookup.',
          'Tunggu data registrasi tersedia.',
          'Periksa registrar dan informasi tanggal.',
          'Gunakan hasil sebagai referensi domain.'
        ]
      }
    ]
  }
]