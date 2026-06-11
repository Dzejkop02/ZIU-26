import type { Priority, Todo } from '../types/todo.types';

const STORAGE_KEY = 'msw-todos';

interface RawTodo extends Omit<Todo, 'createdAt' | 'dueDate'> {
  createdAt: string;
  dueDate: string;
}

function load(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getSeeds();
    const parsed = JSON.parse(raw) as RawTodo[];
    return parsed.map((t) => ({
      ...t,
      createdAt: new Date(t.createdAt),
      dueDate: new Date(t.dueDate),
    }));
  } catch {
    return getSeeds();
  }
}

function getSeeds(): Todo[] {
  return [
    {
      id: 'seed-1',
      userId: 'guest',
      title: 'Zapoznać się z projektem',
      completed: true,
      priority: 'low' as Priority,
      createdAt: new Date('2026-06-01T10:00:00.000Z'),
      dueDate: new Date('2026-06-10T00:00:00.000Z'),
    },
    {
      id: 'seed-2',
      userId: 'guest',
      title: 'Zaimplementować routing',
      completed: false,
      priority: 'high' as Priority,
      createdAt: new Date('2026-06-05T10:00:00.000Z'),
      dueDate: new Date('2026-06-20T00:00:00.000Z'),
    },
    {
      id: 'seed-3',
      userId: 'guest',
      title: 'Dodać integrację z MSW',
      completed: false,
      priority: 'medium' as Priority,
      createdAt: new Date('2026-06-06T10:00:00.000Z'),
      dueDate: new Date('2026-06-25T00:00:00.000Z'),
    },
  ];
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
