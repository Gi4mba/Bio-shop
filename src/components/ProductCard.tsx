import React, { useState, memo } from "react";
import type { Product } from "../types/Product";
import { getIPFSUrl } from "../data/products";
import { useCartStore } from "../store/cartStore";
import { useConnection } from "wagmi";
import { useToast } from "../hooks/useToastContext";

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = memo(({ product }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdding, setIsAdding] = useState(false);
  const addItem = useCartStore((state) => state.addItem);
  const { isConnected } = useConnection();
  const { showWalletWarning } = useToast();

  const handleAddToCart = async () => {
    if (!isConnected) {
      showWalletWarning();
      return;
    }

    // Simula un delay di 600ms per mostrare l'animazione
    setIsAdding(true);
    addItem(product, quantity);
    setQuantity(1);
    setTimeout(() => setIsAdding(false), 600);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden interactive-card group animate-slide-up">
      <div className="relative overflow-hidden">
        <img
          src={getIPFSUrl(product.imageIPFS)}
          alt={product.name}
          className="w-full h-100 object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="glass text-black text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
            {product.category}
          </span>
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 pointer-events-none"></div>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{product.description}</p>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <div className="text-2xl font-bold text-primary">{product.priceETH} ETH</div>
            <div className="text-xs text-gray-500">
              ≈ ${product.priceUSD} USD/{product.unit}
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          <div className="flex items-center gap-2 glass rounded-lg px-3 py-2">
            <input
              type="number"
              min="0.5"
              step="0.5"
              value={quantity}
              onChange={(e) => setQuantity(parseFloat(e.target.value))}
              className="w-16 bg-transparent text-center font-medium focus:outline-none"
            />
            <span className="text-sm text-gray-600">{product.unit}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={isAdding}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all duration-300 ${
              isAdding
                ? "bg-green-500 text-white scale-95"
                : isConnected
                  ? "bio-gradient text-white hover:shadow-lg hover:scale-105 cursor-pointer"
                  : "bg-gray-300 text-gray-500 cursor-pointer hover:bg-gray-400"
            }`}
          >
            {isAdding ? (
              <span className="flex items-center justify-center gap-2">
                <span className="animate-pulse">✓</span>
                Aggiunto!
              </span>
            ) : (
              "Aggiungi al carrello"
            )}
          </button>
        </div>
      </div>
    </div>
  );
});
