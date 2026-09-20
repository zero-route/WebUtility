export function ipToInt(ip: string): number | null {
  const parts = ip.trim().split('.').map(Number)
  if (parts.length !== 4 || parts.some((part) => Number.isNaN(part) || part < 0 || part > 255)) {
    return null
  }
  return ((parts[0] << 24) | (parts[1] << 16) | (parts[2] << 8) | parts[3]) >>> 0
}

export function intToIp(num: number): string {
  return [(num >>> 24) & 255, (num >>> 16) & 255, (num >>> 8) & 255, num & 255].join('.')
}

export function prefixToMaskInt(prefix: number): number {
  if (prefix === 0) return 0
  return (0xffffffff << (32 - prefix)) >>> 0
}

export function maskToPrefix(maskInt: number): number {
  let prefix = 0
  let mask = maskInt
  for (let i = 0; i < 32; i++) {
    if (mask & 0x80000000) {
      prefix++
      mask = (mask << 1) >>> 0
    } else {
      break
    }
  }
  return prefix
}

export function getIpClass(firstOctet: number): string {
  if (firstOctet >= 1 && firstOctet <= 126) return 'A'
  if (firstOctet === 127) return 'A (loopback)'
  if (firstOctet >= 128 && firstOctet <= 191) return 'B'
  if (firstOctet >= 192 && firstOctet <= 223) return 'C'
  if (firstOctet >= 224 && firstOctet <= 239) return 'D (multicast)'
  return 'E (reserved)'
}

export function toBinary(ip: string): string {
  return ip
    .split('.')
    .map((octet) => Number(octet).toString(2).padStart(8, '0'))
    .join('.')
}

export type SubnetResult = {
  ip: string
  prefix: number
  subnetMask: string
  wildcardMask: string
  networkAddress: string
  broadcastAddress: string
  firstHost: string
  lastHost: string
  totalAddresses: number
  usableHosts: number
  ipClass: string
  binaryIp: string
  cidrNotation: string
}

export function calculateSubnet(ip: string, prefix: number): SubnetResult | null {
  const ipInt = ipToInt(ip)
  if (ipInt === null || prefix < 0 || prefix > 32) return null

  const maskInt = prefixToMaskInt(prefix)
  const wildcardInt = (~maskInt) >>> 0
  const networkInt = (ipInt & maskInt) >>> 0
  const broadcastInt = (networkInt | wildcardInt) >>> 0
  const totalAddresses = Math.pow(2, 32 - prefix)

  let firstHost: string
  let lastHost: string
  let usableHosts: number

  if (prefix === 32) {
    firstHost = intToIp(ipInt)
    lastHost = intToIp(ipInt)
    usableHosts = 1
  } else if (prefix === 31) {
    firstHost = intToIp(networkInt)
    lastHost = intToIp(broadcastInt)
    usableHosts = 2
  } else {
    firstHost = intToIp(networkInt + 1)
    lastHost = intToIp(broadcastInt - 1)
    usableHosts = totalAddresses - 2
  }

  return {
    ip,
    prefix,
    subnetMask: intToIp(maskInt),
    wildcardMask: intToIp(wildcardInt),
    networkAddress: intToIp(networkInt),
    broadcastAddress: intToIp(broadcastInt),
    firstHost,
    lastHost,
    totalAddresses,
    usableHosts,
    ipClass: getIpClass(ipInt >>> 24),
    binaryIp: toBinary(ip),
    cidrNotation: `${intToIp(networkInt)}/${prefix}`
  }
}
