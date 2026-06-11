import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import type { Priority } from '../types/todo.types';

interface AddTodoFormProps {
  onAdd: (title: string, priority: Priority, dueDate: Date) => void;
  onClose?: () => void;
}

function todayString(): string {
  return new Date().toISOString().split('T')[0];
}

export function AddTodoForm({ onAdd, onClose }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('low');
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    commit();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      commit();
    }
  }

  return (
    <Box
      component="form"
      aria-label="Dodaj nowe zadanie"
      onSubmit={handleSubmit}
      sx={{
        width: '100%',
        maxWidth: 420,
        minHeight: { xs: 'auto', sm: '100svh' },
        bgcolor: 'background.paper',
        p: { xs: 3, sm: 6 },
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      {/* role="status" implikuje aria-live="polite" — nie łączymy obu */}
      <div role="status" className="visually-hidden">
        {lastAdded ? `Dodano zadanie: ${lastAdded}` : ''}
      </div>

      <Typography variant="h6" textAlign="center" fontWeight={700} mb={1}>
        Dodaj nowe zadanie
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1 }}>
          <TextField
            fullWidth
            id="todo-title"
            label="Tytuł"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => setTitleTouched(true)}
            autoFocus
            onKeyDown={handleKeyDown}
            error={titleError}
            slotProps={{
              htmlInput: {
                'aria-required': 'true',
                'aria-invalid': titleError || undefined,
                'aria-describedby': titleError ? 'title-err' : undefined,
              },
            }}
          />
          {titleError && (
            <span
              id="title-err"
              role="alert"
              style={{ color: '#B71C1C', fontSize: '0.75rem', display: 'block', marginTop: 4 }}
            >
              Tytuł jest wymagany
            </span>
          )}
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon aria-hidden={true} />}
          type="submit"
          aria-label="Dodaj zadanie"
          disabled={!title.trim()}
          sx={{ whiteSpace: 'nowrap', flexShrink: 0, mt: '8px' }}
        >
          Dodaj
        </Button>
      </Box>

      <TextField
        type="date"
        fullWidth
        id="todo-due-date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        label="Termin"
        slotProps={{
          inputLabel: { shrink: true },
          htmlInput: { 'aria-required': 'true' },
        }}
      />

      <TextField
        select
        fullWidth
        value={priority}
        onChange={(e) => setPriority(e.target.value as Priority)}
        label="Priorytet"
      >
        <MenuItem value="low">Niski</MenuItem>
        <MenuItem value="medium">Średni</MenuItem>
        <MenuItem value="high">Wysoki</MenuItem>
      </TextField>

      <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          disabled={!title.trim()}
        >
          Zapisz
        </Button>
        {onClose && (
          <Button variant="outlined" onClick={onClose} fullWidth>
            Anuluj
          </Button>
        )}
      </Box>
    </Box>
  );
}
