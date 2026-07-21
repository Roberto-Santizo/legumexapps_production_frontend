import { createRoot } from 'react-dom/client'
import { NotificationProvider } from './features/shared/core/notifications/NotificationContext';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './config/config';
import { StrictMode } from 'react'
import { Toaster } from 'sonner';
import { AppInitializer } from './features/shared/core/initializer/AppInitializer';
import './index.css'
import AppRouter from './router';

const queryClient = new QueryClient;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider container={<Toaster />}>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AppInitializer>
            <AppRouter />
          </AppInitializer>
        </Provider>
      </QueryClientProvider>
    </NotificationProvider>
  </StrictMode>,
)
