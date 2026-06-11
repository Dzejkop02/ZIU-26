import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function TodoListTailwind({ todos, onToggle, onDelete, filter }) {
    const filtered = todos.filter((t) => {
        if (filter === 'active')
            return !t.completed;
        if (filter === 'completed')
            return t.completed;
        return true;
    });
    if (filtered.length === 0) {
        return (_jsx("p", { className: "text-center text-sm text-gray-400 py-10", children: "Brak zada\u0144" }));
    }
    return (_jsx("ul", { className: "divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden", children: filtered.map((todo) => (_jsxs("li", { className: `flex items-center gap-3 px-4 py-3 ${todo.completed ? 'bg-gray-50' : 'bg-white'}`, children: [_jsx("input", { type: "checkbox", className: "w-4 h-4 accent-brand-500 cursor-pointer flex-shrink-0", checked: todo.completed, onChange: () => onToggle(todo.id) }), _jsx("span", { className: `flex-1 text-sm ${todo.completed ? 'line-through text-gray-400' : 'text-gray-800'}`, children: todo.title }), _jsx("span", { className: "text-xs text-gray-400 flex-shrink-0", children: todo.dueDate.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' }) }), _jsx("button", { className: "ml-auto text-red-400 hover:text-red-600 text-sm transition-colors flex-shrink-0", onClick: () => onDelete(todo.id), title: "Usu\u0144", children: "\u00D7" })] }, todo.id))) }));
}
