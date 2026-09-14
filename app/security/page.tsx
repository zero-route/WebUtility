import Base64EncodeDecodeUI from '@/components/security/base64-encode-decode/Base64EncodeDecodeUI'
import EncryptorUI from '@/components/security/text-encryptor/EncryptorUI'
import PasswordGenUI from '@/components/security/password-gen/PasswordGenUI'
import HashGenUI from '@/components/security/hash-gen/HashGenUI'

export default function SecurityPage() {
  return (
    <div>
      <h1 className="text-center font-display text-2xl font-medium text-textPrimary">Security tools</h1>
      <div className="mt-10 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Base64EncodeDecodeUI />
        <EncryptorUI />
        <PasswordGenUI />
        <HashGenUI />
      </div>
    </div>
  )
}
