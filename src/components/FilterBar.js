import { jsx as _jsx } from "react/jsx-runtime";
import './FilterBar.css';
const FILTERS = [
    { value: 'all', label: 'Wszystko' },
    { value: 'active', label: 'Aktywne' },
    { value: 'completed', label: 'Ukończone' },
];
export function FilterBar({ activeFilter, onFilterChange }) {
    return (_jsx("nav", { "aria-label": "Filtrowanie zada\u0144", className: "filter-bar", children: FILTERS.map(({ value, label }) => (_jsx("button", { className: `filter-bar__btn${activeFilter === value ? ' filter-bar__btn--active' : ''}`, onClick: () => onFilterChange(value), "aria-pressed": activeFilter === value, children: label }, value))) }));
}
