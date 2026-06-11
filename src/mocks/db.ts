import type { Todo } from '../types/todo.types';

const STORAGE_KEY = 'msw-todos';

interface RawTodo extends Omit<Todo, 'createdAt' | 'dueDate'> {
  createdAt: string;
  dueDate: string;
}

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as RawTodo[];
    return parsed.map((t) => ({
      ...t,
      createdAt: new Date(t.createdAt),
      dueDate: new Date(t.dueDate),
    }));
  } catch {
    return [];
  }
}

function save(todos: Todo[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

let todos: Todo[] = load();

export const db = {
  getAll: (userId: string) => todos.filter((t) => t.userId === userId),
  add: (todo: Todo) => {
    todos = [todo, ...todos];
    save(todos);
    return todo;
  },
  update: (id: string, patch: Partial<Todo>) => {
    todos = todos.map((t) => (t.id === id ? { ...t, ...patch } : t));
    save(todos);
    return todos.find((t) => t.id === id)!;
  },
  remove: (id: string) => {
    todos = todos.filter((t) => t.id !== id);
    save(todos);
  },
};
