import React from "react";
import type { OrderData } from "../shared/OrderTypes";
import { SEPOLIA_EXPLORER } from "../../config/constants";

interface Props {
  orderData: OrderData;
  orderDate: string;
}

export const TransactionDetails: React.FC<Props> = ({ orderData, orderDate }) => {
  return (
    <div className="glass rounded-2xl p-6 mb-6 interactive-card animate-slide-up">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">🔗</span>
        <h2 className="text-xl font-bold text-gray-800">Dettagli Transazione</h2>
      </div>

      <div className="space-y-4 text-sm">
        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Transaction Hash:</span>
          <a
            href={`${SEPOLIA_EXPLORER}/tx/${orderData.txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-primary hover:text-primary/80 transition-colors bg-white/50 px-3 py-1 rounded-lg"
          >
            {orderData.txHash.slice(0, 10)}...{orderData.txHash.slice(-8)}
          </a>
        </div>

        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Wallet Ricevente:</span>
          <a
            href={`${SEPOLIA_EXPLORER}/address/${orderData.recipientAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-primary hover:text-primary/80 transition-colors bg-white/50 px-3 py-1 rounded-lg"
          >
            {orderData.recipientAddress.slice(0, 10)}...{orderData.recipientAddress.slice(-8)}
          </a>
        </div>

        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Importo Totale:</span>
          <div className="text-right">
            <div className="font-bold text-lg text-primary">{orderData.totalETH} ETH</div>
            <div className="text-gray-500">≈ ${orderData.totalUSD} USD</div>
          </div>
        </div>

        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Data e Ora:</span>
          <span className="font-medium bg-white/50 px-3 py-1 rounded-lg">{orderDate}</span>
        </div>

        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Rete:</span>
          <span className="font-semibold bg-white/50 px-3 py-1 rounded-lg">Ethereum - Sepolia</span>
        </div>
      </div>

      <a
        href={`${SEPOLIA_EXPLORER}/tx/${orderData.txHash}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 block w-full bio-gradient text-white py-3 px-4 rounded-xl text-center font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 interactive-card"
      >
        Visualizza su Etherscan →
      </a>
    </div>
  );
};
