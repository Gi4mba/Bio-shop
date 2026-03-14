import React from "react";
import { ProductCard } from "../components/ProductCard";
import { Cart } from "../components/Cart";
import { PRODUCTS } from "../data/products";
import { useConnection } from "wagmi";

export const CatalogPage: React.FC = () => {
  const { isConnected } = useConnection();

  return (
    <div className="container mx-auto px-4 py-8">
      {!isConnected && (
        <div className="rounded-2xl p-6 mb-8 border border-yellow-200/50 bg-yellow-100 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">⚠️</span>
            <div>
              <p className="font-bold text-yellow-800">Wallet non connesso</p>
              <p className="text-yellow-700">Connetti il tuo wallet Web3 per acquistare i prodotti</p>
            </div>
          </div>
        </div>
      )}

      <div className="text-center mb-12 animate-slide-up">
        <div className="inline-flex items-center gap-3 mb-4">
          <h1 className="text-5xl pb-3 font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Prodotti Biologici
          </h1>
        </div>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto animate-float">
          Dalla produzione di Gianni alla tua tavola, pagando con ETH
        </p>
        <div className="flex justify-center gap-4 mt-6">
          <div className="glass rounded-full px-4 py-2 text-sm font-medium text-gray-700">
            🚚 Spedizione gratuita sopra 50€
          </div>
          <div className="glass rounded-full px-4 py-2 text-sm font-medium text-gray-700">
            🔒 Pagamenti su blockchain
          </div>
        </div>
      </div>

      {/* Layout: Griglia prodotti + Carrello */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Griglia Prodotti (2 colonne su desktop) */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-800 pl-2">Catalogo</h2>
            <div className="glass rounded-full px-4 py-2 text-sm text-gray-600">
              {PRODUCTS.length} prodotti disponibili
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PRODUCTS.map((product, index) => (
              <div key={product.id} style={{ animationDelay: `${index * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Carrello laterale sticky */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <Cart />
          </div>
        </div>
      </div>

      <div className="mt-16 text-center">
        <div className="glass rounded-2xl p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-2xl">🔒</span>
            <h3 className="text-xl font-bold text-gray-800">Pagamenti Sicuri</h3>
          </div>
          <p className="text-gray-600 mb-2">
            Pagamenti tramite blockchain Ethereum - Sepolia Testnet
          </p>
          <p className="text-sm text-gray-500">
            Tutti i prezzi sono in ETH • Transazioni trasparenti e tracciabili
          </p>
        </div>
      </div>
    </div>
  );
};
