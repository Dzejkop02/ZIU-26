import { createContext, useContext, useEffect, useState } from 'react';
import {
  createTodo,
  deleteTodo as apiDeleteTodo,
  fetchTodos,
  updateTodo,
} from '../api/todosApi';
import type { TodoDTO } from '../api/todosApi';
import type { Priority, Todo } from '../types/todo.types';

// ── Theme Context ──────────────────────────────────────────────

interface ThemeContextType {
  theme: 'light' | 'dark';
  setTheme: (t: 'light' | 'dark') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}

// ── Todo Context ───────────────────────────────────────────────

function dtoToTodo(dto: TodoDTO): Todo {
  return {
    ...dto,
    createdAt: new Date(dto.createdAt),
    dueDate: new Date(dto.dueDate),
  };
}

interface TodoContextType {
  todos: Todo[];
  isLoading: boolean;
  error: string | null;
  addTodo: (title: string, priority: Priority, dueDate: Date) => Promise<void>;
  toggleTodo: (id: string) => Promise<void>;
  deleteTodo: (id: string) => Promise<void>;
  editTodo: (id: string, title: string, priority: Priority, dueDate: Date) => Promise<void>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children, userId }: { children: React.ReactNode; userId?: string }) {
  const effectiveUserId = userId ?? 'guest';
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetchTodos(effectiveUserId)
      .then((dtos) => setTodos(dtos.map(dtoToTodo)))
      .catch((e: Error) => setError(e.message))
      .finally(() => setIsLoading(false));
  }, [effectiveUserId]);

  async function addTodo(title: string, priority: Priority, dueDate: Date) {
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

  async function toggleTodo(id: string) {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;
    const dto = await updateTodo(id, { completed: !todo.completed });
    setTodos((prev) => prev.map((t) => (t.id === id ? dtoToTodo(dto) : t)));
  }

  async function deleteTodo(id: string) {
    await apiDeleteTodo(id);
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  async function editTodo(id: string, title: string, priority: Priority, dueDate: Date) {
    const dto = await updateTodo(id, {
      title,
      priority,
      dueDate: dueDate.toISOString(),
    });
    setTodos((prev) => prev.map((t) => (t.id === id ? dtoToTodo(dto) : t)));
  }

  return (
    <TodoContext.Provider value={{ todos, isLoading, error, addTodo, toggleTodo, deleteTodo, editTodo }}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext(): TodoContextType {
  const ctx = useContext(TodoContext);
  if (ctx === undefined) throw new Error('useTodoContext must be used within TodoProvider');
  return ctx;
}
