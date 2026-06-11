import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FocusTrap } from './FocusTrap';
export function LoginModal({ onClose, onSwitchToRegister }) {
    const { login, isLoading, error, clearError } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fieldError, setFieldError] = useState('');
    useEffect(() => {
        clearError();
        return () => clearError();
    }, [clearError]);
    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            setFieldError('Wypełnij wszystkie pola');
            return;
        }
        setFieldError('');
        try {
            await login(email, password);
            onClose();
        }
        catch {
            // error displayed from AuthContext
        }
    }
    const displayError = fieldError || error;
    return (_jsx("div", { className: "reg-overlay", onClick: onClose, children: _jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "login-modal-title", className: "reg-overlay__panel", onClick: (e) => e.stopPropagation(), children: _jsxs(FocusTrap, { onEscape: onClose, children: [_jsx("button", { className: "reg-overlay__close", "aria-label": "Zamknij logowanie", onClick: onClose, children: "\u2715" }), _jsx("h2", { id: "login-modal-title", className: "detail-modal__heading", children: "Logowanie" }), _jsxs("form", { className: "detail-modal__form", onSubmit: handleSubmit, noValidate: true, children: [displayError && (_jsx("div", { id: "login-error", role: "alert", className: "login-modal__error", children: displayError })), _jsx("label", { className: "detail-modal__label", htmlFor: "login-email", children: "E-mail" }), _jsx("input", { id: "login-email", type: "email", className: "toolbar-search detail-modal__input", value: email, onChange: (e) => setEmail(e.target.value), autoFocus: true, autoComplete: "email", "aria-required": "true", "aria-invalid": !!displayError, "aria-describedby": displayError ? 'login-error' : undefined }), _jsx("label", { className: "detail-modal__label", htmlFor: "login-password", children: "Has\u0142o" }), _jsx("input", { id: "login-password", type: "password", className: "toolbar-search detail-modal__input", value: password, onChange: (e) => setPassword(e.target.value), autoComplete: "current-password", "aria-required": "true", "aria-invalid": !!displayError, "aria-describedby": displayError ? 'login-error' : undefined }), _jsx("div", { className: "detail-modal__actions", children: _jsx("button", { type: "submit", className: "navbar-register-btn", disabled: isLoading, "aria-busy": isLoading, children: isLoading ? 'Logowanie…' : 'Zaloguj się' }) })] }), _jsxs("p", { className: "login-modal__switch", children: ["Nie masz konta?", ' ', _jsx("button", { type: "button", className: "login-modal__switch-btn", onClick: onSwitchToRegister, children: "Zarejestruj si\u0119" })] })] }) }) }));
}
