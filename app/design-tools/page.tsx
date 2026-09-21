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
          description: 'Upload logo PNG/JPG berlatar transparan, lalu generate kode SVG-nya.',
          component: <VectorizerUI />
        },
        {
          id: 'base64-converter',
          name: 'Base64 converter',
          description: 'Upload gambar, hasilnya langsung jadi kode data URI Base64.',
          component: <Base64UI />
        },
        {
          id: 'qr-barcode-generator',
          name: 'QR and barcode generator',
          description: 'Masukkan link atau teks, opsional tambahkan logo di tengah QR.',
          component: <QrUI />
        },
        {
          id: 'color-palette-generator',
          name: 'Color picker and palette generator',
          description: 'Pilih satu warna, dapatkan variasi kombinasi otomatis.',
          component: <ColorPaletteGenerator />
        },
        {
          id: 'image-compressor',
          name: 'Image compressor',
          description: 'Kecilkan ukuran file gambar langsung di browser.',
          component: <ImageCompressor />
        }
      ]}
    />
  )
}
