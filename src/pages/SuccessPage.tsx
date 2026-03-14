import React, { useState, useMemo } from 'react'
import type { OrderData } from '../components/shared/OrderTypes'
import type { OrderItem } from '../types/OrderItem'
import { SuccessHeader } from '../components/SuccessPageComponents/SuccessHeader'
import { TransactionDetails } from '../components/SuccessPageComponents/TransactionDetails'
import { OrderSummary } from '../components/SuccessPageComponents/OrderSummary'
import { NextSteps } from '../components/SuccessPageComponents/NextSteps'
import { SuccessFooter } from '../components/SuccessPageComponents/SuccessFooter'

interface SuccessPageOrderData extends OrderData {
  items: OrderItem[]
}

export const SuccessPage: React.FC = () => {
  const [orderData] = useState<SuccessPageOrderData | null>(() => {
    const savedOrder = sessionStorage.getItem('lastOrder')
    return savedOrder ? JSON.parse(savedOrder) : null
  })

  // Memoizza il calcolo della data
  const orderDate = useMemo(() => {
    if (!orderData) return ''
    return new Date(orderData.timestamp).toLocaleString('it-IT')
  }, [orderData])

  if (!orderData) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <SuccessHeader />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TransactionDetails orderData={orderData} orderDate={orderDate} />
          <OrderSummary items={orderData.items} totalETH={orderData.totalETH} />
        </div>
        <div className="space-y-6">
          <NextSteps />
          <SuccessFooter />
        </div>
      </div>
    </div>
  )
}
