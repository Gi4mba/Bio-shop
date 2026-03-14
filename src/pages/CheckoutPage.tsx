import React, { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useConnection, useBalance } from "wagmi";
import { useCartStore } from "../store/cartStore";
import { usePayment } from "../../src/hooks/usePayments";
import { GIANNI_WALLET_ADDRESS } from "../config/constants";
import { formatEther } from "viem";
import { OrderReview } from "../components/CheckoutPageComponents/OrderReview";
import { PaymentDetails } from "../components/CheckoutPageComponents/PaymentDetails";
import { CheckoutAlerts } from "../components/CheckoutPageComponents/CheckoutAlerts";
import { CheckoutActions } from "../components/CheckoutPageComponents/CheckoutActions";

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { address, isConnected } = useConnection();
  const { data: balance } = useBalance({ address });

  const { items, getTotalETH, getTotalUSD, clearCart } = useCartStore();
  const { sendPayment, isProcessing, result, txHash } = usePayment();

  const totalETH = getTotalETH();
  const totalUSD = getTotalUSD();

  const hasEnoughBalance = useMemo(() => {
    return balance ? parseFloat(formatEther(balance.value)) >= parseFloat(totalETH) : false;
  }, [balance, totalETH]);

  useEffect(() => {
    // Evita redirect se lo svuotamento del carrello è successivo ad
    // una transazione successful
    if (items.length === 0 && !result?.success) {
      navigate("/");
    }
  }, [items.length, navigate, result?.success]);

  useEffect(() => {
    if (!isConnected) {
      navigate("/");
    }
  }, [isConnected, navigate]);

  const handledTxRef = useRef<string | null>(null);

  useEffect(() => {
    // Esegui solo quando la transazione diventa success e c'è txHash.
    // Usiamo handledTxRef per evitare side-effect ripetuti se `items`
    // o altri valori cambiano dopo lo svuotamento del carrello.
    if (result?.success && txHash && handledTxRef.current !== txHash) {
      handledTxRef.current = txHash;

      const orderSnapshot = JSON.stringify({
        items,
        totalETH,
        totalUSD,
        txHash,
        recipientAddress: GIANNI_WALLET_ADDRESS,
        timestamp: Date.now(),
      });

      sessionStorage.setItem("lastOrder", orderSnapshot);

      clearCart();
      navigate("/success");
    }
  }, [result?.success, txHash, clearCart, navigate, items, totalETH, totalUSD]);

  const handlePayment = () => {
    sendPayment(totalETH);
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8 animate-slide-up">
        <div className="inline-flex items-center gap-3 mb-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Conferma Ordine
          </h1>
        </div>
        <p className="text-gray-600">Rivedi i dettagli e completa il pagamento</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <OrderReview items={items} totalETH={totalETH} totalUSD={totalUSD} />
          <PaymentDetails address={address} balance={balance} hasEnoughBalance={hasEnoughBalance} />
        </div>
        
        <div className="space-y-6">
          <CheckoutAlerts
            hasEnoughBalance={hasEnoughBalance}
            totalETH={totalETH}
            error={result?.error}
          />
          
          <CheckoutActions
            isProcessing={isProcessing}
            hasEnoughBalance={hasEnoughBalance}
            totalETH={totalETH}
            txHash={txHash}
            onPayment={handlePayment}
          />
        </div>
      </div>
    </div>
  );
};
