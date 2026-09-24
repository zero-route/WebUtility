import type { Metadata } from 'next'
import VectorizerUI from '@/components/design-tools/svg-vectorizer/VectorizerUI'
import Base64UI from '@/components/design-tools/base64-converter/Base64UI'
import QrUI from '@/components/design-tools/qr-barcode/QrUI'
import ColorPaletteGenerator from '@/components/design-tools/color-palette/ColorPaletteGenerator'
import ImageCompressor from '@/components/design-tools/image-compressor/ImageCompressor'
import ToolPage from '@/components/dashboard/ToolPage'

export const metadata: Metadata = {
  title: 'Design tools'
}

export default function DesignToolsPage() {
  return (
    <ToolPage
      title="Design tools"
      description="Konversi gambar, buat QR code, dan olah aset visual ringan"
      tools={[
        {
          id: 'svg-vectorizer',
          name: 'SVG vectorizer',
          description:
            'Konversi gambar PNG atau JPG menjadi kode SVG yang dapat digunakan kembali untuk kebutuhan web dan desain.',
          steps: [
            'Siapkan gambar PNG atau JPG yang ingin dikonversi.',
            'Upload gambar ke tool.',
            'Tunggu proses vectorization selesai.',
            'Periksa hasil SVG yang dihasilkan.',
            'Salin atau gunakan kode SVG tersebut.'
          ],
          component: <VectorizerUI />
        },
        {
          id: 'base64-converter',
          name: 'Base64 converter',
          description:
            'Mengubah gambar menjadi data URI Base64 yang dapat digunakan pada HTML, CSS, atau kebutuhan aplikasi web.',
          steps: [
            'Pilih gambar yang ingin dikonversi.',
            'Upload gambar ke tool.',
            'Tunggu proses encoding selesai.',
            'Periksa data URI Base64 yang dihasilkan.',
            'Salin hasil untuk digunakan pada project.'
          ],
          component: <Base64UI />
        },
        {
          id: 'qr-barcode-generator',
          name: 'QR and barcode generator',
          description:
            'Membuat QR code atau barcode dari URL, teks, maupun data lainnya dengan opsi kustomisasi yang tersedia.',
          steps: [
            'Masukkan URL, teks, atau data yang ingin digunakan.',
            'Pilih jenis kode yang ingin dibuat.',
            'Atur opsi tampilan jika diperlukan.',
            'Periksa hasil QR code atau barcode.',
            'Download hasil yang sudah dibuat.'
          ],
          component: <QrUI />
        },
        {
          id: 'color-palette-generator',
          name: 'Color picker and palette generator',
          description:
            'Memilih warna utama dan menghasilkan variasi palette yang dapat digunakan untuk kebutuhan desain website, aplikasi, maupun aset visual.',
          steps: [
            'Pilih warna utama menggunakan color picker.',
            'Periksa nilai HEX atau format warna lainnya.',
            'Pilih variasi palette yang tersedia.',
            'Periksa kombinasi warna yang dihasilkan.',
            'Salin kode warna yang ingin digunakan.'
          ],
          component: <ColorPaletteGenerator />
        },
        {
          id: 'image-compressor',
          name: 'Image compressor',
          description:
            'Mengurangi ukuran file gambar langsung di browser dengan pengaturan kompresi yang tersedia tanpa perlu aplikasi tambahan.',
          steps: [
            'Pilih gambar yang ingin dikompres.',
            'Upload gambar ke tool.',
            'Atur tingkat kompresi jika tersedia.',
            'Periksa ukuran dan hasil gambar.',
            'Download gambar hasil kompresi.'
          ],
          component: <ImageCompressor />
        }
      ]}
    />
  )
}