export interface OrderItem {
  product: {
    id: string
    name: string
    priceETH: string
    unit: string
  }
  quantity: number
}
