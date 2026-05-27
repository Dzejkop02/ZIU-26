import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import App from './App';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

async function enableMocking() {
  // MSW jest wyłączony domyślnie — odkomentuj poniżej aby włączyć mockowanie
  // if (import.meta.env.DEV) {
  //   const { worker } = await import('./mocks/browser');
  //   return worker.start({ onUnhandledRequest: 'bypass' });
  // }
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
          </ToastProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
});
