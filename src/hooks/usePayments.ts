import { useState, useCallback, useEffect } from "react";
import { useSendTransaction, useWaitForTransactionReceipt } from "wagmi";
import { parseEther } from "viem";
import { GIANNI_WALLET_ADDRESS } from "../config/constants";

export interface PaymentResult {
  success: boolean;
  txHash?: string;
  error?: string;
}

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<PaymentResult | null>(null);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);

  const sendTransactionMutation = useSendTransaction();
  const { error: sendError } = sendTransactionMutation;

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  /**
   * Invia il pagamento
   * @param amountETH - Importo in ETH (es: "0.015")
   */
  const sendPayment = useCallback(
    async (amountETH: string) => {
      setIsProcessing(true);
      setResult(null);

      try {
        // Conversione ETH in Wei (1 ETH = 10^18 Wei)
        const amountWei = parseEther(amountETH);

        const data = await sendTransactionMutation.mutateAsync({
          to: GIANNI_WALLET_ADDRESS,
          value: amountWei,
        });

        // Controllo per estrazione dell'hash dall stringa o dall'oggetto
        if (typeof data === "string") {
          setTxHash(data as `0x${string}`);
        } else if (
          data &&
          typeof data === "object" &&
          typeof (data as unknown as Record<string, unknown>).hash === "string"
        ) {
          const h = (data as unknown as Record<string, string>).hash;
          if (h.startsWith("0x")) setTxHash(h as `0x${string}`);
        }
      } catch (error) {
        console.error("Errore invio pagamento:", error);
        setResult({
          success: false,
          error: error instanceof Error ? error.message : "Impossibile processare il pagamento. Riprova più tardi",
        });
        setIsProcessing(false);
      }
    },
    [sendTransactionMutation],
  );

  // Aggiorna il risultato quando la transazione è confermata
  useEffect(() => {
    if (isSuccess && txHash && isProcessing) {
      // Differimento aggiornamenti di stato per evitare cascading-renders
      setTimeout(() => {
        setResult({
          success: true,
          txHash,
        });
        setIsProcessing(false);
      }, 20);
    }
  }, [isSuccess, txHash, isProcessing]);

  // Gestisci errori di invio
  useEffect(() => {
    if (sendError && isProcessing) {
      setTimeout(() => {
        setResult({
          success: false,
          error: sendError.message,
        });
        setIsProcessing(false);
      }, 20);
    }
  }, [sendError, isProcessing]);

  return {
    sendPayment,
    isProcessing: isProcessing || isConfirming,
    result,
    txHash,
  };
};
