import { http, HttpResponse } from 'msw';
import type { Todo } from '../types/todo.types';
import { db } from './db';

interface RawTodo extends Omit<Todo, 'createdAt' | 'dueDate'> {
  createdAt: string;
  dueDate: string;
}

function todoToDTO(todo: Todo): RawTodo {
  return {
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    dueDate: todo.dueDate.toISOString(),
  };
}

export const handlers = [
  http.get('/api/todos', ({ request }) => {
    const userId = new URL(request.url).searchParams.get('userId') ?? 'guest';
    return HttpResponse.json(db.getAll(userId).map(todoToDTO));
  }),

  http.post('/api/todos', async ({ request }) => {
    const body = (await request.json()) as RawTodo;
    const todo: Todo = {
      ...body,
      id: crypto.randomUUID(),
      createdAt: new Date(body.createdAt),
      dueDate: new Date(body.dueDate),
    };
    const created = db.add(todo);
    return HttpResponse.json(todoToDTO(created), { status: 201 });
  }),

  http.patch('/api/todos/:id', async ({ params, request }) => {
    const patch = (await request.json()) as Partial<RawTodo>;
    const { createdAt: rawCreatedAt, dueDate: rawDueDate, ...rest } = patch;
    const parsed: Partial<Todo> = {
      ...rest,
      ...(rawCreatedAt ? { createdAt: new Date(rawCreatedAt) } : {}),
      ...(rawDueDate ? { dueDate: new Date(rawDueDate) } : {}),
    };
    const updated = db.update(params.id as string, parsed);
    return HttpResponse.json(todoToDTO(updated));
  }),

  http.delete('/api/todos/:id', ({ params }) => {
    db.remove(params.id as string);
    return new HttpResponse(null, { status: 204 });
  }),
];
