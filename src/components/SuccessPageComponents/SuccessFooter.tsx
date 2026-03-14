import React from "react";
import { useNavigate } from "react-router-dom";

export const SuccessFooter: React.FC = () => {
  const navigate = useNavigate();

  const handleReturn = () => {
    sessionStorage.removeItem("lastOrder");
    navigate("/");
  };

  return (
    <>
      <button
        onClick={handleReturn}
        className="w-full bio-gradient text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 interactive-card"
      >
        🌿 Torna al Catalogo
      </button>

      <div className="mt-8 text-center">
        <div className="glass rounded-2xl p-6 inline-block">
          <div
            className="flex items-center justify-center
           gap-2 mb-2"
          >
            <span className="text-xl">🔒</span>
            <h4 className="font-semibold text-gray-800">Transazione Sicura</h4>
          </div>
          <p className="text-sm text-gray-600">
            La transazione è registrata permanentemente sulla blockchain Ethereum
          </p>
          <div className="flex justify-center gap-2 mt-3">
            <div className="glass rounded-full px-3 py-1 text-xs font-medium text-gray-700">
              ⛡️ Immutabile
            </div>
            <div className="glass rounded-full px-3 py-1 text-xs font-medium text-gray-700">
              🔍 Tracciabile
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
