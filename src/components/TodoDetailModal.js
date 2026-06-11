import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { FocusTrap } from './FocusTrap';
const priorityLabel = {
    low: 'Niski',
    medium: 'Średni',
    high: 'Wysoki',
};
function formatDate(date) {
    return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function toInputDate(date) {
    return date.toISOString().split('T')[0];
}
export function TodoDetailModal({ todo, onClose, onEdit, onDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [priority, setPriority] = useState(todo.priority);
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
    return (_jsx("div", { className: "reg-overlay", onClick: onClose, children: _jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "detail-modal-title", className: "reg-overlay__panel", onClick: (e) => e.stopPropagation(), children: _jsxs(FocusTrap, { onEscape: onClose, children: [_jsx("button", { className: "reg-overlay__close", "aria-label": "Zamknij szczeg\u00F3\u0142y zadania", onClick: onClose, children: "\u2715" }), _jsx("h2", { id: "detail-modal-title", className: "detail-modal__heading", children: "Szczeg\u00F3\u0142y zadania" }), isEditing ? (_jsxs("div", { className: "detail-modal__form", children: [_jsx("label", { className: "detail-modal__label", htmlFor: "detail-title", children: "Tytu\u0142" }), _jsx("input", { id: "detail-title", className: "toolbar-search detail-modal__input", value: title, onChange: (e) => {
                                    setTitle(e.target.value);
                                    if (titleError)
                                        setTitleError(false);
                                }, autoFocus: true, "aria-required": "true", "aria-invalid": titleError, "aria-describedby": titleError ? 'detail-title-err' : undefined }), titleError && (_jsx("span", { id: "detail-title-err", role: "alert", className: "login-modal__error", children: "Tytu\u0142 jest wymagany" })), _jsx("label", { className: "detail-modal__label", htmlFor: "detail-priority", children: "Priorytet" }), _jsxs("select", { id: "detail-priority", className: "detail-modal__select", value: priority, onChange: (e) => setPriority(e.target.value), children: [_jsx("option", { value: "low", children: "Niski" }), _jsx("option", { value: "medium", children: "\u015Aredni" }), _jsx("option", { value: "high", children: "Wysoki" })] }), _jsx("label", { className: "detail-modal__label", htmlFor: "detail-date", children: "Termin" }), _jsx("input", { id: "detail-date", type: "date", className: "toolbar-search detail-modal__input", value: dueDate, onChange: (e) => setDueDate(e.target.value) }), _jsxs("div", { className: "detail-modal__actions", children: [_jsx("button", { className: "navbar-register-btn", onClick: handleSave, type: "button", children: "Zapisz" }), _jsx("button", { className: "toolbar-filter-btn", onClick: () => setIsEditing(false), type: "button", children: "Anuluj" })] })] })) : (_jsxs("div", { className: "detail-modal__info", children: [_jsxs("div", { className: "detail-modal__row", children: [_jsx("span", { className: "detail-modal__key", children: "Tytu\u0142" }), _jsx("span", { className: "detail-modal__value", style: { textDecoration: todo.completed ? 'line-through' : 'none' }, children: todo.title })] }), _jsxs("div", { className: "detail-modal__row", children: [_jsx("span", { className: "detail-modal__key", children: "Status" }), _jsx("span", { className: "detail-modal__value", children: todo.completed ? 'Ukończone' : 'Aktywne' })] }), _jsxs("div", { className: "detail-modal__row", children: [_jsx("span", { className: "detail-modal__key", children: "Priorytet" }), _jsx("span", { className: "detail-modal__value", children: priorityLabel[todo.priority] })] }), _jsxs("div", { className: "detail-modal__row", children: [_jsx("span", { className: "detail-modal__key", children: "Termin" }), _jsx("span", { className: "detail-modal__value", children: formatDate(todo.dueDate) })] }), _jsxs("div", { className: "detail-modal__row", children: [_jsx("span", { className: "detail-modal__key", children: "Utworzone" }), _jsx("span", { className: "detail-modal__value", children: formatDate(todo.createdAt) })] }), _jsxs("div", { className: "detail-modal__actions", children: [_jsx("button", { className: "navbar-register-btn", onClick: () => setIsEditing(true), type: "button", children: "Edytuj" }), _jsx("button", { className: "detail-modal__delete-btn", onClick: handleDelete, type: "button", children: "Usu\u0144" })] })] }))] }) }) }));
}
