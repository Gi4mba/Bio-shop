import { create } from "zustand";
import type { Product } from "../types/Product";

// Tipo per item nel carrello
interface CartItem {
  product: Product;
  quantity: number; // Quantità in kg/litri
}

// Tipo dello store
interface CartStore {
  items: CartItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalETH: () => string;
  getTotalUSD: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  addItem: (product, quantity) => {
    const items = get().items;
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      set({
        items: items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        ),
      });
    } else {
      // Aggiungi nuovo item
      set({ items: [...items, { product, quantity }] });
    }
  },

  removeItem: (productId) => {
    set({ items: get().items.filter((item) => item.product.id !== productId) });
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    });
  },

  clearCart: () => set({ items: [] }),

  getTotalETH: () => {
    const total = get().items.reduce((sum, item) => {
      return sum + parseFloat(item.product.priceETH) * item.quantity;
    }, 0);
    return total.toFixed(6); // 6 decimali per ETH
  },

  getTotalUSD: () => {
    return get().items.reduce((sum, item) => {
      return sum + item.product.priceUSD * item.quantity;
    }, 0);
  },
}));
