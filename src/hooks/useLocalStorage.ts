import { useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (v: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  function setValue(value: T) {
    setStoredValue(value);
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // quota exceeded or private browsing — ignore
    }
  }

  return [storedValue, setValue];
}
