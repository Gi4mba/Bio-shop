import React from "react";
import { OrderItems } from "../shared/OrderTypes";
import type { OrderItem } from "../../types/OrderItem";

interface Props {
  items: OrderItem[];
  totalETH: string;
}

export const OrderSummary: React.FC<Props> = ({ items, totalETH }) => {
  return (
    <div className="glass rounded-2xl p-6 mb-6 interactive-card animate-slide-up">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🛒</span>
        <h2 className="text-xl font-bold text-gray-800">Riepilogo Ordine</h2>
      </div>

      <OrderItems items={items} />

      <div className="mt-6 pt-6 border-t border-gray-200/50">
        <div className="glass rounded-xl p-4 flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-700">Totale Pagato:</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-600">{totalETH} ETH</div>
            <div className="text-sm text-gray-500">Pagato con successo</div>
          </div>
        </div>
      </div>
    </div>
  );
};
