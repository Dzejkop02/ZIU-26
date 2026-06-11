import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
function todayString() {
    return new Date().toISOString().split('T')[0];
}
export function TodoInputTailwind({ onAdd }) {
    const [inputValue, setInputValue] = useState('');
    function handleKeyDown(e) {
        if (e.key === 'Enter')
            commit();
    }
    function commit() {
        const trimmed = inputValue.trim();
        if (!trimmed)
            return;
        onAdd(trimmed, 'low', new Date(todayString()));
        setInputValue('');
    }
    return (_jsxs("div", { className: "mb-6", children: [_jsx("h2", { className: "text-lg font-semibold text-gray-800 mb-2", children: "Dodaj nowe zadanie" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { className: "flex-1 px-4 py-2 text-sm border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent", value: inputValue, onChange: (e) => setInputValue(e.target.value), onKeyDown: handleKeyDown, placeholder: "Tytu\u0142 zadania..." }), _jsx("button", { className: "px-5 py-2 text-sm font-semibold text-white bg-brand-500 rounded-lg hover:bg-brand-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed", onClick: commit, disabled: !inputValue.trim(), children: "Dodaj" })] })] }));
}
