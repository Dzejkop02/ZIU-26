const BASE = '/api';
export async function fetchTodos(userId) {
    const res = await fetch(`${BASE}/todos?userId=${encodeURIComponent(userId)}`);
    if (!res.ok)
        throw new Error('Błąd pobierania zadań');
    return res.json();
}
export async function createTodo(dto) {
    const res = await fetch(`${BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dto),
    });
    if (!res.ok)
        throw new Error('Błąd dodawania zadania');
    return res.json();
}
export async function updateTodo(id, patch) {
    const res = await fetch(`${BASE}/todos/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patch),
    });
    if (!res.ok)
        throw new Error('Błąd aktualizacji zadania');
    return res.json();
}
export async function deleteTodo(id) {
    const res = await fetch(`${BASE}/todos/${id}`, { method: 'DELETE' });
    if (!res.ok)
        throw new Error('Błąd usuwania zadania');
}
