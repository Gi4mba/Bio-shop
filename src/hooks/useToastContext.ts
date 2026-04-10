import { useContext } from "react";
import { ToastContext } from "../context/toastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve essere usato dentro ToastProvider");
  }
  return context;
};
