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

  return (
    <PageTransition>
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{ maxWidth: 640, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}
      >
        <header>
          <Typography variant="h4" fontWeight={700} mb={0.5}>
            Ustawienia
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Dostosuj wygląd i preferencje aplikacji
          </Typography>
        </header>

        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Motyw
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Wybierz jasny lub ciemny motyw interfejsu.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Button
                variant={theme === 'light' ? 'contained' : 'outlined'}
                startIcon={<LightModeOutlinedIcon aria-hidden />}
                onClick={() => setTheme('light')}
                aria-pressed={theme === 'light'}
              >
                Jasny
              </Button>
              <Button
                variant={theme === 'dark' ? 'contained' : 'outlined'}
                startIcon={<DarkModeOutlinedIcon aria-hidden />}
                onClick={() => setTheme('dark')}
                aria-pressed={theme === 'dark'}
              >
                Ciemny
              </Button>
            </Box>
          </CardContent>
        </Card>

        <Card variant="outlined" sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Konto
            </Typography>
            {currentUser ? (
              <>
                <Typography variant="body2" color="text.secondary" mb={1}>
                  Zalogowano jako <strong>{currentUser.email}</strong>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser.firstName} {currentUser.lastName}
                </Typography>
              </>
            ) : (
              <Alert severity="info" sx={{ mt: 1 }}>
                Zaloguj się lub zarejestruj, aby synchronizować zadania z kontem.
              </Alert>
            )}
          </CardContent>
        </Card>

        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" fontWeight={600} mb={1}>
              Dostępność
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Aplikacja wspiera nawigację klawiaturą, widoczny fokus oraz czytniki ekranu.
              Użyj skrótu Tab, aby poruszać się po elementach interfejsu.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </PageTransition>
  );
}
