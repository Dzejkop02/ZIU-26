const BASE = '/api';

export interface TodoDTO {
  id: string;
  userId: string;
  title: string;
  completed: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}

export async function fetchTodos(userId: string): Promise<TodoDTO[]> {
  const res = await fetch(`${BASE}/todos?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error('Błąd pobierania zadań');
  return res.json() as Promise<TodoDTO[]>;
}

export async function createTodo(dto: Omit<TodoDTO, 'id'>): Promise<TodoDTO> {
  const res = await fetch(`${BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dto),
  });
  if (!res.ok) throw new Error('Błąd dodawania zadania');
  return res.json() as Promise<TodoDTO>;
}

export async function updateTodo(id: string, patch: Partial<Omit<TodoDTO, 'id'>>): Promise<TodoDTO> {
  const res = await fetch(`${BASE}/todos/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) throw new Error('Błąd aktualizacji zadania');
  return res.json() as Promise<TodoDTO>;
}

export async function deleteTodo(id: string): Promise<void> {
  const res = await fetch(`${BASE}/todos/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Błąd usuwania zadania');
}
