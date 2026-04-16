import { Globe, Palette, Coins, Plus } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from './ToggleSwitch';
import { useAppSettings } from '../hooks/useAppSettings';

const QuickActionsCard = ({ onAddClick }: { onAddClick: () => void }) => {
  const { t } = useTranslation();
  const { 
    isDark, isMM, isUSD, 
    toggleTheme, toggleLanguage, toggleCurrency, 
    currentCurrency 
  } = useAppSettings();

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
          {t('control_center')}
        </h3>
        
        <div className="space-y-7">
          {/* Language Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500"><Globe size={18} /></div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-tight">{t('language')}</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{isMM ? 'မြန်မာဘာသာ' : 'English'}</span>
              </div>
            </div>
            <ToggleSwitch active={isMM} onClick={toggleLanguage} label={isMM ? "MM" : "EN"} />
          </div>

          {/* Theme Switch */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-2xl text-slate-500"><Palette size={18} /></div>
              <div className="flex flex-col">
                <span className="text-xs font-black uppercase tracking-tight">{t('appearance')}</span>
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
                <span className="text-xs font-black uppercase tracking-tight">{ t('currency') }</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase">{currentCurrency}</span>
              </div>
            </div>
            <ToggleSwitch active={isUSD} onClick={toggleCurrency} label={isUSD ? "$" : "K"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;