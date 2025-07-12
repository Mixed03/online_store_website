// lib/cartStore.ts
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Import persist and createJSONStorage

type CartItem = {
  id: string;
  name: string;
  image: string;
  color: string;
  size: string;
  quantity: number;
  price: number;
};

type Store = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

export const useCartStore = create<Store>()( // Use the new syntax for create with middleware
  persist(
    (set) => ({
      cart: [],
      addToCart: (item) =>
        set((state) => {
          const exists = state.cart.find(
            (i) => i.id === item.id && i.color === item.color && i.size === item.size
          );
          if (exists) {
            return {
              cart: state.cart.map((i) =>
                i.id === item.id && i.color === item.color && i.size === item.size
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { cart: [...state.cart, item] };
        }),
      removeFromCart: (id) =>
        set((state) => ({ cart: state.cart.filter((i) => i.id !== id) })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((i) => (i.id === id ? { ...i, quantity } : i)),
        })),
    }),
    {
      name: "cart-storage", // unique name for the storage key
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
