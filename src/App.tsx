import { useEffect } from 'react';
import './App.css'
import AppRoute from './routes/AppRoute'
import { useUserStore } from './storage/useUserStore';

function App() {
  const { theme } = useUserStore();

  useEffect(() => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme]);

  return (
    <>
      
        <AppRoute/>
      
    </>
  )
}

export default App
