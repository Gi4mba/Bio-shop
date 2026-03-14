import React from "react";
import { useNavigate } from "react-router-dom";
import { SEPOLIA_EXPLORER } from "../../config/constants";

interface Props {
  isProcessing: boolean;
  hasEnoughBalance: boolean;
  totalETH: string;
  txHash: string | undefined;
  onPayment: () => void;
}

export const CheckoutActions: React.FC<Props> = ({
  isProcessing,
  hasEnoughBalance,
  totalETH,
  txHash,
  onPayment,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4">
        <button
          onClick={() => navigate("/")}
          disabled={isProcessing}
          className="flex-1 glass text-gray-700 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 disabled:opacity-50 interactive-card"
        >
          ← Torna al Catalogo
        </button>

        <button
          onClick={onPayment}
          disabled={isProcessing || !hasEnoughBalance}
          className={`flex-1 py-4 rounded-xl font-bold transition-all duration-300 interactive-card ${
            isProcessing
              ? "bg-gray-400 text-white scale-95 cursor-not-allowed"
              : hasEnoughBalance
                ? "bio-gradient text-white hover:shadow-lg hover:scale-105"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Elaborazione del Pagamento...
            </span>
          ) : hasEnoughBalance ? (
            `Paga ${totalETH} ETH`
          ) : (
            "Saldo insufficiente"
          )}
        </button>
      </div>

      {isProcessing && (
        <div className="glass rounded-2xl p-6 border border-blue-200/50 bg-blue-50/30 animate-slide-up">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-pulse">🔄</span>
            <div>
              <p className="font-bold text-blue-800">Transazione in corso...</p>
              <p className="text-sm text-blue-700 mt-1">
                Conferma la transazione nel tuo wallet e attendi la conferma sulla blockchain.
                Questo può richiedere alcuni secondi.
              </p>
              {txHash && (
                <a
                  href={`${SEPOLIA_EXPLORER}/tx/${txHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm underline mt-2 inline-block text-primary hover:text-primary/80 transition-colors"
                >
                  Visualizza su Etherscan →
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
