import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FocusTrap } from './FocusTrap';

interface Props {
  onClose: () => void;
  onSwitchToRegister: () => void;
}

export function LoginModal({ onClose, onSwitchToRegister }: Props) {
  const { login, isLoading, error, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldError, setFieldError] = useState('');

  useEffect(() => {
    clearError();
    return () => clearError();
  }, [clearError]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setFieldError('Wypełnij wszystkie pola');
      return;
    }
    setFieldError('');
    try {
      await login(email, password);
      onClose();
    } catch {
      // error displayed from AuthContext
    }
  }

  const displayError = fieldError || error;

  return (
    <div className="reg-overlay" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
        className="reg-overlay__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <FocusTrap onEscape={onClose}>
          <button className="reg-overlay__close" aria-label="Zamknij logowanie" onClick={onClose}>
            ✕
          </button>

          <h2 id="login-modal-title" className="detail-modal__heading">Logowanie</h2>

          <form className="detail-modal__form" onSubmit={handleSubmit} noValidate>
            {displayError && (
              <div id="login-error" role="alert" className="login-modal__error">
                {displayError}
              </div>
            )}

            <label className="detail-modal__label" htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              className="toolbar-search detail-modal__input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!displayError}
              aria-describedby={displayError ? 'login-error' : undefined}
            />

            <label className="detail-modal__label" htmlFor="login-password">Hasło</label>
            <input
              id="login-password"
              type="password"
              className="toolbar-search detail-modal__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              aria-required="true"
              aria-invalid={!!displayError}
              aria-describedby={displayError ? 'login-error' : undefined}
            />

            <div className="detail-modal__actions">
              <button type="submit" className="navbar-register-btn" disabled={isLoading} aria-busy={isLoading}>
                {isLoading ? 'Logowanie…' : 'Zaloguj się'}
              </button>
            </div>
          </form>

          <p className="login-modal__switch">
            Nie masz konta?{' '}
            <button type="button" className="login-modal__switch-btn" onClick={onSwitchToRegister}>
              Zarejestruj się
            </button>
          </p>
        </FocusTrap>
      </div>
    </div>
  );
}
