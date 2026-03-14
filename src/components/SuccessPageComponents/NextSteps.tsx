import React from "react";

export const NextSteps: React.FC = () => {
  return (
    <div className="glass rounded-2xl p-6 mb-6 border border-green-200/50 bg-green-50/30 animate-slide-up">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl animate-pulse">📦</span>
        <h3 className="font-bold text-green-800">Cosa succede ora?</h3>
      </div>
      <ul className="text-sm text-green-700 space-y-3">
        <li className="flex items-start gap-2">
          <span className="text-green-600 mt-1">✓</span>
          <span>Gianni ha ricevuto il pagamento sul suo wallet</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600 mt-1">✓</span>
          <span>Preparerà il tuo ordine con i prodotti freschi</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-green-600 mt-1">✓</span>
          <span>Riceverai una notifica per il ritiro o la consegna</span>
        </li>
      </ul>
    </div>
  );
};
