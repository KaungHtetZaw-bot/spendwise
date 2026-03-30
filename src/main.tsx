import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core';
import './index.css'
import App from './App.tsx'
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
const theme = createTheme({
  primaryColor: 'indigo',
  fontFamily: 'Inter, sans-serif',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="dark">
    <App />
    </MantineProvider>
  </StrictMode>,
)
