import CryptoJS from 'crypto-js'

export type HashAlgorithm = 'MD5' | 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512'
export const HASH_ALGORITHMS: HashAlgorithm[] = ['MD5', 'SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']

function bufferToHex(buffer: ArrayBuffer) {
  return Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export async function generateHash(text: string, algorithm: HashAlgorithm): Promise<string> {
  if (algorithm === 'MD5') {
    return CryptoJS.MD5(text).toString(CryptoJS.enc.Hex)
  }

  const encoder = new TextEncoder()
  const data = encoder.encode(text)
  const digest = await crypto.subtle.digest(algorithm, data)
  return bufferToHex(digest)
}
