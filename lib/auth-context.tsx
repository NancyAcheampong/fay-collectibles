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

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (
    firstName: string,
    lastName: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
};

/* ============================================
   Context
   ============================================ */

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ============================================
   Provider
   ============================================ */

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const signIn = useCallback(
    async (email: string, _password: string): Promise<{ success: boolean; error?: string }> => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      // Mock validation
      if (!email || !_password) {
        return { success: false, error: 'Please fill in all fields.' };
      }

      if (!email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address.' };
      }

      if (_password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters.' };
      }

      // Mock successful sign-in — derive name from email
      const namePart = email.split('@')[0];
      const firstName =
        namePart.charAt(0).toUpperCase() + namePart.slice(1).split(/[._-]/)[0];

      setUser({
        firstName,
        lastName: '',
        email,
      });

      return { success: true };
    },
    []
  );

  const signUp = useCallback(
    async (
      firstName: string,
      lastName: string,
      email: string,
      _password: string
    ): Promise<{ success: boolean; error?: string }> => {
      // Simulate network delay
      await new Promise((r) => setTimeout(r, 800));

      // Mock validation
      if (!firstName || !lastName || !email || !_password) {
        return { success: false, error: 'Please fill in all fields.' };
      }

      if (!email.includes('@')) {
        return { success: false, error: 'Please enter a valid email address.' };
      }

      if (_password.length < 8) {
        return { success: false, error: 'Password must be at least 8 characters.' };
      }

      // Mock successful registration
      setUser({ firstName, lastName, email });

      return { success: true };
    },
    []
  );

  const signOut = useCallback(() => {
    setUser(null);
  }, []);

  const isAuthenticated = user !== null;

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated, signIn, signUp, signOut }),
    [user, isAuthenticated, signIn, signUp, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* ============================================
   Hook
   ============================================ */

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
