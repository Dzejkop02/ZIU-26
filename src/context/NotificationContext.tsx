import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useContext, useState } from 'react';

type Severity = 'success' | 'error' | 'info' | 'warning';

interface NotificationContextType {
  notify: (message: string, severity?: Severity) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<Severity>('success');

  function notify(msg: string, sev: Severity = 'success') {
    setMessage(msg);
    setSeverity(sev);
    setOpen(true);
  }

  function handleClose(_: React.SyntheticEvent | Event, reason?: string) {
    if (reason === 'clickaway') return;
    setOpen(false);
  }

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleClose} severity={severity} variant="filled" sx={{ width: '100%' }}>
          {message}
        </Alert>
      </Snackbar>
    </NotificationContext.Provider>
  );
}

export function useNotification(): NotificationContextType {
  const ctx = useContext(NotificationContext);
  if (ctx === undefined) throw new Error('useNotification must be used within NotificationProvider');
  return ctx;
}
