import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { PageTransition } from '../components/PageTransition';
import { useTodoContext } from '../context/TodoContext';
function StatCard({ label, value, color = 'primary.main' }) {
    return (_jsxs(Box, { sx: {
            p: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            textAlign: 'center',
            bgcolor: 'background.paper',
            transition: 'box-shadow 0.15s',
            '&:hover': { boxShadow: 3 },
        }, children: [_jsx(Typography, { variant: "h3", fontWeight: 700, color: color, children: value }), _jsx(Typography, { variant: "body2", color: "text.secondary", mt: 0.5, children: label })] }));
}
export function StatsPage() {
    const { todos, isLoading, error } = useTodoContext();
    const total = todos.length;
    const completed = todos.filter((t) => t.completed).length;
    const active = total - completed;
    const highPriority = todos.filter((t) => t.priority === 'high' && !t.completed).length;
    const mediumPriority = todos.filter((t) => t.priority === 'medium' && !t.completed).length;
    const lowPriority = todos.filter((t) => t.priority === 'low' && !t.completed).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return (_jsx(PageTransition, { children: _jsxs(Box, { component: "main", id: "main-content", tabIndex: -1, sx: { maxWidth: 720, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }, children: [_jsxs("header", { children: [_jsx(Typography, { variant: "h4", fontWeight: 700, mb: 0.5, children: "Statystyki" }), _jsx(Typography, { variant: "body2", color: "text.secondary", mb: 4, children: "Przegl\u0105d Twoich zada\u0144 i post\u0119p\u00F3w" })] }), error && (_jsx(Alert, { severity: "error", sx: { mb: 3 }, children: error })), isLoading ? (_jsx(Box, { sx: { display: 'flex', justifyContent: 'center', py: 6 }, children: _jsx(CircularProgress, { "aria-label": "\u0141adowanie statystyk" }) })) : !error && (_jsxs(_Fragment, { children: [_jsx(Typography, { variant: "h6", fontWeight: 600, mb: 2, children: "Og\u00F3lne" }), _jsxs(Box, { sx: {
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
                                gap: 2,
                                mb: 4,
                            }, children: [_jsx(StatCard, { label: "Wszystkich zada\u0144", value: total }), _jsx(StatCard, { label: "Aktywnych", value: active, color: "warning.main" }), _jsx(StatCard, { label: "Uko\u0144czonych", value: completed, color: "success.main" }), _jsx(StatCard, { label: "Uko\u0144czono %", value: completionRate, color: "info.main" })] }), _jsx(Typography, { variant: "h6", fontWeight: 600, mb: 2, children: "Aktywne wg priorytetu" }), _jsxs(Box, { sx: {
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                                gap: 2,
                            }, children: [_jsx(StatCard, { label: "Wysoki priorytet", value: highPriority, color: "error.main" }), _jsx(StatCard, { label: "\u015Aredni priorytet", value: mediumPriority, color: "warning.main" }), _jsx(StatCard, { label: "Niski priorytet", value: lowPriority, color: "success.main" })] })] }))] }) }));
}
