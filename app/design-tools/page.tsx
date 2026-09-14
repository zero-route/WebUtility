import VectorizerUI from '@/components/design-tools/svg-vectorizer/VectorizerUI'
import Base64UI from '@/components/design-tools/base64-converter/Base64UI'
import ToolPlaceholderCard from '@/components/dashboard/ToolPlaceholderCard'

export default function DesignToolsPage() {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">Design tools</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VectorizerUI />
        <Base64UI />
        <ToolPlaceholderCard name="QR and barcode generator" index={0} />
      </div>
    </div>
  )
}
