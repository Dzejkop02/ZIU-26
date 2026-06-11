import type { FilterType } from '../types/todo.types';
import './FilterBar.css';

interface FilterBarProps {
  activeFilter: FilterType;
  onFilterChange: (f: FilterType) => void;
}

const FILTERS: { value: FilterType; label: string }[] = [
  { value: 'all', label: 'Wszystko' },
  { value: 'active', label: 'Aktywne' },
  { value: 'completed', label: 'Ukończone' },
];

export function FilterBar({ activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <nav aria-label="Filtrowanie zadań" className="filter-bar">
      {FILTERS.map(({ value, label }) => (
        <button
          key={value}
          className={`filter-bar__btn${activeFilter === value ? ' filter-bar__btn--active' : ''}`}
          onClick={() => onFilterChange(value)}
          aria-pressed={activeFilter === value}
        >
          {label}
        </button>
      ))}
    </nav>
  );
}
