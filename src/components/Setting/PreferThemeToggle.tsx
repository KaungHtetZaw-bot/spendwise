import { SunMoon } from 'lucide-react';
import { useUserStore } from '../../store/useUserStore';
import ToggleSwitch from '../ToggleSwitch';
import { useTranslation } from 'react-i18next';

const PreferThemeToggle = () => {
  const { t } = useTranslation()
  const { useSystemTheme, setUseSystemTheme } = useUserStore();

  return (
    <>
      <div className="flex items-center gap-4 px-1">
        <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 transition-colors text-indigo-400`}>
          <SunMoon size={20}/>
        </div>
        <div className='flex flex-col'>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ t('system') }</span>
          <span className="text-[10px] text-slate-400 font-medium uppercase">{ t('sync') }</span> 
        </div>
      </div>
      <ToggleSwitch active={useSystemTheme} onClick={() => setUseSystemTheme(!useSystemTheme)} />
    </>
  );
};

export default PreferThemeToggle;