import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { PageTransition } from '../components/PageTransition';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/TodoContext';
export function SettingsPage() {
    const { theme, setTheme } = useTheme();
    const { currentUser } = useAuth();
    return (_jsx(PageTransition, { children: _jsxs(Box, { component: "main", id: "main-content", tabIndex: -1, sx: { maxWidth: 640, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }, children: [_jsxs("header", { children: [_jsx(Typography, { variant: "h4", fontWeight: 700, mb: 0.5, children: "Ustawienia" }), _jsx(Typography, { variant: "body2", color: "text.secondary", mb: 4, children: "Dostosuj wygl\u0105d i preferencje aplikacji" })] }), _jsx(Card, { variant: "outlined", sx: { mb: 3 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", fontWeight: 600, mb: 1, children: "Motyw" }), _jsx(Typography, { variant: "body2", color: "text.secondary", mb: 2, children: "Wybierz jasny lub ciemny motyw interfejsu." }), _jsxs(Box, { sx: { display: 'flex', gap: 1, flexWrap: 'wrap' }, children: [_jsx(Button, { variant: theme === 'light' ? 'contained' : 'outlined', startIcon: _jsx(LightModeOutlinedIcon, { "aria-hidden": true }), onClick: () => setTheme('light'), "aria-pressed": theme === 'light', children: "Jasny" }), _jsx(Button, { variant: theme === 'dark' ? 'contained' : 'outlined', startIcon: _jsx(DarkModeOutlinedIcon, { "aria-hidden": true }), onClick: () => setTheme('dark'), "aria-pressed": theme === 'dark', children: "Ciemny" })] })] }) }), _jsx(Card, { variant: "outlined", sx: { mb: 3 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", fontWeight: 600, mb: 1, children: "Konto" }), currentUser ? (_jsxs(_Fragment, { children: [_jsxs(Typography, { variant: "body2", color: "text.secondary", mb: 1, children: ["Zalogowano jako ", _jsx("strong", { children: currentUser.email })] }), _jsxs(Typography, { variant: "body2", color: "text.secondary", children: [currentUser.firstName, " ", currentUser.lastName] })] })) : (_jsx(Alert, { severity: "info", sx: { mt: 1 }, children: "Zaloguj si\u0119 lub zarejestruj, aby synchronizowa\u0107 zadania z kontem." }))] }) }), _jsx(Card, { variant: "outlined", children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: "h6", fontWeight: 600, mb: 1, children: "Dost\u0119pno\u015B\u0107" }), _jsx(Typography, { variant: "body2", color: "text.secondary", children: "Aplikacja wspiera nawigacj\u0119 klawiatur\u0105, widoczny fokus oraz czytniki ekranu. U\u017Cyj skr\u00F3tu Tab, aby porusza\u0107 si\u0119 po elementach interfejsu." })] }) })] }) }));
}
