import Base64EncodeDecodeUI from '@/components/security/base64-encode-decode/Base64EncodeDecodeUI'
import EncryptorUI from '@/components/security/text-encryptor/EncryptorUI'
import PasswordGenUI from '@/components/security/password-gen/PasswordGenUI'
import HashGenUI from '@/components/security/hash-gen/HashGenUI'
import ToolPage from '@/components/dashboard/ToolPage'

export default function SecurityPage() {
  return (
    <ToolPage
      title="Security tools"
      description="Enkripsi teks, buat password kuat, dan hitung hash satu arah"
      tools={[
        {
          id: 'base64-encode-decode',
          name: 'Base64 encode/decode',
          description: 'Encode atau decode teks menggunakan format Base64.',
          component: <Base64EncodeDecodeUI />
        },
        {
          id: 'aes-encryptor',
          name: 'AES encryptor',
          description: 'Enkripsi dan dekripsi teks menggunakan AES.',
          component: <EncryptorUI />
        },
        {
          id: 'password-generator',
          name: 'Password generator',
          description: 'Buat password acak dengan panjang dan karakter yang dapat diatur.',
          component: <PasswordGenUI />
        },
        {
          id: 'hash-generator',
          name: 'Hash generator',
          description: 'Ubah teks menjadi hash menggunakan beberapa algoritma.',
          component: <HashGenUI />
        }
      ]}
    />
  )
}