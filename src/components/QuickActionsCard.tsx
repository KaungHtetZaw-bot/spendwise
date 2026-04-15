import { Globe, Palette, Coins, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';

const QuickActionsCard = ({ onAddClick }: { onAddClick: () => void }) => {
  const { t, i18n } = useTranslation();
  const { setTheme, profile, theme, updateProfile, setLanguage } = useUserStore();

  const isDark = theme.toLowerCase() === 'dark';
  const isMM = i18n.language === 'mm';
  const isUSD = profile?.currency === 'USD';

  // Theme Toggle Logic
  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    document.startViewTransition(() => setTheme(nextTheme));
  };

  // Language Toggle Logic
  const toggleLanguage = () => {
    const nextLang = isMM ? 'en' : 'mm';
    setLanguage(nextLang); // Store ထဲက language state ပါ update ဖြစ်အောင်
  };

  // Currency Toggle Logic (MMK <-> USD)
  const toggleCurrency = async () => {
    const nextCurrency = isUSD ? 'MMK' : 'USD';
    await updateProfile({ currency: nextCurrency });
  };

  return (
    <div className="flex flex-col gap-4">
      {/* New Transaction Button */}
      <button 
        onClick={onAddClick}
        className="w-full lg:py-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white lg:rounded-[1.5rem] rounded-[1rem] font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-500/30 active:scale-95 flex items-center justify-center gap-3"
      >
        <Plus size={18} strokeWidth={3} />
        {t('actions.add_transaction')}
      </button>

      {/* Preferences Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 lg:p-7 p-3 lg:rounded-[1.5rem] rounded-[1rem] shadow-sm">
        <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8 italic opacity-70">
          Control Center
        </h3>
        
        <div className="space-y-7">
          {/* Language Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500"><Globe size={18} /></div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-tight">{t('language')}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{isMM ? 'Myanmar' : 'English'}</span>
              </div>
            </div>
            <ToggleSwitch active={isMM} onClick={toggleLanguage} label={isMM ? "MM" : "EN"} />
          </div>

          {/* Theme Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500"><Palette size={18} /></div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-tight">Appearance</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{isDark ? 'Dark' : 'Light'}</span>
              </div>
            </div>
            <ToggleSwitch active={isDark} onClick={toggleTheme} />
          </div>

          {/* Currency Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500"><Coins size={18} /></div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-tight">Currency</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{profile?.currency || 'MMK'}</span>
              </div>
            </div>
            <ToggleSwitch active={isUSD} onClick={toggleCurrency} label={isUSD ? "$" : "K"} />
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable Custom Toggle Switch Component
const ToggleSwitch = ({ active, onClick, label }: { active: boolean, onClick: () => void, label?: string }) => (
  <button 
    onClick={onClick}
    className={`w-12 h-6 rounded-full relative transition-all duration-500 flex items-center shadow-inner ${
      active ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
    }`}
  >
    <div className={`absolute w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-md flex items-center justify-center overflow-hidden ${
      active ? 'left-7' : 'left-1'
    }`}>
       {label && <span className="text-[8px] font-black text-indigo-600 leading-none">{label}</span>}
    </div>
  </button>
);

export default QuickActionsCard;