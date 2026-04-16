import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from '../ToggleSwitch';
import { useAppSettings } from '../../hooks/useAppSettings';

const LanguageToggle = () => {
  const { t } = useTranslation();
  const { isMM, toggleLanguage} = useAppSettings();
  
  return (
    <>
      <div className="flex items-center gap-4 px-1">
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 transition-colors">
          <Globe size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ t('language') }</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {isMM ? 'မြန်မာ (MM)' : 'English (US)'}
          </span>
        </div>
      </div>
      <ToggleSwitch active={isMM} onClick={toggleLanguage} label={isMM ? "MM" : "EN"} />
    </>
  );
}

export default LanguageToggle