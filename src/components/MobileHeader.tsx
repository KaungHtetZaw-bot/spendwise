import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Moon, Sun, Languages, EllipsisVertical, LogOut } from "lucide-react";
import { useTranslation } from "react-i18next";

const MobileHeader = () => {
  const { profile, setTheme, theme, language,setLanguage } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const { i18n,t } = useTranslation()

  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "mm" : "en";
    setLanguage(nextLang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 md:py-4 py-2 md:hidden backdrop-blur-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black shadow-sm">
            {profile?.name ? profile.name.charAt(0).toUpperCase() : "K"}
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{ t('greeting') }</p>
            <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 mt-1">{profile?.name || "User"}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
          </button>

          {/* Three Dots / Settings Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-xl transition-colors active:bg-indigo-100 dark:active:bg-indigo-900 ${isOpen ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <EllipsisVertical size={20} />
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-4 top-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="p-2 space-y-1">
              
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors active:bg-slate-100 dark:active:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  {theme === "light" ? (
                    <Moon size={18} className="text-indigo-400" />
                  ) : (
                    <Sun size={18} className="text-amber-500" />
                  )}
                </div>
                  <span className="text-sm font-black uppercase opacity-50">
                    {theme === "light" ? "Night" : "Day"}
                  </span>              
              </button>

              <button 
                onClick={toggleLanguage}
                className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors active:bg-slate-100 dark:active:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  <Languages size={18} className="text-emerald-500" />
                </div>
                <span className="text-sm font-black uppercase opacity-50">{ (language === 'en' || i18n.language === 'en') ? "MM" : "EN" }</span>
              </button>

              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1 mx-2" />

              <button className="w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 transition-colors">
                <LogOut size={18} />
                <span className="text-sm font-bold">{ t('sign_out')}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileHeader;