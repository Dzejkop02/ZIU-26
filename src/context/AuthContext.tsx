import { createContext, useContext, useState } from 'react';
import type { Account, User } from '../types/auth.types';

interface AuthContextType {
  currentUser: User | null;
  isLoading: boolean;
  error: string | null;
  register: (data: { firstName: string; lastName: string; email: string; password: string }) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<Pick<User, 'firstName' | 'lastName'>>) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function loadAccounts(): Account[] {
  try {
    return JSON.parse(localStorage.getItem('accounts') ?? '[]');
  } catch { return []; }
}

function loadSession(): User | null {
  try {
    const raw = localStorage.getItem('auth-session');
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function saveSession(user: User) {
  localStorage.setItem('auth-session', JSON.stringify(user));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(loadSession);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function clearError() {
    setError(null);
  }

  async function register(data: { firstName: string; lastName: string; email: string; password: string }) {
    setIsLoading(true);
    setError(null);
    try {
      const accounts = loadAccounts();
      if (accounts.some((a) => a.email.toLowerCase() === data.email.toLowerCase())) {
        throw { status: 409 };
      }
      const account: Account = { id: crypto.randomUUID(), ...data };
      localStorage.setItem('accounts', JSON.stringify([...accounts, account]));
      const user: User = { id: account.id, firstName: account.firstName, lastName: account.lastName, email: account.email };
      saveSession(user);
      setCurrentUser(user);
    } catch (err) {
      const status = (err as { status?: number }).status;
      if (status === 409) throw err;
      setError('Błąd rejestracji, spróbuj ponownie');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);
    try {
      const accounts = loadAccounts();
      const account = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
      if (!account) throw new Error('no-account');
      if (account.password !== password) throw new Error('wrong-password');
      const user: User = { id: account.id, firstName: account.firstName, lastName: account.lastName, email: account.email };
      saveSession(user);
      setCurrentUser(user);
    } catch (err) {
      const msg = (err as Error).message;
      if (msg === 'no-account') setError('Nie znaleziono konta z tym adresem e-mail');
      else if (msg === 'wrong-password') setError('Nieprawidłowe hasło');
      else setError('Wystąpił błąd, spróbuj ponownie');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem('auth-session');
    setCurrentUser(null);
  }

  function updateUser(updates: Partial<Pick<User, 'firstName' | 'lastName'>>) {
    if (!currentUser) return;
    const accounts = loadAccounts();
    const updated = accounts.map((a) => a.id === currentUser.id ? { ...a, ...updates } : a);
    localStorage.setItem('accounts', JSON.stringify(updated));
    const newUser = { ...currentUser, ...updates };
    saveSession(newUser);
    setCurrentUser(newUser);
  }

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, error, register, login, logout, updateUser, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
