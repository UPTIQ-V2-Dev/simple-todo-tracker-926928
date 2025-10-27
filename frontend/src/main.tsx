import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/index.css';
import { App } from './App.tsx';
import { ThemeProvider } from './components/theme-provider';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: 1,
            refetchOnWindowFocus: false
        }
    }
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                defaultTheme='system'
                storageKey='todo-app-theme'
            >
                <App />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
