import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import './i18n'

const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Inter, sans-serif',
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme} defaultColorScheme="dark">
        <App />
        <ReactQueryDevtools initialIsOpen={true} />
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
