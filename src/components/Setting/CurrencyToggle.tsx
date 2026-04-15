import { Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/useUserStore';

const CurrencyToggle = () => {
  const { t } = useTranslation()
  const { profile, setProfile } = useUserStore()
  const currency = profile?.currency ?? 'MMK';
  const handleLanguageToggle = () => {
    if (!profile) return;
    setProfile({currency:currency === "MMK" ? "USD" : "MMK"})
  };
  return (
    <>
      <div className="flex items-center gap-4 px-1">
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 transition-colors">
          <Coins size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ t('currency') }</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {currency === 'MMK' ? 'MMK (Ks)' : 'USD ($)'}
          </span>
        </div>
      </div>

      <button 
        onClick={handleLanguageToggle}
        className="relative w-20 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl p-1 flex items-center transition-all overflow-hidden border border-slate-200/50 dark:border-slate-700/50"
      >
        <div 
          className={`absolute h-7 w-9 bg-white dark:bg-slate-700 rounded-lg shadow-sm transition-all duration-300 ${
            currency === 'USD' ? 'translate-x-9' : 'translate-x-0'
          }`} 
        />
        
        <div className="relative flex w-full justify-between px-2 text-[10px] font-black uppercase tracking-tighter z-10">
          <span className={currency === 'MMK' ? 'text-indigo-600' : 'text-slate-400'}>MMK</span>
          <span className={currency === 'USD' ? 'text-indigo-600' : 'text-slate-400'}>USD</span>
        </div>
      </button>
    </>
  )
}

export default CurrencyToggle