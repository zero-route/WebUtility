const ALGO_CODES = ['AES-GCM', 'AES-CBC', 'AES-CTR'] as const
export type AesAlgorithm = (typeof ALGO_CODES)[number]
export const AES_ALGORITHMS = ALGO_CODES

function ivLengthFor(algorithm: AesAlgorithm) {
  return algorithm === 'AES-GCM' ? 12 : 16
}

async function deriveKey(password: string, salt: Uint8Array, algorithm: AesAlgorithm) {
  const encoder = new TextEncoder()
  const baseKey = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey'])
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt, iterations: 100000, hash: 'SHA-256' },
    baseKey,
    { name: algorithm, length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

function algorithmParams(algorithm: AesAlgorithm, iv: Uint8Array) {
  if (algorithm === 'AES-GCM') return { name: 'AES-GCM', iv }
  if (algorithm === 'AES-CBC') return { name: 'AES-CBC', iv }
  return { name: 'AES-CTR', counter: iv, length: 64 }
}

function writeUint16(value: number) {
  const buffer = new Uint8Array(2)
  buffer[0] = (value >> 8) & 0xff
  buffer[1] = value & 0xff
  return buffer
}

function readUint16(bytes: Uint8Array, offset: number) {
  return (bytes[offset] << 8) | bytes[offset + 1]
}

export type EncryptInput = {
  data: Uint8Array
  password: string
  algorithm: AesAlgorithm
  filename?: string
  mimeType?: string
}

export async function encryptPacket({ data, password, algorithm, filename, mimeType }: EncryptInput): Promise<Uint8Array> {
  const encoder = new TextEncoder()
  const filenameBytes = filename ? encoder.encode(filename) : new Uint8Array(0)
  const mimeBytes = mimeType ? encoder.encode(mimeType) : new Uint8Array(0)

  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(ivLengthFor(algorithm)))
  const key = await deriveKey(password, salt, algorithm)

  const ciphertext = new Uint8Array(await crypto.subtle.encrypt(algorithmParams(algorithm, iv), key, data))

  const algoCode = new Uint8Array([ALGO_CODES.indexOf(algorithm)])

  const parts = [
    algoCode,
    writeUint16(filenameBytes.length),
    filenameBytes,
    writeUint16(mimeBytes.length),
    mimeBytes,
    salt,
    iv,
    ciphertext
  ]

  const totalLength = parts.reduce((sum, part) => sum + part.length, 0)
  const result = new Uint8Array(totalLength)
  let offset = 0
  parts.forEach((part) => {
    result.set(part, offset)
    offset += part.length
  })

  return result
}

export type DecryptResult = {
  data: Uint8Array
  filename: string | null
  mimeType: string | null
}

export async function decryptPacket(packet: Uint8Array, password: string): Promise<DecryptResult> {
  const decoder = new TextDecoder()
  let offset = 0

  const algorithm = ALGO_CODES[packet[offset]]
  offset += 1

  const filenameLength = readUint16(packet, offset)
  offset += 2
  const filenameBytes = packet.slice(offset, offset + filenameLength)
  offset += filenameLength

  const mimeLength = readUint16(packet, offset)
  offset += 2
  const mimeBytes = packet.slice(offset, offset + mimeLength)
  offset += mimeLength

  const salt = packet.slice(offset, offset + 16)
  offset += 16

  const ivLength = ivLengthFor(algorithm)
  const iv = packet.slice(offset, offset + ivLength)
  offset += ivLength

  const ciphertext = packet.slice(offset)

  const key = await deriveKey(password, salt, algorithm)
  const plaintext = new Uint8Array(await crypto.subtle.decrypt(algorithmParams(algorithm, iv), key, ciphertext))

  return {
    data: plaintext,
    filename: filenameLength ? decoder.decode(filenameBytes) : null,
    mimeType: mimeLength ? decoder.decode(mimeBytes) : null
  }
}

export function bytesToBase64(bytes: Uint8Array): string {
  let binary = ''
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte)
  })
  return btoa(binary)
}

export function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes
}
