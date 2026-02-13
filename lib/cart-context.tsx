"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";

/* ============================================
   Types
   ============================================ */

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
  slug: string;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size: string) => void;
  updateQuantity: (id: string, size: string, quantity: number) => void;
  clearCart: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  itemCount: number;
  total: number;
};

/* ============================================
   Context
   ============================================ */

const CartContext = createContext<CartContextValue | undefined>(undefined);

/* ============================================
   Provider
   ============================================ */

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      // Check if the same product in the same size already exists
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size
      );

      if (existingIndex !== -1) {
        // Increment quantity of existing item
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + newItem.quantity,
        };
        return updated;
      }

      // Add as a new line item
      return [...prev, newItem];
    });

    // Open the cart drawer whenever an item is added
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string, size: string) => {
    setItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  }, []);

  const updateQuantity = useCallback(
    (id: string, size: string, quantity: number) => {
      if (quantity < 1) {
        // Remove the item entirely when quantity drops below 1
        removeItem(id, size);
        return;
      }

      setItems((prev) =>
        prev.map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const openCart = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCart = useCallback(() => {
    setIsOpen(false);
  }, []);

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      itemCount,
      total,
    }),
    [
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      isOpen,
      openCart,
      closeCart,
      itemCount,
      total,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/* ============================================
   Hook
   ============================================ */

export function useCart(): CartContextValue {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }

  return context;
}
