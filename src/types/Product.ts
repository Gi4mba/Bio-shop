export interface Product {
  id: string
  name: string
  description: string
  priceETH: string // In ETH (es: "0.01")
  priceUSD: number
  unit: string // "kg"
  imageIPFS: string // Hash IPFS
  category: string
}
