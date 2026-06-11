import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
function todayString() {
    return new Date().toISOString().split('T')[0];
}
export function AddTodoForm({ onAdd, onClose }) {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState('low');
    const [dueDate, setDueDate] = useState(todayString);
    const [titleTouched, setTitleTouched] = useState(false);
    const [lastAdded, setLastAdded] = useState('');
    const titleError = titleTouched && !title.trim();
    function commit() {
        const trimmed = title.trim();
        if (!trimmed) {
            setTitleTouched(true);
            return;
        }
        onAdd(trimmed, priority, new Date(dueDate));
        setLastAdded(trimmed);
        setTitle('');
        setPriority('low');
        setDueDate(todayString());
        setTitleTouched(false);
    }
    function handleSubmit(e) {
        e.preventDefault();
        commit();
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            commit();
        }
    }
    return (_jsxs(Box, { component: "form", "aria-label": "Dodaj nowe zadanie", onSubmit: handleSubmit, sx: {
            width: '100%',
            maxWidth: 420,
            minHeight: { xs: 'auto', sm: '100svh' },
            bgcolor: 'background.paper',
            p: { xs: 3, sm: 6 },
            display: 'flex',
            flexDirection: 'column',
            gap: 2.5,
        }, children: [_jsx("div", { role: "status", className: "visually-hidden", children: lastAdded ? `Dodano zadanie: ${lastAdded}` : '' }), _jsx(Typography, { variant: "h6", textAlign: "center", fontWeight: 700, mb: 1, children: "Dodaj nowe zadanie" }), _jsxs(Box, { sx: { display: 'flex', gap: 1, alignItems: 'flex-start' }, children: [_jsxs(Box, { sx: { flex: 1 }, children: [_jsx(TextField, { fullWidth: true, id: "todo-title", label: "Tytu\u0142", value: title, onChange: (e) => setTitle(e.target.value), onBlur: () => setTitleTouched(true), autoFocus: true, onKeyDown: handleKeyDown, error: titleError, slotProps: {
                                    htmlInput: {
                                        'aria-required': 'true',
                                        'aria-invalid': titleError || undefined,
                                        'aria-describedby': titleError ? 'title-err' : undefined,
                                    },
                                } }), titleError && (_jsx("span", { id: "title-err", role: "alert", style: { color: '#B71C1C', fontSize: '0.75rem', display: 'block', marginTop: 4 }, children: "Tytu\u0142 jest wymagany" }))] }), _jsx(Button, { variant: "contained", startIcon: _jsx(AddIcon, { "aria-hidden": true }), type: "submit", "aria-label": "Dodaj zadanie", disabled: !title.trim(), sx: { whiteSpace: 'nowrap', flexShrink: 0, mt: '8px' }, children: "Dodaj" })] }), _jsx(TextField, { type: "date", fullWidth: true, id: "todo-due-date", value: dueDate, onChange: (e) => setDueDate(e.target.value), label: "Termin", slotProps: {
                    inputLabel: { shrink: true },
                    htmlInput: { 'aria-required': 'true' },
                } }), _jsxs(TextField, { select: true, fullWidth: true, value: priority, onChange: (e) => setPriority(e.target.value), label: "Priorytet", children: [_jsx(MenuItem, { value: "low", children: "Niski" }), _jsx(MenuItem, { value: "medium", children: "\u015Aredni" }), _jsx(MenuItem, { value: "high", children: "Wysoki" })] }), _jsxs(Box, { sx: { display: 'flex', gap: 1.5, mt: 'auto' }, children: [_jsx(Button, { variant: "contained", type: "submit", fullWidth: true, disabled: !title.trim(), children: "Zapisz" }), onClose && (_jsx(Button, { variant: "outlined", onClick: onClose, fullWidth: true, children: "Anuluj" }))] })] }));
}
