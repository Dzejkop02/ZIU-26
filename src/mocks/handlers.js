import { http, HttpResponse } from 'msw';
import { db } from './db';
function todoToDTO(todo) {
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
        const body = (await request.json());
        const todo = {
            ...body,
            id: crypto.randomUUID(),
            createdAt: new Date(body.createdAt),
            dueDate: new Date(body.dueDate),
        };
        const created = db.add(todo);
        return HttpResponse.json(todoToDTO(created), { status: 201 });
    }),
    http.patch('/api/todos/:id', async ({ params, request }) => {
        const patch = (await request.json());
        const { createdAt: rawCreatedAt, dueDate: rawDueDate, ...rest } = patch;
        const parsed = {
            ...rest,
            ...(rawCreatedAt ? { createdAt: new Date(rawCreatedAt) } : {}),
            ...(rawDueDate ? { dueDate: new Date(rawDueDate) } : {}),
        };
        const updated = db.update(params.id, parsed);
        return HttpResponse.json(todoToDTO(updated));
    }),
    http.delete('/api/todos/:id', ({ params }) => {
        db.remove(params.id);
        return new HttpResponse(null, { status: 204 });
    }),
];
