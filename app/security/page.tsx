import type { Metadata } from 'next'
import Base64EncodeDecodeUI from '@/components/security/base64-encode-decode/Base64EncodeDecodeUI'
import EncryptorUI from '@/components/security/text-encryptor/EncryptorUI'
import PasswordGenUI from '@/components/security/password-gen/PasswordGenUI'
import HashGenUI from '@/components/security/hash-gen/HashGenUI'
import UuidGenerator from '@/components/security/uuid-generator/UuidGenerator'
import PasswordStrengthChecker from '@/components/security/password-strength/PasswordStrengthChecker'
import FileHashChecker from '@/components/security/file-hash/FileHashChecker'
import ToolPage from '@/components/dashboard/ToolPage'

export const metadata: Metadata = {
  title: 'Security tools'
}

export default function SecurityPage() {
  return (
    <ToolPage
      title="Security tools"
      description="Enkripsi teks, buat password kuat, dan hitung hash satu arah"
      tools={[
        {
          id: 'base64-encode-decode',
          name: 'Base64 encode/decode',
          description: 'Ubah teks biasa jadi Base64, atau sebaliknya.',
          component: <Base64EncodeDecodeUI />
        },
        {
          id: 'aes-encryptor',
          name: 'AES encryptor',
          description: 'Enkripsi teks atau file pakai password, AES asli lewat Web Crypto API.',
          component: <EncryptorUI />
        },
        {
          id: 'password-generator',
          name: 'Password generator',
          description: 'Bikin password acak yang kuat, generate baru kapan pun.',
          component: <PasswordGenUI />
        },
        {
          id: 'hash-generator',
          name: 'Hash generator',
          description: 'Ubah teks jadi hash satu arah, nggak bisa dibalik ke teks asli.',
          component: <HashGenUI />
        },
        {
          id: 'uuid-generator',
          name: 'UUID/GUID generator',
          description: 'Generate ID unik acak, satu atau banyak sekaligus.',
          component: <UuidGenerator />
        },
        {
          id: 'password-strength-checker',
          name: 'Password strength checker',
          description: 'Cek seberapa kuat password yang sudah Anda punya.',
          component: <PasswordStrengthChecker />
        },
        {
          id: 'file-hash-checker',
          name: 'File hash checker',
          description: 'Hitung hash sebuah file untuk verifikasi integritas.',
          component: <FileHashChecker />
        }
      ]}
    />
  )
}
