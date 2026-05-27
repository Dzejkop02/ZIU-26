import { createContext, useContext, type ReactNode } from 'react';
import { useToast, type Toast, type ToastType } from '../hooks/useToast';

interface ToastContextValue {
  toasts: Toast[];
  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const value = useToast();
  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>;
}

export function useToastContext(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToastContext musi być użyty wewnątrz <ToastProvider>');
  return ctx;
}
