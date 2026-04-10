import { createContext } from "react";

export interface ToastContextType {
  showWalletWarning: () => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
