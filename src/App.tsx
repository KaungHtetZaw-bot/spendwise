import { useEffect } from 'react';
import './App.css'
import AppRoute from './routes/AppRoute'
import { useUserStore } from './store/useUserStore';

function App() {
  const { theme, useSystemTheme } = useUserStore();

  useEffect(() => {
    const root = document.documentElement;
    
    const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    if (useSystemTheme) {
      root.classList.toggle('dark', getSystemTheme() === 'dark');
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, useSystemTheme]);
  return (
    <>
      <AppRoute/>
    </>
  )
}

export default App
