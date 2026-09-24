import type { Metadata } from 'next'
import JsonTool from '@/components/utilities/json-validator/JsonTool'
import JwtDecoder from '@/components/utilities/jwt-decoder/JwtDecoder'
import MarkdownNotes from '@/components/utilities/markdown-notes/MarkdownNotes'
import UrlParser from '@/components/utilities/url-inspector/UrlParser'
import RegexTester from '@/components/utilities/regex-tester/RegexTester'
import CaseConverter from '@/components/utilities/case-converter/CaseConverter'
import TextDiffChecker from '@/components/utilities/text-diff/TextDiffChecker'
import CronParser from '@/components/utilities/cron-parser/CronParser'
import ToolPage from '@/components/dashboard/ToolPage'

export const metadata: Metadata = {
  title: 'Utilities and web dev'
}

export default function UtilitiesPage() {
  return (
    <ToolPage
      title="Utilities and web dev"
      description="Rapikan JSON, baca JWT, dan uji pola regex"
      tools={[
        {
          id: 'json-formatter',
          name: 'JSON formatter',
          description:
            'Memformat dan memvalidasi struktur JSON agar lebih rapi, mudah dibaca, serta membantu menemukan kesalahan sintaks pada data JSON.',
          steps: [
            'Masukkan atau tempel data JSON yang ingin diperiksa.',
            'Jalankan proses formatting atau validasi.',
            'Periksa struktur JSON yang sudah dirapikan.',
            'Perhatikan pesan error jika JSON tidak valid.',
            'Salin hasil JSON yang sudah diperbaiki.'
          ],
          component: <JsonTool />
        },
        {
          id: 'jwt-decoder',
          name: 'JWT decoder',
          description:
            'Membaca bagian header dan payload dari JSON Web Token (JWT) untuk membantu memahami isi token tanpa melakukan verifikasi signature.',
          steps: [
            'Masukkan JWT yang ingin diperiksa.',
            'Jalankan proses decoding.',
            'Periksa bagian header dan payload.',
            'Baca data atau claims yang terdapat di dalam token.',
            'Salin informasi yang diperlukan.'
          ],
          component: <JwtDecoder />
        },
        {
          id: 'markdown-notes',
          name: 'Markdown notes',
          description:
            'Editor sederhana untuk membuat catatan menggunakan sintaks Markdown dan melihat hasil formatnya secara langsung.',
          steps: [
            'Tulis atau tempel catatan pada editor.',
            'Gunakan sintaks Markdown sesuai kebutuhan.',
            'Periksa hasil rendering Markdown.',
            'Edit isi catatan jika diperlukan.',
            'Salin atau gunakan hasil Markdown tersebut.'
          ],
          component: <MarkdownNotes />
        },
        {
          id: 'url-parser',
          name: 'URL parser',
          description:
            'Memecah sebuah URL menjadi bagian-bagian seperti protocol, hostname, port, path, query parameter, dan fragment untuk memudahkan pemeriksaan struktur URL.',
          steps: [
            'Masukkan URL yang ingin diperiksa.',
            'Jalankan proses parsing.',
            'Periksa setiap bagian URL yang ditampilkan.',
            'Periksa query parameter atau komponen lainnya.',
            'Salin informasi yang diperlukan.'
          ],
          component: <UrlParser />
        },
        {
          id: 'regex-tester',
          name: 'Regex tester',
          description:
            'Menguji regular expression terhadap teks secara langsung untuk melihat kecocokan pola dan membantu menyusun atau memperbaiki ekspresi regex.',
          steps: [
            'Masukkan regular expression yang ingin diuji.',
            'Masukkan teks sebagai data pengujian.',
            'Atur flag regex jika diperlukan.',
            'Periksa bagian teks yang cocok dengan pola.',
            'Perbaiki pola dan uji kembali jika diperlukan.'
          ],
          component: <RegexTester />
        },
        {
          id: 'case-converter',
          name: 'Case converter',
          description:
            'Mengubah format penulisan teks ke berbagai gaya seperti camelCase, PascalCase, snake_case, kebab-case, uppercase, dan lowercase.',
          steps: [
            'Masukkan teks yang ingin dikonversi.',
            'Pilih format case yang diinginkan.',
            'Jalankan proses konversi.',
            'Periksa hasil perubahan format.',
            'Salin hasil teks untuk digunakan pada project.'
          ],
          component: <CaseConverter />
        },
        {
          id: 'text-diff-checker',
          name: 'Text diff checker',
          description:
            'Membandingkan dua teks untuk menemukan bagian yang ditambahkan, dihapus, atau mengalami perubahan sehingga perbedaan dokumen lebih mudah diperiksa.',
          steps: [
            'Masukkan teks pertama.',
            'Masukkan teks kedua sebagai pembanding.',
            'Jalankan proses perbandingan.',
            'Periksa bagian teks yang berbeda.',
            'Gunakan hasil perbandingan untuk mengecek perubahan.'
          ],
          component: <TextDiffChecker />
        },
        {
          id: 'cron-parser',
          name: 'Cron expression parser',
          description:
            'Membaca ekspresi cron dan menerjemahkan jadwalnya ke bentuk yang lebih mudah dipahami untuk membantu memeriksa konfigurasi scheduled task.',
          steps: [
            'Masukkan ekspresi cron yang ingin diperiksa.',
            'Jalankan proses parsing.',
            'Periksa arti setiap bagian ekspresi.',
            'Periksa jadwal atau waktu eksekusi yang dihasilkan.',
            'Gunakan hasilnya untuk memvalidasi konfigurasi cron.'
          ],
          component: <CronParser />
        }
      ]}
    />
  )
}