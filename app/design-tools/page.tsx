import VectorizerUI from '@/components/design-tools/svg-vectorizer/VectorizerUI'
import Base64UI from '@/components/design-tools/base64-converter/Base64UI'
import QrUI from '@/components/design-tools/qr-barcode/QrUI'
import ToolPage from '@/components/dashboard/ToolPage'

export default function DesignToolsPage() {
  return (
    <ToolPage
      title="Design tools"
      description="Konversi gambar, buat QR code, dan olah aset visual ringan"
      tools={[
        {
          id: 'svg-vectorizer',
          name: 'SVG vectorizer',
          description: 'Konversi gambar raster menjadi SVG vector yang dapat diedit.',
          component: <VectorizerUI />
        },
        {
          id: 'base64-converter',
          name: 'Base64 converter',
          description: 'Ubah gambar menjadi Data URI Base64 secara langsung.',
          component: <Base64UI />
        },
        {
          id: 'qr-barcode-generator',
          name: 'QR and barcode generator',
          description: 'Buat QR code dan barcode dari teks atau data sederhana.',
          component: <QrUI />
        }
      ]}
    />
  )
}