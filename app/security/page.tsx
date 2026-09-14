import Base64EncodeDecodeUI from '@/components/security/base64-encode-decode/Base64EncodeDecodeUI'
import ToolPlaceholderCard from '@/components/dashboard/ToolPlaceholderCard'

export default function SecurityPage() {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">Security tools</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Base64EncodeDecodeUI />
        <div className="flex flex-col gap-4">
          <ToolPlaceholderCard name="AES encryptor" index={0} />
          <ToolPlaceholderCard name="Password generator" index={1} />
          <ToolPlaceholderCard name="Hash generator" index={2} />
        </div>
      </div>
    </div>
  )
}
