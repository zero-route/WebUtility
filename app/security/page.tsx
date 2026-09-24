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
          description:
            'Mengubah teks biasa menjadi representasi Base64 atau mendekode data Base64 kembali menjadi teks untuk kebutuhan pertukaran dan pengolahan data.',
          steps: [
            'Masukkan teks atau data Base64 yang ingin diproses.',
            'Pilih mode encode atau decode.',
            'Jalankan proses konversi.',
            'Periksa hasil yang dihasilkan.',
            'Salin hasil untuk digunakan pada kebutuhan lain.'
          ],
          component: <Base64EncodeDecodeUI />
        },
        {
          id: 'aes-encryptor',
          name: 'AES encryptor',
          description:
            'Mengenkripsi teks atau file menggunakan algoritma AES melalui Web Crypto API dengan password sebagai dasar kunci enkripsi.',
          steps: [
            'Masukkan teks atau pilih file yang ingin dienkripsi.',
            'Masukkan password untuk proses enkripsi.',
            'Jalankan proses enkripsi.',
            'Simpan atau salin hasil enkripsi.',
            'Gunakan password yang sama saat ingin melakukan dekripsi.'
          ],
          component: <EncryptorUI />
        },
        {
          id: 'password-generator',
          name: 'Password generator',
          description:
            'Membuat password acak dengan kombinasi karakter yang dapat digunakan untuk akun, aplikasi, layanan, maupun kebutuhan keamanan lainnya.',
          steps: [
            'Tentukan panjang password yang diinginkan.',
            'Pilih jenis karakter yang ingin digunakan.',
            'Generate password baru.',
            'Periksa hasil password yang dibuat.',
            'Salin password dan simpan di tempat yang aman.'
          ],
          component: <PasswordGenUI />
        },
        {
          id: 'hash-generator',
          name: 'Hash generator',
          description:
            'Menghasilkan nilai hash satu arah dari teks menggunakan algoritma hash yang tersedia untuk kebutuhan pengecekan, fingerprinting, atau integritas data.',
          steps: [
            'Masukkan teks yang ingin di-hash.',
            'Pilih algoritma hash yang tersedia.',
            'Jalankan proses hashing.',
            'Periksa nilai hash yang dihasilkan.',
            'Salin hash untuk digunakan sebagai referensi.'
          ],
          component: <HashGenUI />
        },
        {
          id: 'uuid-generator',
          name: 'UUID/GUID generator',
          description:
            'Menghasilkan UUID atau GUID acak untuk digunakan sebagai identifier unik pada aplikasi, database, API, maupun kebutuhan pengembangan lainnya.',
          steps: [
            'Tentukan jumlah UUID yang ingin dibuat.',
            'Pilih format atau versi jika tersedia.',
            'Jalankan proses generate.',
            'Periksa UUID yang dihasilkan.',
            'Salin satu atau seluruh UUID sesuai kebutuhan.'
          ],
          component: <UuidGenerator />
        },
        {
          id: 'password-strength-checker',
          name: 'Password strength checker',
          description:
            'Menganalisis karakteristik password untuk memberikan gambaran mengenai tingkat kekuatan dan faktor yang dapat membuat password lebih sulit ditebak.',
          steps: [
            'Masukkan password yang ingin diperiksa.',
            'Tunggu proses analisis dilakukan.',
            'Periksa indikator kekuatan password.',
            'Perhatikan faktor yang memengaruhi hasil.',
            'Gunakan rekomendasi yang tersedia untuk memperbaikinya.'
          ],
          component: <PasswordStrengthChecker />
        },
        {
          id: 'file-hash-checker',
          name: 'File hash checker',
          description:
            'Menghitung nilai hash dari sebuah file untuk membantu memeriksa apakah file yang diterima masih memiliki integritas yang sama dengan sumber atau referensi sebelumnya.',
          steps: [
            'Pilih file yang ingin diperiksa.',
            'Pilih algoritma hash jika tersedia.',
            'Tunggu proses hashing selesai.',
            'Periksa nilai hash file.',
            'Bandingkan dengan hash referensi jika diperlukan.'
          ],
          component: <FileHashChecker />
        }
      ]}
    />
  )
}