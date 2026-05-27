interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        placeholder="Szukaj filmów... (min. 2 znaki)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Wyszukiwarka filmów"
      />
      {value && (
        <button className="clear-btn" onClick={() => onChange('')} aria-label="Wyczyść">
          ✕
        </button>
      )}
    </div>
  );
}
