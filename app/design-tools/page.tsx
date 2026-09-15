import VectorizerUI from '@/components/design-tools/svg-vectorizer/VectorizerUI'
import Base64UI from '@/components/design-tools/base64-converter/Base64UI'
import QrUI from '@/components/design-tools/qr-barcode/QrUI'

export default function DesignToolsPage() {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">Design tools</h1>
      <div className="mt-10 flex flex-col gap-4">
        <VectorizerUI />
        <Base64UI />
        <QrUI />
      </div>
    </div>
  )
}
