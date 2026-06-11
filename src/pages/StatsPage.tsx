import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { PageTransition } from '../components/PageTransition';
import { useTodoContext } from '../context/TodoContext';

interface StatCardProps {
  label: string;
  value: number;
  color?: string;
}

function StatCard({ label, value, color = 'primary.main' }: StatCardProps) {
  return (
    <Box
      sx={{
        p: 3,
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        textAlign: 'center',
        bgcolor: 'background.paper',
        transition: 'box-shadow 0.15s',
        '&:hover': { boxShadow: 3 },
      }}
    >
      <Typography variant="h3" fontWeight={700} color={color}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" mt={0.5}>
        {label}
      </Typography>
    </Box>
  );
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

  return (
    <PageTransition>
      <Box
        component="main"
        id="main-content"
        tabIndex={-1}
        sx={{ maxWidth: 720, mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}
      >
        <header>
          <Typography variant="h4" fontWeight={700} mb={0.5}>
            Statystyki
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Przegląd Twoich zadań i postępów
          </Typography>
        </header>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 6 }}>
            <CircularProgress aria-label="Ładowanie statystyk" />
          </Box>
        ) : !error && (
          <>
            <Typography variant="h6" fontWeight={600} mb={2}>
              Ogólne
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' },
                gap: 2,
                mb: 4,
              }}
            >
              <StatCard label="Wszystkich zadań" value={total} />
              <StatCard label="Aktywnych" value={active} color="warning.main" />
              <StatCard label="Ukończonych" value={completed} color="success.main" />
              <StatCard label="Ukończono %" value={completionRate} color="info.main" />
            </Box>

            <Typography variant="h6" fontWeight={600} mb={2}>
              Aktywne wg priorytetu
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 2,
              }}
            >
              <StatCard label="Wysoki priorytet" value={highPriority} color="error.main" />
              <StatCard label="Średni priorytet" value={mediumPriority} color="warning.main" />
              <StatCard label="Niski priorytet" value={lowPriority} color="success.main" />
            </Box>
          </>
        )}
      </Box>
    </PageTransition>
  );
}
