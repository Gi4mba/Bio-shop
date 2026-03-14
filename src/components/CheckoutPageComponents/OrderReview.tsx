import React from "react";
import { OrderItems } from "../shared/OrderTypes";
import type { OrderItem } from "../../types/OrderItem";

interface Props {
  items: OrderItem[];
  totalETH: string;
  totalUSD: number;
}

export const OrderReview: React.FC<Props> = ({ items, totalETH, totalUSD }) => {
  return (
    <div className="glass rounded-2xl p-6 mb-6 interactive-card animate-slide-up">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">📋</span>
        <h2 className="text-xl font-bold text-gray-800">Riepilogo Ordine</h2>
      </div>

      <OrderItems items={items} />

      <div className="pt-6 border-t border-gray-200/50">
        <div className="glass rounded-xl p-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Totale:</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{totalETH} ETH</div>
            <div className="text-sm text-gray-600">≈ ${totalUSD} USD</div>
          </div>
        </div>
      </div>
    </div>
  );
};
