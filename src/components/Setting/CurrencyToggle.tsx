import { Coins } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ToggleSwitch from '../ToggleSwitch';
import { useAppSettings } from '../../hooks/useAppSettings';

const CurrencyToggle = () => {
  const { t } = useTranslation()
  const { isUSD, toggleCurrency } = useAppSettings();

  return (
    <>
      <div className="flex items-center gap-4 px-1">
        <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-500 transition-colors">
          <Coins size={20} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ t('currency') }</span>
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            {isUSD ? 'USD ($)' :  'MMK (Ks)' }
          </span>
        </div>
      </div>
      <ToggleSwitch active={isUSD} onClick={toggleCurrency} label={isUSD ? "$" : "K"} />
    </>
  )
}

export default CurrencyToggle