import VectorizerUI from '@/components/design-tools/svg-vectorizer/VectorizerUI'
import ToolPlaceholderCard from '@/components/dashboard/ToolPlaceholderCard'

export default function DesignToolsPage() {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">Design tools</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <VectorizerUI />
        <div className="flex flex-col gap-4">
          <ToolPlaceholderCard name="Base64 converter" index={0} />
          <ToolPlaceholderCard name="QR and barcode generator" index={1} />
        </div>
      </div>
    </div>
  )
}
