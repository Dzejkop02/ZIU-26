import { AnimatePresence, motion } from 'framer-motion';
import { useToastContext } from '../context/ToastContext';

const toastVariants = {
  initial: { opacity: 0, x: 48, scale: 0.9 },
  animate: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 300, damping: 24 },
  },
  exit: {
    opacity: 0,
    x: 48,
    scale: 0.85,
    transition: { duration: 0.18 },
  },
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastContext();

  return (
    <div
      aria-live="polite"
      aria-label="Powiadomienia"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        zIndex: 999,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        alignItems: 'flex-end',
        pointerEvents: 'none',
      }}
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            layout
            variants={toastVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={`toast toast--${toast.type}`}
            onClick={() => removeToast(toast.id)}
            title="Kliknij aby zamknąć"
            style={{ pointerEvents: 'auto' }}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
