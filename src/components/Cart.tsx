import React from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";

export const Cart: React.FC = () => {
  const { items, removeItem, getTotalETH, getTotalUSD } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <div className="text-6xl mb-4 animate-pulse-slow">🛒</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Il tuo carrello è vuoto</h3>
        <p className="text-gray-500 text-sm">Aggiungi prodotti biologici per iniziare</p>
      </div>
    );
  }

  return (
    <div className="glass rounded-2xl p-6 interactive-card">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🛒</span>
        <h2 className="text-xl font-bold text-gray-800">Il tuo carrello</h2>
        <div className="ml-auto">
          <span className="glass text-sm px-3 py-1 rounded-full font-medium text-gray-700">
            {items.length} articoli
          </span>
        </div>
      </div>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="glass rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="font-semibold text-gray-800">{product.name}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {quantity} {product.unit} × {product.priceETH} ETH
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="font-bold text-primary">
                    {(parseFloat(product.priceETH) * quantity).toFixed(6)} ETH
                  </div>
                  <div className="text-xs text-gray-500">
                    ≈ ${(product.priceUSD * quantity).toFixed(2)} USD
                  </div>
                </div>
                <button
                  onClick={() => removeItem(product.id)}
                  className="w-8 h-8 rounded-full glass text-red-500 hover:bg-red-50 transition-colors flex items-center justify-center group"
                >
                  <span className="group-hover:scale-105 transition-transform">✕</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-gray-700">Totale:</span>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{getTotalETH()} ETH</div>
            <div className="text-sm text-gray-500">≈ ${getTotalUSD()} USD</div>
          </div>
        </div>

        <button
          onClick={() => navigate("/checkout")}
          className="w-full bio-gradient text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          Procedi al pagamento
        </button>

        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">🔒 Pagamento sicuro su blockchain Ethereum</p>
        </div>
      </div>
    </div>
  );
};
