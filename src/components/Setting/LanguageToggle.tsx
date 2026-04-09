import  { useState } from 'react'
import { Globe } from 'lucide-react';

const LanguageToggle = () => {
  const [lang, setLang] = useState<'en' | 'mm'>('en');
  const handleLanguageToggle = () => {
    setLang(prev => prev === 'en' ? 'mm' : 'en');
  };
  
  return (
    <>
      <div className="flex items-center gap-4 px-1">
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 transition-colors">
          <Globe size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Language</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {lang === 'en' ? 'English (US)' : 'မြန်မာ (MM)'}
          </span>
        </div>
      </div>

      <button 
        onClick={handleLanguageToggle}
        className="relative w-20 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex items-center transition-all overflow-hidden border border-slate-200/50 dark:border-slate-700/50"
      >
        <div 
          className={`absolute h-7 w-9 bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-all duration-300 ${
            lang === 'mm' ? 'translate-x-9' : 'translate-x-0'
          }`} 
        />
        
        <div className="relative flex w-full justify-between px-2 text-[10px] font-black uppercase tracking-tighter z-10">
          <span className={lang === 'en' ? 'text-indigo-600' : 'text-slate-400'}>EN</span>
          <span className={lang === 'mm' ? 'text-indigo-600' : 'text-slate-400'}>MM</span>
        </div>
      </button>
    </>
  );
}

export default LanguageToggle