import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { createContext, useContext, useState } from 'react';
const NotificationContext = createContext(undefined);
export function NotificationProvider({ children }) {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    function notify(msg, sev = 'success') {
        setMessage(msg);
        setSeverity(sev);
        setOpen(true);
    }
    function handleClose(_, reason) {
        if (reason === 'clickaway')
            return;
        setOpen(false);
    }
    return (_jsxs(NotificationContext.Provider, { value: { notify }, children: [children, _jsx(Snackbar, { open: open, autoHideDuration: 3500, onClose: handleClose, anchorOrigin: { vertical: 'bottom', horizontal: 'center' }, children: _jsx(Alert, { onClose: handleClose, severity: severity, variant: "filled", sx: { width: '100%' }, children: message }) })] }));
}
export function useNotification() {
    const ctx = useContext(NotificationContext);
    if (ctx === undefined)
        throw new Error('useNotification must be used within NotificationProvider');
    return ctx;
}
