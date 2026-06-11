import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/TodoContext';
import { FocusTrap } from './FocusTrap';
export function ProfileModal({ onClose }) {
    const { currentUser, logout, updateUser } = useAuth();
    const { theme, setTheme } = useTheme();
    const [firstName, setFirstName] = useState(currentUser?.firstName ?? '');
    const [lastName, setLastName] = useState(currentUser?.lastName ?? '');
    function handleSave() {
        updateUser({ firstName: firstName.trim(), lastName: lastName.trim() });
        onClose();
    }
    function handleLogout() {
        logout();
        onClose();
    }
    return (_jsx("div", { className: "reg-overlay", onClick: onClose, children: _jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "profile-modal-title", className: "reg-overlay__panel", onClick: (e) => e.stopPropagation(), children: _jsxs(FocusTrap, { onEscape: onClose, children: [_jsx("button", { className: "reg-overlay__close", "aria-label": "Zamknij profil", onClick: onClose, children: "\u2715" }), _jsx("h2", { id: "profile-modal-title", className: "detail-modal__heading", children: "Profil u\u017Cytkownika" }), _jsxs("div", { className: "detail-modal__form", children: [_jsx("label", { className: "detail-modal__label", htmlFor: "profile-email", children: "E-mail" }), _jsx("input", { id: "profile-email", className: "toolbar-search detail-modal__input", value: currentUser?.email ?? '', readOnly: true, style: { opacity: 0.6, cursor: 'default' } }), _jsx("label", { className: "detail-modal__label", htmlFor: "profile-firstname", children: "Imi\u0119" }), _jsx("input", { id: "profile-firstname", className: "toolbar-search detail-modal__input", value: firstName, onChange: (e) => setFirstName(e.target.value), placeholder: "Wprowad\u017A imi\u0119", autoFocus: true }), _jsx("label", { className: "detail-modal__label", htmlFor: "profile-lastname", children: "Nazwisko" }), _jsx("input", { id: "profile-lastname", className: "toolbar-search detail-modal__input", value: lastName, onChange: (e) => setLastName(e.target.value), placeholder: "Wprowad\u017A nazwisko" }), _jsxs("div", { className: "detail-modal__theme-row", children: [_jsx("span", { className: "detail-modal__label", style: { marginBottom: 0 }, children: "Motyw" }), _jsx("button", { className: "navbar-theme-btn detail-modal__theme-toggle", onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'), "aria-label": theme === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny', type: "button", children: theme === 'light' ? '🌙 Ciemny' : '☀️ Jasny' })] }), _jsxs("div", { className: "detail-modal__actions", children: [_jsx("button", { className: "navbar-register-btn", onClick: handleSave, type: "button", children: "Zapisz" }), _jsx("button", { className: "toolbar-filter-btn", onClick: onClose, type: "button", children: "Anuluj" }), _jsx("button", { className: "detail-modal__delete-btn", onClick: handleLogout, type: "button", children: "Wyloguj si\u0119" })] })] })] }) }) }));
}
