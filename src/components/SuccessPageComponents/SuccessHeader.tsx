import React from "react";

export const SuccessHeader: React.FC = () => {
  return (
    <div className="text-center mb-8 animate-slide-up">
      <div className="inline-flex items-center gap-4 mb-6">
        <div className="text-left">
          <h1 className="text-4xl font-bold bg-linear-to-r from-green-600 to-primary bg-clip-text text-transparent pb-4">
            Pagamento Completato!
          </h1>
          <p className="text-gray-600 text-lg mt-2">
            Grazie per aver acquistato i prodotti biologici di Gianni!
          </p>
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <div className="glass rounded-full px-4 py-2 text-sm font-medium text-gray-700">
          🌿 Prodotti Biologici
        </div>
        <div className="glass rounded-full px-4 py-2 text-sm font-medium text-gray-700">
          🔒 Transazione Sicura
        </div>
      </div>
    </div>
  );
};
