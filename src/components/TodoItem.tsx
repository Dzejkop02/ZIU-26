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
import type { Priority, Todo } from '../types/todo.types';
import './TodoItem.css';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority, dueDate: Date) => void;
  onSelect: (todo: Todo) => void;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function toInputDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function TodoItem({ todo, onToggle, onDelete, onEdit, onSelect }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(todo.title);
  const [isEditingDate, setIsEditingDate] = useState(false);
  const dateRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingDate) dateRef.current?.showPicker?.();
  }, [isEditingDate]);

  function commitEdit() {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== todo.title) {
      onEdit(todo.id, trimmed, todo.priority, todo.dueDate);
    } else {
      setEditValue(todo.title);
    }
    setIsEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') commitEdit();
    if (e.key === 'Escape') {
      setEditValue(todo.title);
      setIsEditing(false);
    }
  }

  function handlePriorityChange(e: React.ChangeEvent<HTMLSelectElement>) {
    onEdit(todo.id, todo.title, e.target.value as Priority, todo.dueDate);
  }

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.value) return;
    onEdit(todo.id, todo.title, todo.priority, new Date(e.target.value));
    setIsEditingDate(false);
  }

  return (
    <article className="todo-card-container" onClick={() => !isEditing && onSelect(todo)} style={{ cursor: 'pointer' }}>
      {/* container-type: inline-size — umożliwia @container queries w TodoItem.css */}
    <Card
      variant="outlined"
      sx={{
        borderRadius: 2,
        transition: 'box-shadow 0.2s',
        '&:hover': { boxShadow: 3 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardContent className="todo-card-inner" sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 1, p: 2, '&:last-child': { pb: 2 } }}>
        {/* Top row: checkbox + title + delete */}
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          {/* Status icon — aspect-ratio: 1 */}
          <Box onClick={(e) => e.stopPropagation()} sx={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Checkbox
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              size="small"
              sx={{ p: 0 }}
              slotProps={{
                input: {
                  'aria-label': `Oznacz jako ${todo.completed ? 'aktywne' : 'ukończone'}: ${todo.title}`,
                },
              }}
            />
          </Box>

          {isEditing ? (
            <TextField
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={commitEdit}
              onKeyDown={handleKeyDown}
              size="small"
              fullWidth
              autoFocus
            />
          ) : (
            <Typography
              component="span"
              onDoubleClick={() => setIsEditing(true)}
              sx={{
                flex: 1,
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: 'text.primary',
                fontWeight: todo.completed ? 500 : 600,
                cursor: 'text',
                fontSize: '0.875rem',
                lineHeight: 1.4,
                wordBreak: 'break-word',
              }}
            >
              {todo.title}
            </Typography>
          )}

          {!isEditing && (
            <IconButton
              size="small"
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              aria-label={`Edytuj zadanie: ${todo.title}`}
              sx={{ flexShrink: 0 }}
            >
              <EditOutlinedIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={(e) => { e.stopPropagation(); onDelete(todo.id); }}
            aria-label={`Usuń zadanie: ${todo.title}`}
            sx={{ flexShrink: 0 }}
          >
            <DeleteOutlineIcon fontSize="small" />
          </IconButton>
        </Box>

        {/* Bottom row: date + priority + status chip */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1, mt: 'auto' }}>
          {isEditingDate ? (
            <input
              ref={dateRef}
              type="date"
              className="todo-card__date-input"
              defaultValue={toInputDate(todo.dueDate)}
              onChange={handleDateChange}
              onBlur={() => setIsEditingDate(false)}
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <Typography
              component="span"
              onClick={(e) => { e.stopPropagation(); setIsEditingDate(true); }}
              sx={{
                cursor: 'pointer',
                fontSize: '0.75rem',
                color: 'text.secondary',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline', color: 'primary.dark' },
              }}
            >
              {formatDate(todo.dueDate)}
            </Typography>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
            <select
              className={`todo-card__badge todo-card__badge--${todo.priority}`}
              value={todo.priority}
              onChange={handlePriorityChange}
              onClick={(e) => e.stopPropagation()}
              aria-label="Priorytet zadania"
              title="Zmień priorytet"
            >
              <option value="low">Niski</option>
              <option value="medium">Średni</option>
              <option value="high">Wysoki</option>
            </select>
            {todo.completed && (
              <Chip
                label="Ukończone"
                size="small"
                sx={{
                  bgcolor: 'success.dark',
                  color: 'success.contrastText',
                  fontWeight: 600,
                  '& .MuiChip-label': { color: 'success.contrastText' },
                }}
              />
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
    </article>
  );
}
