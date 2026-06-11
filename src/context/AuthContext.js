import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const AuthContext = createContext(undefined);
function loadAccounts() {
    try {
        return JSON.parse(localStorage.getItem('accounts') ?? '[]');
    }
    catch {
        return [];
    }
}
function loadSession() {
    try {
        const raw = localStorage.getItem('auth-session');
        return raw ? JSON.parse(raw) : null;
    }
    catch {
        return null;
    }
}
function saveSession(user) {
    localStorage.setItem('auth-session', JSON.stringify(user));
}
export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(loadSession);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    function clearError() {
        setError(null);
    }
    async function register(data) {
        setIsLoading(true);
        setError(null);
        try {
            const accounts = loadAccounts();
            if (accounts.some((a) => a.email.toLowerCase() === data.email.toLowerCase())) {
                throw { status: 409 };
            }
            const account = { id: crypto.randomUUID(), ...data };
            localStorage.setItem('accounts', JSON.stringify([...accounts, account]));
            const user = { id: account.id, firstName: account.firstName, lastName: account.lastName, email: account.email };
            saveSession(user);
            setCurrentUser(user);
        }
        catch (err) {
            const status = err.status;
            if (status === 409)
                throw err;
            setError('Błąd rejestracji, spróbuj ponownie');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }
    async function login(email, password) {
        setIsLoading(true);
        setError(null);
        try {
            const accounts = loadAccounts();
            const account = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
            if (!account)
                throw new Error('no-account');
            if (account.password !== password)
                throw new Error('wrong-password');
            const user = { id: account.id, firstName: account.firstName, lastName: account.lastName, email: account.email };
            saveSession(user);
            setCurrentUser(user);
        }
        catch (err) {
            const msg = err.message;
            if (msg === 'no-account')
                setError('Nie znaleziono konta z tym adresem e-mail');
            else if (msg === 'wrong-password')
                setError('Nieprawidłowe hasło');
            else
                setError('Wystąpił błąd, spróbuj ponownie');
            throw err;
        }
        finally {
            setIsLoading(false);
        }
    }
    function logout() {
        localStorage.removeItem('auth-session');
        setCurrentUser(null);
    }
    function updateUser(updates) {
        if (!currentUser)
            return;
        const accounts = loadAccounts();
        const updated = accounts.map((a) => a.id === currentUser.id ? { ...a, ...updates } : a);
        localStorage.setItem('accounts', JSON.stringify(updated));
        const newUser = { ...currentUser, ...updates };
        saveSession(newUser);
        setCurrentUser(newUser);
    }
    return (_jsx(AuthContext.Provider, { value: { currentUser, isLoading, error, register, login, logout, updateUser, clearError }, children: children }));
}
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (ctx === undefined)
        throw new Error('useAuth must be used within an AuthProvider');
    return ctx;
}
