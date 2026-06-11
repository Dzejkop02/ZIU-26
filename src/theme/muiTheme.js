import { createTheme } from '@mui/material/styles';
export function createMuiTheme(mode) {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: '#1565C0',
                light: '#1E88E5',
                dark: '#0D47A1',
            },
            secondary: {
                main: '#E65100',
            },
            success: {
                main: '#166534',
                dark: '#14532D',
                contrastText: '#FFFFFF',
            },
            warning: {
                main: '#B45309',
                contrastText: '#FFFFFF',
            },
            error: {
                main: '#B91C1C',
                contrastText: '#FFFFFF',
            },
            text: {
                primary: mode === 'light' ? '#111827' : '#F9FAFB',
                // #4B5563 na #FFFFFF = 7.0:1 (AA dla małego tekstu)
                secondary: mode === 'light' ? '#4B5563' : '#9CA3AF',
            },
            ...(mode === 'light' && {
                background: {
                    default: '#F5F7FA',
                    paper: '#FFFFFF',
                },
            }),
        },
        typography: {
            button: {
                textTransform: 'none',
                fontWeight: 600,
            },
        },
        shape: {
            borderRadius: 10,
        },
        components: {
            MuiButton: {
                defaultProps: {
                    disableElevation: true,
                },
                styleOverrides: {
                    root: {
                        borderRadius: 8,
                    },
                },
            },
            MuiTextField: {
                defaultProps: {
                    variant: 'outlined',
                    size: 'small',
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: {
                        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                        borderRadius: 12,
                    },
                },
            },
            MuiChip: {
                styleOverrides: {
                    colorSuccess: {
                        backgroundColor: '#166534',
                        color: '#FFFFFF',
                        '& .MuiChip-label': {
                            color: '#FFFFFF',
                        },
                    },
                },
            },
        },
    });
}
