import React, { useState, type ReactNode } from "react";
import { ToastContext } from "./toastContext";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const showWalletWarning = () => {
    setIsVisible(true);
    setTimeout(() => setIsVisible(false), 2000);
  };

  return (
    <ToastContext.Provider value={{ showWalletWarning }}>
      {children}
      {isVisible && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-6 py-4 mt-4 rounded-xl shadow-lg shadow-black/25 flex items-center gap-3 animate-slide-down z-50 font-medium">
          <p className="drop-shadow-md">
            Connetti il wallet per aggiungere prodotti
          </p>
        </div>
      )}
    </ToastContext.Provider>
  );
};
