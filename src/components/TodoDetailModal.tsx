import { useState } from 'react';
import type { Priority, Todo } from '../types/todo.types';
import { FocusTrap } from './FocusTrap';

interface Props {
  todo: Todo;
  onClose: () => void;
  onEdit: (id: string, title: string, priority: Priority, dueDate: Date) => void;
  onDelete: (id: string) => void;
}

const priorityLabel: Record<Priority, string> = {
  low: 'Niski',
  medium: 'Średni',
  high: 'Wysoki',
};

function formatDate(date: Date): string {
  return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function toInputDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function TodoDetailModal({ todo, onClose, onEdit, onDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [priority, setPriority] = useState<Priority>(todo.priority);
  const [dueDate, setDueDate] = useState(toInputDate(todo.dueDate));
  const [titleError, setTitleError] = useState(false);

  function handleSave() {
    if (!title.trim()) {
      setTitleError(true);
      return;
    }
    setTitleError(false);
    onEdit(todo.id, title.trim(), priority, new Date(dueDate));
    setIsEditing(false);
  }

  function handleDelete() {
    onDelete(todo.id);
    onClose();
  }

  return (
    <div className="reg-overlay" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="detail-modal-title"
        className="reg-overlay__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <FocusTrap onEscape={onClose}>
          <button
            className="reg-overlay__close"
            aria-label="Zamknij szczegóły zadania"
            onClick={onClose}
          >
            ✕
          </button>

          <h2 id="detail-modal-title" className="detail-modal__heading">
            Szczegóły zadania
          </h2>

          {isEditing ? (
            <div className="detail-modal__form">
              <label className="detail-modal__label" htmlFor="detail-title">Tytuł</label>
              <input
                id="detail-title"
                className="toolbar-search detail-modal__input"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (titleError) setTitleError(false);
                }}
                autoFocus
                aria-required="true"
                aria-invalid={titleError}
                aria-describedby={titleError ? 'detail-title-err' : undefined}
              />
              {titleError && (
                <span id="detail-title-err" role="alert" className="login-modal__error">
                  Tytuł jest wymagany
                </span>
              )}

              <label className="detail-modal__label" htmlFor="detail-priority">Priorytet</label>
              <select
                id="detail-priority"
                className="detail-modal__select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
              >
                <option value="low">Niski</option>
                <option value="medium">Średni</option>
                <option value="high">Wysoki</option>
              </select>

              <label className="detail-modal__label" htmlFor="detail-date">Termin</label>
              <input
                id="detail-date"
                type="date"
                className="toolbar-search detail-modal__input"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />

              <div className="detail-modal__actions">
                <button className="navbar-register-btn" onClick={handleSave} type="button">Zapisz</button>
                <button className="toolbar-filter-btn" onClick={() => setIsEditing(false)} type="button">Anuluj</button>
              </div>
            </div>
          ) : (
            <div className="detail-modal__info">
              <div className="detail-modal__row">
                <span className="detail-modal__key">Tytuł</span>
                <span className="detail-modal__value" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                  {todo.title}
                </span>
              </div>
              <div className="detail-modal__row">
                <span className="detail-modal__key">Status</span>
                <span className="detail-modal__value">{todo.completed ? 'Ukończone' : 'Aktywne'}</span>
              </div>
              <div className="detail-modal__row">
                <span className="detail-modal__key">Priorytet</span>
                <span className="detail-modal__value">{priorityLabel[todo.priority]}</span>
              </div>
              <div className="detail-modal__row">
                <span className="detail-modal__key">Termin</span>
                <span className="detail-modal__value">{formatDate(todo.dueDate)}</span>
              </div>
              <div className="detail-modal__row">
                <span className="detail-modal__key">Utworzone</span>
                <span className="detail-modal__value">{formatDate(todo.createdAt)}</span>
              </div>

              <div className="detail-modal__actions">
                <button className="navbar-register-btn" onClick={() => setIsEditing(true)} type="button">Edytuj</button>
                <button className="detail-modal__delete-btn" onClick={handleDelete} type="button">Usuń</button>
              </div>
            </div>
          )}
        </FocusTrap>
      </div>
    </div>
  );
}
