export type Priority = 'low' | 'medium' | 'high';

export interface Todo {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: Date;
  priority: Priority;
  dueDate: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export type TodoAction =
  | { type: 'ADD'; payload: { title: string; priority: Priority; dueDate: Date } }
  | { type: 'TOGGLE'; payload: string }
  | { type: 'DELETE'; payload: string }
  | { type: 'EDIT'; payload: { id: string; title: string; priority: Priority; dueDate: Date } };
