import { SunMoon } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';


const PreferThemeToggle = () => {
  const { useSystemTheme, setUseSystemTheme } = useUserStore();

  return (
    <>
      <div className="flex items-center gap-4 px-1">
          <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 transition-colors text-indigo-400`}>
                <SunMoon size={20}/>
            </div>
        <div className='flex flex-col'>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">System Default</span>
          <span className="text-[10px] text-slate-400 font-medium uppercase">Sync with device</span> 
        </div>
      </div>

      <button 
        onClick={() => setUseSystemTheme(!useSystemTheme)}
        className={`w-12 h-6 rounded-full transition-all relative ${useSystemTheme ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
      >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${useSystemTheme ? 'left-7' : 'left-1'}`} />
      </button>
    </>
  );
};

export default PreferThemeToggle;