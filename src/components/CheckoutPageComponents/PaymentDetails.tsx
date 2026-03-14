import React from "react";
import { GIANNI_WALLET_ADDRESS } from "../../config/constants";
import { formatEther } from "viem";

interface Props {
  address: string | undefined;
  balance: { value: bigint } | undefined;
  hasEnoughBalance: boolean;
}

export const PaymentDetails: React.FC<Props> = ({ address, balance, hasEnoughBalance }) => {
  return (
    <div className="glass rounded-2xl p-6 mb-6 interactive-card animate-slide-up">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-2xl">💳</span>
        <h2 className="text-xl font-bold text-gray-800">Dettagli Pagamento</h2>
      </div>

      <div className="space-y-4 text-sm">
        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Dal tuo wallet:</span>
          <span className="font-mono text-sm bg-white/50 px-3 py-1 rounded-lg">
            {address?.slice(0, 10)}...{address?.slice(-8)}
          </span>
        </div>

        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Al wallet di Gianni:</span>
          <span className="font-mono text-sm bg-white/50 px-3 py-1 rounded-lg">
            {GIANNI_WALLET_ADDRESS.slice(0, 10)}...{GIANNI_WALLET_ADDRESS.slice(-8)}
          </span>
        </div>

        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Il tuo saldo:</span>
          <span
            className={`font-bold text-lg px-3 py-1 rounded-lg ${
              hasEnoughBalance ? "text-green-600 bg-green-50/50" : "text-red-600 bg-red-50/50"
            }`}
          >
            {balance ? parseFloat(formatEther(balance.value)).toFixed(4) : "0"} ETH
          </span>
        </div>

        <div className="glass rounded-lg p-4 flex justify-between items-center">
          <span className="text-gray-600 font-medium">Rete:</span>
          <span className="font-semibold bg-white/50 px-3 py-1 rounded-lg">
            Ethereum Sepolia Testnet
          </span>
        </div>
      </div>
    </div>
  );
};
