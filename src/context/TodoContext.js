import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useState } from 'react';
import { createTodo, deleteTodo as apiDeleteTodo, fetchTodos, updateTodo, } from '../api/todosApi';
const ThemeContext = createContext(undefined);
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');
    return (_jsx(ThemeContext.Provider, { value: { theme, setTheme }, children: children }));
}
export function useTheme() {
    const ctx = useContext(ThemeContext);
    if (ctx === undefined)
        throw new Error('useTheme must be used within a ThemeProvider');
    return ctx;
}
// ── Todo Context ───────────────────────────────────────────────
function dtoToTodo(dto) {
    return {
        ...dto,
        createdAt: new Date(dto.createdAt),
        dueDate: new Date(dto.dueDate),
    };
}
const TodoContext = createContext(undefined);
export function TodoProvider({ children, userId }) {
    const effectiveUserId = userId ?? 'guest';
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        setIsLoading(true);
        setError(null);
        fetchTodos(effectiveUserId)
            .then((dtos) => setTodos(dtos.map(dtoToTodo)))
            .catch((e) => setError(e.message))
            .finally(() => setIsLoading(false));
    }, [effectiveUserId]);
    async function addTodo(title, priority, dueDate) {
        const dto = await createTodo({
            userId: effectiveUserId,
            title,
            priority,
            completed: false,
            createdAt: new Date().toISOString(),
            dueDate: dueDate.toISOString(),
        });
        setTodos((prev) => [dtoToTodo(dto), ...prev]);
    }
    async function toggleTodo(id) {
        const todo = todos.find((t) => t.id === id);
        if (!todo)
            return;
        const dto = await updateTodo(id, { completed: !todo.completed });
        setTodos((prev) => prev.map((t) => (t.id === id ? dtoToTodo(dto) : t)));
    }
    async function deleteTodo(id) {
        await apiDeleteTodo(id);
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }
    async function editTodo(id, title, priority, dueDate) {
        const dto = await updateTodo(id, {
            title,
            priority,
            dueDate: dueDate.toISOString(),
        });
        setTodos((prev) => prev.map((t) => (t.id === id ? dtoToTodo(dto) : t)));
    }
    return (_jsx(TodoContext.Provider, { value: { todos, isLoading, error, addTodo, toggleTodo, deleteTodo, editTodo }, children: children }));
}
export function useTodoContext() {
    const ctx = useContext(TodoContext);
    if (ctx === undefined)
        throw new Error('useTodoContext must be used within TodoProvider');
    return ctx;
}
