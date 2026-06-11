import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useRef, useEffect } from 'react';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import './TodoItem.css';
function formatDate(date) {
    return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function toInputDate(date) {
    return date.toISOString().split('T')[0];
}
export function TodoItem({ todo, onToggle, onDelete, onEdit, onSelect }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(todo.title);
    const [isEditingDate, setIsEditingDate] = useState(false);
    const dateRef = useRef(null);
    useEffect(() => {
        if (isEditingDate)
            dateRef.current?.showPicker?.();
    }, [isEditingDate]);
    function commitEdit() {
        const trimmed = editValue.trim();
        if (trimmed && trimmed !== todo.title) {
            onEdit(todo.id, trimmed, todo.priority, todo.dueDate);
        }
        else {
            setEditValue(todo.title);
        }
        setIsEditing(false);
    }
    function handleKeyDown(e) {
        if (e.key === 'Enter')
            commitEdit();
        if (e.key === 'Escape') {
            setEditValue(todo.title);
            setIsEditing(false);
        }
    }
    function handlePriorityChange(e) {
        onEdit(todo.id, todo.title, e.target.value, todo.dueDate);
    }
    function handleDateChange(e) {
        if (!e.target.value)
            return;
        onEdit(todo.id, todo.title, todo.priority, new Date(e.target.value));
        setIsEditingDate(false);
    }
    return (_jsx("article", { className: "todo-card-container", onClick: () => !isEditing && onSelect(todo), style: { cursor: 'pointer' }, children: _jsx(Card, { variant: "outlined", sx: {
                borderRadius: 2,
                transition: 'box-shadow 0.2s',
                '&:hover': { boxShadow: 3 },
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
            }, children: _jsxs(CardContent, { className: "todo-card-inner", sx: { flex: 1, display: 'flex', flexDirection: 'column', gap: 1, p: 2, '&:last-child': { pb: 2 } }, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'flex-start', gap: 1 }, children: [_jsx(Box, { onClick: (e) => e.stopPropagation(), sx: { aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }, children: _jsx(Checkbox, { checked: todo.completed, onChange: () => onToggle(todo.id), size: "small", sx: { p: 0 }, slotProps: {
                                        input: {
                                            'aria-label': `Oznacz jako ${todo.completed ? 'aktywne' : 'ukończone'}: ${todo.title}`,
                                        },
                                    } }) }), isEditing ? (_jsx(TextField, { value: editValue, onChange: (e) => setEditValue(e.target.value), onBlur: commitEdit, onKeyDown: handleKeyDown, size: "small", fullWidth: true, autoFocus: true })) : (_jsx(Typography, { component: "span", onDoubleClick: () => setIsEditing(true), sx: {
                                    flex: 1,
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    color: 'text.primary',
                                    fontWeight: todo.completed ? 500 : 600,
                                    cursor: 'text',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.4,
                                    wordBreak: 'break-word',
                                }, children: todo.title })), !isEditing && (_jsx(IconButton, { size: "small", onClick: (e) => { e.stopPropagation(); setIsEditing(true); }, "aria-label": `Edytuj zadanie: ${todo.title}`, sx: { flexShrink: 0 }, children: _jsx(EditOutlinedIcon, { fontSize: "small" }) })), _jsx(IconButton, { size: "small", onClick: (e) => { e.stopPropagation(); onDelete(todo.id); }, "aria-label": `Usuń zadanie: ${todo.title}`, sx: { flexShrink: 0 }, children: _jsx(DeleteOutlineIcon, { fontSize: "small" }) })] }), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mt: 'auto' }, children: [isEditingDate ? (_jsx("input", { ref: dateRef, type: "date", className: "todo-card__date-input", defaultValue: toInputDate(todo.dueDate), onChange: handleDateChange, onBlur: () => setIsEditingDate(false), onClick: (e) => e.stopPropagation() })) : (_jsx(Typography, { component: "span", onClick: (e) => { e.stopPropagation(); setIsEditingDate(true); }, sx: {
                                    cursor: 'pointer',
                                    fontSize: '0.75rem',
                                    color: 'text.secondary',
                                    fontWeight: 500,
                                    '&:hover': { textDecoration: 'underline', color: 'primary.dark' },
                                }, children: formatDate(todo.dueDate) })), _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 0.75 }, children: [_jsxs("select", { className: `todo-card__badge todo-card__badge--${todo.priority}`, value: todo.priority, onChange: handlePriorityChange, onClick: (e) => e.stopPropagation(), title: "Zmie\u0144 priorytet", children: [_jsx("option", { value: "low", children: "Niski" }), _jsx("option", { value: "medium", children: "\u015Aredni" }), _jsx("option", { value: "high", children: "Wysoki" })] }), todo.completed && (_jsx(Chip, { label: "Uko\u0144czone", size: "small", sx: {
                                            bgcolor: 'success.dark',
                                            color: 'success.contrastText',
                                            fontWeight: 600,
                                            '& .MuiChip-label': { color: 'success.contrastText' },
                                        } }))] })] })] }) }) }));
}
