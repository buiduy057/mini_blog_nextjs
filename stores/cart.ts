import { create } from "zustand";
interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface CartState {
  cart: CartItem[];
  setCart: (items: CartItem[]) => void;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  setCart: (items: CartItem[]) => set({ cart: items }),
  addItem: (item) =>
    set((state) => {
      const exists = state.cart.find((i) => i.id === item.id);
      if (exists) {
        return {
          cart: state.cart.map((i) =>
            i.id === item.id ? { ...i, qty: i.qty + 1 } : i
          ),
        };
      }
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),

  removeItem: (id) =>
    set((state) => ({
      cart: state.cart.filter((x) => x.id !== id),
    })),

  increase: (id) =>
    set((state) => ({
      cart: state.cart.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x)),
    })),

  decrease: (id) =>
    set((state) => ({
      cart: state.cart.map((x) =>
        x.id === id && x.qty > 1 ? { ...x, qty: x.qty - 1 } : x
      ),
    })),

  totalPrice: () => {
    const cart = get().cart;
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  },
}));
