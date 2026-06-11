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
import type { FilterType, Priority, Todo } from './types/todo.types';

// ── Todo page (main route "/") ─────────────────────────────────

function TodoPageWrapper() {
  const { todos, isLoading, error, addTodo, toggleTodo, deleteTodo, editTodo } = useTodoContext();
  const { notify } = useNotification();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isFilterBarVisible, setIsFilterBarVisible] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = todos.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const activeCount = todos.filter((t) => !t.completed).length;

  async function handleAdd(title: string, priority: Priority, dueDate: Date) {
    try {
      await addTodo(title, priority, dueDate);
      setIsFormOpen(false);
      notify('Zadanie dodane', 'success');
    } catch {
      notify('Błąd dodawania zadania', 'error');
    }
  }

  async function handleToggle(id: string) {
    try {
      await toggleTodo(id);
    } catch {
      notify('Błąd aktualizacji zadania', 'error');
    }
  }

  async function handleDelete(id: string) {
    try {
      await deleteTodo(id);
      notify('Zadanie usunięte', 'info');
    } catch {
      notify('Błąd usuwania zadania', 'error');
    }
  }

  async function handleEdit(id: string, title: string, priority: Priority, dueDate: Date) {
    try {
      await editTodo(id, title, priority, dueDate);
      notify('Zadanie zaktualizowane', 'success');
    } catch {
      notify('Błąd aktualizacji zadania', 'error');
    }
  }

  return (
    <PageTransition>
      <main className="main" id="main-content" tabIndex={-1}>
        <header className="page-header">
          <h2>Lista zadań</h2>
          <p>Zarządzaj swoimi zadaniami i projektami</p>
          <p className="counter">{activeCount} aktywnych / {todos.length} wszystkich zadań</p>
        </header>

        <div className="toolbar">
          <form
            role="search"
            aria-label="Wyszukiwarka zadań"
            style={{ flex: 1, display: 'flex' }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              className="toolbar-search"
              placeholder="Wyszukaj zadanie"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ flex: 1 }}
              aria-label="Wyszukaj zadanie"
            />
          </form>
          <button className="toolbar-add-btn" onClick={() => setIsFormOpen(true)}>
            <span className="toolbar-add-icon">+</span>
            Dodaj zadanie
          </button>
          <button
            className={`toolbar-filter-btn${isFilterBarVisible ? ' toolbar-filter-btn--active' : ''}`}
            onClick={() => setIsFilterBarVisible((v) => !v)}
            aria-pressed={isFilterBarVisible}
          >
            Filtruj
          </button>
        </div>

        {isFilterBarVisible && (
          <FilterBar activeFilter={activeFilter} onFilterChange={setActiveFilter} />
        )}

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress aria-label="Ładowanie zadań" />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {!isLoading && (
          <TodoList
            todos={filteredTodos}
            filter={activeFilter}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onSelect={setSelectedTodo}
          />
        )}
      </main>

      {isFormOpen && (
        <div className="add-overlay" onClick={() => setIsFormOpen(false)}>
          <div className="add-overlay__stop" onClick={(e) => e.stopPropagation()}>
            <AddTodoForm onAdd={handleAdd} onClose={() => setIsFormOpen(false)} />
          </div>
        </div>
      )}

      {selectedTodo && (
        <TodoDetailModal
          todo={selectedTodo}
          onClose={() => setSelectedTodo(null)}
          onEdit={(id, title, priority, dueDate) => {
            handleEdit(id, title, priority, dueDate);
            setSelectedTodo((prev) => (prev ? { ...prev, title, priority, dueDate } : null));
          }}
          onDelete={(id) => {
            handleDelete(id);
            setSelectedTodo(null);
          }}
        />
      )}
    </PageTransition>
  );
}

// ── App layout (navbar + routes + modals) ─────────────────────

function AppLayout() {
  const { theme, setTheme } = useTheme();
  const { currentUser, register } = useAuth();
  const { notify } = useNotification();
  const [showRegistration, setShowRegistration] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const registerBtnRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();

  const displayName = currentUser
    ? `${currentUser.firstName} ${currentUser.lastName}`.trim()
    : '';

  return (
    <div className="layout" data-theme={theme}>
      <a href="#main-content" className="skip-link">
        Przejdź do treści głównej
      </a>

      <header className="navbar">
        <nav aria-label="Nawigacja główna" className="navbar-brand">
          <div className="navbar-logo">Logo</div>
          <span className="navbar-title">ToDo List</span>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `navbar-nav-link${isActive ? ' navbar-nav-link--active' : ''}`
            }
          >
            Zadania
          </NavLink>
          <NavLink
            to="/stats"
            className={({ isActive }) =>
              `navbar-nav-link${isActive ? ' navbar-nav-link--active' : ''}`
            }
          >
            Statystyki
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `navbar-nav-link${isActive ? ' navbar-nav-link--active' : ''}`
            }
          >
            Ustawienia
          </NavLink>
        </nav>
        <div className="navbar-right">
          {currentUser ? (
            <>
              <button
                className="navbar-username navbar-user-btn"
                onClick={() => setShowProfile(true)}
                aria-label="Otwórz profil użytkownika"
              >
                {displayName}
              </button>
              <button
                className="navbar-avatar navbar-user-btn"
                onClick={() => setShowProfile(true)}
                aria-label="Otwórz profil użytkownika"
              >
                {currentUser.firstName.charAt(0).toUpperCase()}
              </button>
            </>
          ) : (
            <>
              <button
                ref={registerBtnRef}
                className="navbar-register-btn"
                onClick={() => setShowRegistration(true)}
              >
                Zarejestruj się
              </button>
              <button
                className="navbar-login-btn"
                onClick={() => setShowLogin(true)}
              >
                Zaloguj się
              </button>
            </>
          )}
          <button
            className="navbar-theme-btn"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
            aria-label={theme === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      <div className="content-wrapper">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<TodoPageWrapper />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </AnimatePresence>
      </div>

      <footer className="app-footer">© Akademia Tarnowska</footer>

      {showProfile && currentUser && (
        <ProfileModal onClose={() => setShowProfile(false)} />
      )}

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false);
            setShowRegistration(true);
          }}
        />
      )}

      {showRegistration && (
        <div className="reg-overlay" onClick={() => setShowRegistration(false)}>
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title-layout"
            className="reg-overlay__panel"
            onClick={(e) => e.stopPropagation()}
          >
            <FocusTrap
              onEscape={() => setShowRegistration(false)}
              triggerRef={registerBtnRef}
            >
              <h2 id="modal-title-layout" className="visually-hidden">
                Formularz rejestracji
              </h2>
              <button
                className="reg-overlay__close"
                aria-label="Zamknij formularz rejestracji"
                onClick={() => setShowRegistration(false)}
              >
                ✕
              </button>
              <MultiStepForm
                onRegister={register}
                onSuccess={() => {
                  setShowRegistration(false);
                  notify('Konto zostało utworzone. Możesz się teraz zalogować.', 'success');
                }}
              />
            </FocusTrap>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Provider stack ─────────────────────────────────────────────

function AppWithTheme() {
  const { theme } = useTheme();
  const { currentUser } = useAuth();
  const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <NotificationProvider>
        <TodoProvider key={currentUser?.id ?? 'guest'} userId={currentUser?.id}>
          <AppLayout />
        </TodoProvider>
      </NotificationProvider>
    </MuiThemeProvider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppWithTheme />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
