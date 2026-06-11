import { useState } from 'react';
export function useLocalStorage(key, initialValue) {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = localStorage.getItem(key);
            return item !== null ? JSON.parse(item) : initialValue;
        }
        catch {
            return initialValue;
        }
    });
    function setValue(value) {
        setStoredValue(value);
        try {
            localStorage.setItem(key, JSON.stringify(value));
        }
        catch {
            // quota exceeded or private browsing — ignore
        }
    }
    return [storedValue, setValue];
}
