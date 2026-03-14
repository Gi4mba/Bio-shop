import React from "react";

interface Props {
  hasEnoughBalance: boolean;
  totalETH: string;
  error?: string;
}

export const CheckoutAlerts: React.FC<Props> = ({ hasEnoughBalance, totalETH, error }) => {
  return (
    <>
      {!hasEnoughBalance && (
        <div className="glass rounded-2xl p-6 mb-6 border border-red-200/50 bg-red-50/30 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">⚠️</span>
            <div>
              <p className="font-bold text-red-800">Saldo insufficiente</p>
              <p className="text-sm text-red-700">
                Hai bisogno di almeno {totalETH} ETH per completare l'acquisto. Ottieni ETH Sepolia
                gratuiti da un faucet.
              </p>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="glass rounded-2xl p-6 mb-6 border border-red-200/50 bg-red-50/30 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="text-2xl">❌</span>
            <div>
              <p className="font-bold text-red-800">Errore Transazione</p>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
