import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/TodoContext';
import { FocusTrap } from './FocusTrap';

interface Props {
  onClose: () => void;
}

export function ProfileModal({ onClose }: Props) {
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

  return (
    <div className="reg-overlay" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="profile-modal-title"
        className="reg-overlay__panel"
        onClick={(e) => e.stopPropagation()}
      >
        <FocusTrap onEscape={onClose}>
          <button className="reg-overlay__close" aria-label="Zamknij profil" onClick={onClose}>
            ✕
          </button>

          <h2 id="profile-modal-title" className="detail-modal__heading">
            Profil użytkownika
          </h2>

          <div className="detail-modal__form">
            <label className="detail-modal__label" htmlFor="profile-email">E-mail</label>
            <input
              id="profile-email"
              className="toolbar-search detail-modal__input"
              value={currentUser?.email ?? ''}
              readOnly
              style={{ opacity: 0.6, cursor: 'default' }}
            />

            <label className="detail-modal__label" htmlFor="profile-firstname">Imię</label>
            <input
              id="profile-firstname"
              className="toolbar-search detail-modal__input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Wprowadź imię"
              autoFocus
            />

            <label className="detail-modal__label" htmlFor="profile-lastname">Nazwisko</label>
            <input
              id="profile-lastname"
              className="toolbar-search detail-modal__input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Wprowadź nazwisko"
            />

            <div className="detail-modal__theme-row">
              <span className="detail-modal__label" style={{ marginBottom: 0 }}>Motyw</span>
              <button
                className="navbar-theme-btn detail-modal__theme-toggle"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                aria-label={theme === 'light' ? 'Przełącz na tryb ciemny' : 'Przełącz na tryb jasny'}
                type="button"
              >
                {theme === 'light' ? '🌙 Ciemny' : '☀️ Jasny'}
              </button>
            </div>

            <div className="detail-modal__actions">
              <button className="navbar-register-btn" onClick={handleSave} type="button">Zapisz</button>
              <button className="toolbar-filter-btn" onClick={onClose} type="button">Anuluj</button>
              <button className="detail-modal__delete-btn" onClick={handleLogout} type="button">Wyloguj się</button>
            </div>
          </div>
        </FocusTrap>
      </div>
    </div>
  );
}
