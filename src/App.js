import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { AnimatePresence } from 'framer-motion';
import { useMemo, useRef, useState } from 'react';
import { NavLink, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import { AddTodoForm } from './components/AddTodoForm';
import { FilterBar } from './components/FilterBar';
import { FocusTrap } from './components/FocusTrap';
import { LoginModal } from './components/LoginModal';
import { PageTransition } from './components/PageTransition';
import { ProfileModal } from './components/ProfileModal';
import { TodoDetailModal } from './components/TodoDetailModal';
import { MultiStepForm } from './components/registration/MultiStepForm';
import { TodoList } from './components/TodoList';
import { AuthProvider, useAuth } from './context/AuthContext';
import { NotificationProvider, useNotification } from './context/NotificationContext';
import { ThemeProvider, TodoProvider, useTodoContext, useTheme } from './context/TodoContext';
import { SettingsPage } from './pages/SettingsPage';
import { StatsPage } from './pages/StatsPage';
import { createMuiTheme } from './theme/muiTheme';
// ── Todo page (main route "/") ─────────────────────────────────
function TodoPageWrapper() {
    const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoContext();
    const { notify } = useNotification();
    const [activeFilter, setActiveFilter] = useState('all');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isFilterBarVisible, setIsFilterBarVisible] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTodo, setSelectedTodo] = useState(null);
    const filteredTodos = todos.filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const activeCount = todos.filter((t) => !t.completed).length;
    async function handleAdd(title, priority, dueDate) {
        try {
            await addTodo(title, priority, dueDate);
            setIsFormOpen(false);
            notify('Zadanie dodane', 'success');
        }
        catch {
            notify('Błąd dodawania zadania', 'error');
        }
    }
    async function handleToggle(id) {
        try {
            await toggleTodo(id);
        }
        catch {
            notify('Błąd aktualizacji zadania', 'error');
        }
    }
    async function handleDelete(id) {
        try {
            await deleteTodo(id);
            notify('Zadanie usunięte', 'info');
        }
        catch {
            notify('Błąd usuwania zadania', 'error');
        }
    }
    async function handleEdit(id, title, priority, dueDate) {
        try {
            await editTodo(id, title, priority, dueDate);
            notify('Zadanie zaktualizowane', 'success');
        }
        catch {
            notify('Błąd aktualizacji zadania', 'error');
        }
    }
    return (_jsxs(PageTransition, { children: [_jsxs("main", { className: "main", id: "main-content", tabIndex: -1, children: [_jsxs("header", { className: "page-header", children: [_jsx("h2", { children: "Lista zada\u0144" }), _jsx("p", { children: "Zarz\u0105dzaj swoimi zadaniami i projektami" }), _jsxs("p", { className: "counter", children: [activeCount, " aktywnych / ", todos.length, " wszystkich zada\u0144"] })] }), _jsxs("div", { className: "toolbar", children: [_jsx("form", { role: "search", "aria-label": "Wyszukiwarka zada\u0144", style: { flex: 1, display: 'flex' }, onSubmit: (e) => e.preventDefault(), children: _jsx("input", { className: "toolbar-search", placeholder: "Wyszukaj zadanie", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), style: { flex: 1 }, "aria-label": "Wyszukaj zadanie" }) }), _jsxs("button", { className: "toolbar-add-btn", onClick: () => setIsFormOpen(true), children: [_jsx("span", { className: "toolbar-add-icon", children: "+" }), "Dodaj zadanie"] }), _jsx("button", { className: `toolbar-filter-btn${isFilterBarVisible ? ' toolbar-filter-btn--active' : ''}`, onClick: () => setIsFilterBarVisible((v) => !v), "aria-pressed": isFilterBarVisible, children: "Filtruj" })] }), isFilterBarVisible && (_jsx(FilterBar, { activeFilter: activeFilter, onFilterChange: setActiveFilter })), isLoading && (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', py: 6 }, children: _jsx(CircularProgress, { "aria-label": "\u0141adowanie zada\u0144" }) })), error && (_jsx(Alert, { severity: "error", sx: { mb: 2 }, children: error })), !isLoading && (_jsx(TodoList, { todos: filteredTodos, filter: activeFilter, onToggle: handleToggle, onDelete: handleDelete, onEdit: handleEdit, onSelect: setSelectedTodo }))] }), isFormOpen && (_jsx("div", { className: "add-overlay", onClick: () => setIsFormOpen(false), children: _jsx("div", { className: "add-overlay__stop", onClick: (e) => e.stopPropagation(), children: _jsx(AddTodoForm, { onAdd: handleAdd, onClose: () => setIsFormOpen(false) }) }) })), selectedTodo && (_jsx(TodoDetailModal, { todo: selectedTodo, onClose: () => setSelectedTodo(null), onEdit: (id, title, priority, dueDate) => {
                    handleEdit(id, title, priority, dueDate);
                    setSelectedTodo((prev) => (prev ? { ...prev, title, priority, dueDate } : null));
                }, onDelete: (id) => {
                    handleDelete(id);
                    setSelectedTodo(null);
                } }))] }));
}
// ── App layout (navbar + routes + modals) ─────────────────────
function AppLayout() {
    const { theme, setTheme } = useTheme();
    const { currentUser, register } = useAuth();
    const { notify } = useNotification();
    const [showRegistration, setShowRegistration] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const registerBtnRef = useRef(null);
    const location = useLocation();
    const displayName = currentUser
        ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
        : '';
    return (_jsxs("div", { className: "layout", "data-theme": theme, children: [_jsx("a", { href: "#main-content", className: "skip-link", children: "Przejd\u017A do tre\u015Bci g\u0142\u00F3wnej" }), _jsxs("header", { className: "navbar", children: [_jsxs("nav", { "aria-label": "Nawigacja g\u0142\u00F3wna", className: "navbar-brand", children: [_jsx("div", { className: "navbar-logo", children: "Logo" }), _jsx("span", { className: "navbar-title", children: "ToDo List" }), _jsx(NavLink, { to: "/", end: true, className: ({ isActive }) => `navbar-nav-link${isActive ? ' navbar-nav-link--active' : ''}`, children: "Zadania" }), _jsx(NavLink, { to: "/stats", className: ({ isActive }) => `navbar-nav-link${isActive ? ' navbar-nav-link--active' : ''}`, children: "Statystyki" }), _jsx(NavLink, { to: "/settings", className: ({ isActive }) => `navbar-nav-link${isActive ? ' navbar-nav-link--active' : ''}`, children: "Ustawienia" })] }), _jsxs("div", { className: "navbar-right", children: [currentUser ? (_jsxs(_Fragment, { children: [_jsx("button", { className: "navbar-username navbar-user-btn", onClick: () => setShowProfile(true), "aria-label": "Otw\u00F3rz profil u\u017Cytkownika", children: displayName }), _jsx("button", { className: "navbar-avatar navbar-user-btn", onClick: () => setShowProfile(true), "aria-label": "Otw\u00F3rz profil u\u017Cytkownika", children: currentUser.firstName.charAt(0).toUpperCase() })] })) : (_jsxs(_Fragment, { children: [_jsx("button", { ref: registerBtnRef, className: "navbar-register-btn", onClick: () => setShowRegistration(true), children: "Zarejestruj si\u0119" }), _jsx("button", { className: "navbar-login-btn", onClick: () => setShowLogin(true), children: "Zaloguj si\u0119" })] })), _jsx("button", { className: "navbar-theme-btn", onClick: () => setTheme(theme === 'light' ? 'dark' : 'light'), "aria-label": theme === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny', children: theme === 'light' ? '🌙' : '☀️' })] })] }), _jsx("div", { className: "content-wrapper", children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(Routes, { location: location, children: [_jsx(Route, { path: "/", element: _jsx(TodoPageWrapper, {}) }), _jsx(Route, { path: "/stats", element: _jsx(StatsPage, {}) }), _jsx(Route, { path: "/settings", element: _jsx(SettingsPage, {}) })] }, location.pathname) }) }), _jsx("footer", { className: "app-footer", children: "\u00A9 Akademia Tarnowska" }), showProfile && currentUser && (_jsx(ProfileModal, { onClose: () => setShowProfile(false) })), showLogin && (_jsx(LoginModal, { onClose: () => setShowLogin(false), onSwitchToRegister: () => {
                    setShowLogin(false);
                    setShowRegistration(true);
                } })), showRegistration && (_jsx("div", { className: "reg-overlay", onClick: () => setShowRegistration(false), children: _jsx("div", { role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title-layout", className: "reg-overlay__panel", onClick: (e) => e.stopPropagation(), children: _jsxs(FocusTrap, { onEscape: () => setShowRegistration(false), triggerRef: registerBtnRef, children: [_jsx("h2", { id: "modal-title-layout", className: "visually-hidden", children: "Formularz rejestracji" }), _jsx("button", { className: "reg-overlay__close", "aria-label": "Zamknij formularz rejestracji", onClick: () => setShowRegistration(false), children: "\u2715" }), _jsx(MultiStepForm, { onRegister: register, onSuccess: () => {
                                    setShowRegistration(false);
                                    notify('Konto zostało utworzone. Możesz się teraz zalogować.', 'success');
                                } })] }) }) }))] }));
}
// ── Provider stack ─────────────────────────────────────────────
function AppWithTheme() {
    const { theme } = useTheme();
    const { currentUser } = useAuth();
    const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);
    return (_jsxs(MuiThemeProvider, { theme: muiTheme, children: [_jsx(CssBaseline, {}), _jsx(NotificationProvider, { children: _jsx(TodoProvider, { userId: currentUser?.id, children: _jsx(AppLayout, {}) }, currentUser?.id ?? 'guest') })] }));
}
function App() {
    return (_jsx(ThemeProvider, { children: _jsx(AuthProvider, { children: _jsx(AppWithTheme, {}) }) }));
}
export default App;
