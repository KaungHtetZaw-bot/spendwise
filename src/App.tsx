import { useEffect } from 'react';
import './App.css'
import AppRoute from './routes/AppRoute'
import { useUserStore } from './store/useUserStore';
import { StatusBar, Style } from '@capacitor/status-bar';

function App() {
  const { theme, useSystemTheme } = useUserStore();
  const setupStatusBar = async () => {
    await StatusBar.setOverlaysWebView({ overlay: false });
    // Status Bar ကို အနက်ရောင် (Dark) ပုံစံ ပြောင်းမယ်
    await StatusBar.setStyle({ style: Style.Dark });
    
    // Status Bar ရဲ့ Background color ကို မင်း app ရဲ့ dark color အတိုင်း ထည့်မယ်
    // ဥပမာ - Slate 900 (#0f172a)
    await StatusBar.setBackgroundColor({ color: '#0f172a' });
  };

  useEffect(()=>{
    setupStatusBar()
  },[])

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
    <div className='main-app-container'> 
      <AppRoute/>
    </div>
  )
}

export default App
