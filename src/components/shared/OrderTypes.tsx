import React, { useMemo } from "react";
import type { OrderItem } from "../../types/OrderItem";

export interface OrderData {
  totalETH: string;
  totalUSD: number;
  txHash: string;
  recipientAddress: string;
  timestamp: number;
}

interface Props {
  items: OrderItem[];
}

export const OrderItems: React.FC<Props> = ({ items }) => {
  const itemsList = useMemo(() => {
    return items.map(({ product, quantity }) => (
      <div key={product.id} className="glass rounded-lg p-4 mb-3 interactive-card">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="font-semibold text-gray-800">{product.name}</div>
            <div className="text-sm text-gray-600 mt-1">
              {quantity} {product.unit} × {product.priceETH} ETH
            </div>
          </div>
          <div className="font-bold text-primary text-lg">
            {(parseFloat(product.priceETH) * quantity).toFixed(6)} ETH
          </div>
        </div>
      </div>
    ));
  }, [items]);

  return <div className="space-y-2">{itemsList}</div>;
};
