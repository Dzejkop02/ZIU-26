import { useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { FilterType, Priority, Todo } from '../types/todo.types';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string, priority: Priority, dueDate: Date) => void;
  onSelect: (todo: Todo) => void;
  filter: FilterType;
}

export function TodoList({ todos, onToggle, onDelete, onEdit, onSelect, filter }: TodoListProps) {
  const filteredTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((t) => !t.completed);
    if (filter === 'completed') return todos.filter((t) => t.completed);
    return todos;
  }, [todos, filter]);

  return (
    <>
      {/* Ogłoszenie dla czytników ekranu — role="status" implikuje aria-live="polite" */}
      <div role="status" aria-atomic="true" className="visually-hidden">
        {filteredTodos.length === 0
          ? 'Brak zadań spełniających kryteria filtru'
          : `Wyświetlono ${filteredTodos.length} zadań`}
      </div>

      {filteredTodos.length === 0 ? (
        <Box sx={{ py: 8, textAlign: 'center' }}>
          <Typography color="text.secondary">Brak zadań</Typography>
        </Box>
      ) : (
        <Box
          component="ul"
          aria-label="Lista zadań"
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 'clamp(0.75rem, 2vw, 1.5rem)',
            alignItems: 'start',
            listStyle: 'none',
            padding: 0,
            margin: 0,
          }}
        >
          <AnimatePresence>
            {filteredTodos.map((todo) => (
              <motion.li
                key={todo.id}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 48 }}
                transition={{ duration: 0.22 }}
                style={{ height: '100%' }}
              >
                <TodoItem
                  todo={todo}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onSelect={onSelect}
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </Box>
      )}
    </>
  );
}
