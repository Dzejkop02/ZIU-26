import { useState, useEffect, useRef } from 'react';
import { plausible } from '../analytics.ts';

interface Props {
  onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: Props) {
  const [value, setValue] = useState('');
  // stepRef śledzi postęp wypełniania: 'idle' → 'typing' → 'submitted'
  const stepRef = useRef<'idle' | 'typing' | 'submitted'>('idle');

  const handleChange = (v: string) => {
    setValue(v);
    if (v.length > 0 && stepRef.current === 'idle') {
      stepRef.current = 'typing';
    }
    if (v.length === 0) {
      stepRef.current = 'idle';
    }
    // Live search — wyniki odświeżają się na bieżąco (obsługa debounce po stronie rodzica)
    onSearch(v);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    stepRef.current = 'submitted';
    // RODO: Śledzimy fakt wysłania formularza BEZ treści wpisanej przez użytkownika.
    // Cel: pomiar aktywnego użycia wyszukiwarki. Zasada minimalizacji art. 5 RODO.
    plausible.trackEvent('Form Submit', { props: { form_type: 'search' } });
    onSearch(value);
  };

  useEffect(() => {
    return () => {
      // RODO: Zbieramy numer kroku porzucenia bez danych osobowych.
      // Cel: poprawa UX formularza — wykrycie gdzie użytkownicy rezygnują.
      // Zasada minimalizacji art. 5 RODO — brak treści wyszukiwania.
      if (stepRef.current === 'typing') {
        plausible.trackEvent('Form Abandoned', { props: { last_step: stepRef.current } });
      }
    };
  }, []);

  return (
    <form className="search-form" onSubmit={handleSubmit} role="search">
      <div className="search-bar">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Szukaj filmów... (min. 2 znaki)"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          aria-label="Wyszukiwarka filmów"
        />
        {value && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => handleChange('')}
            aria-label="Wyczyść"
          >
            ✕
          </button>
        )}
      </div>
      <button type="submit" className="search-submit-btn">
        Szukaj
      </button>
    </form>
  );
}
