'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from 'react';

/* ============================================
   Types
   ============================================ */

export type WishlistItem = {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
};

type WishlistContextValue = {
  items: WishlistItem[];
  addItem: (item: WishlistItem) => void;
  removeItem: (id: string) => void;
  hasItem: (id: string) => boolean;
  clearWishlist: () => void;
  itemCount: number;
};

/* ============================================
   Context
   ============================================ */

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

/* ============================================
   Provider
   ============================================ */

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const addItem = useCallback((newItem: WishlistItem) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === newItem.id)) return prev;
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const hasItem = useCallback(
    (id: string) => items.some((item) => item.id === id),
    [items]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
  }, []);

  const itemCount = items.length;

  const value = useMemo<WishlistContextValue>(
    () => ({ items, addItem, removeItem, hasItem, clearWishlist, itemCount }),
    [items, addItem, removeItem, hasItem, clearWishlist, itemCount]
  );

  return (
    <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
  );
}

/* ============================================
   Hook
   ============================================ */

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);

  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  return context;
}
