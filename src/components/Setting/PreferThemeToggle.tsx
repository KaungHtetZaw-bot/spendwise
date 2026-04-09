import { Sun, Moon } from 'lucide-react';
import { useUserStore } from '../../storage/useUserStore';

const PreferThemeToggle = () => {
  const { profile, setTheme } = useUserStore();
  const isDarkMode = profile?.theme?.toLowerCase() === 'night';

  const handleThemeToggle = () => {
    const nextTheme = isDarkMode ? 'day' : 'night';
    setTheme(nextTheme);
  };
  return (
    <>
        <div className="flex items-center gap-4 px-1">
            <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 transition-colors ${isDarkMode ? 'text-indigo-400' : 'text-amber-500'}`}>
                {isDarkMode ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Dark Mode</span>
        </div>
        <button 
        onClick={handleThemeToggle}
        className={`w-12 h-6 rounded-full transition-all relative ${isDarkMode ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
        >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isDarkMode ? 'left-7' : 'left-1'}`} />
        </button>
    </>
  )
}

export default PreferThemeToggle;