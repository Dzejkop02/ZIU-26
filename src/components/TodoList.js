import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TodoItem } from './TodoItem';
export function TodoList({ todos, onToggle, onDelete, onEdit, onSelect, filter }) {
    const filteredTodos = useMemo(() => {
        if (filter === 'active')
            return todos.filter((t) => !t.completed);
        if (filter === 'completed')
            return todos.filter((t) => t.completed);
        return todos;
    }, [todos, filter]);
    return (_jsxs(_Fragment, { children: [_jsx("div", { role: "status", "aria-atomic": "true", className: "visually-hidden", children: filteredTodos.length === 0
                    ? 'Brak zadań spełniających kryteria filtru'
                    : `Wyświetlono ${filteredTodos.length} zadań` }), filteredTodos.length === 0 ? (_jsx(Box, { sx: { py: 8, textAlign: 'center' }, children: _jsx(Typography, { color: "text.secondary", children: "Brak zada\u0144" }) })) : (_jsx(Box, { component: "ul", "aria-label": "Lista zada\u0144", sx: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                    gap: 'clamp(0.75rem, 2vw, 1.5rem)',
                    alignItems: 'start',
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                }, children: _jsx(AnimatePresence, { children: filteredTodos.map((todo) => (_jsx(motion.li, { initial: { opacity: 0, y: -12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, x: 48 }, transition: { duration: 0.22 }, style: { height: '100%' }, children: _jsx(TodoItem, { todo: todo, onToggle: onToggle, onDelete: onDelete, onEdit: onEdit, onSelect: onSelect }) }, todo.id))) }) }))] }));
}
