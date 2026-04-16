import { Bell,BellOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/useUserStore';
import ToggleSwitch from '../ToggleSwitch';

const NotifyToggle = () => {
  const { t } = useTranslation()
  const { isNotifyEnabled,toggleNotify } = useUserStore()
  return (
  <>
    <div className="flex items-center gap-4 px-1">
      <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 transition-colors text-indigo-400`}>
        {isNotifyEnabled ? <Bell size={20} /> : <BellOff size={20} />}
      </div>
      <div className="flex flex-col">
          <span className="text-sm font-black text-slate-800 dark:text-slate-100 leading-tight">
            { t('notifications.title') }
          </span>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
            {isNotifyEnabled ? t('notifications.enabled') : t('notifications.disabled')}
          </span>
        </div>
    </div>
    <ToggleSwitch active={isNotifyEnabled} onClick={toggleNotify} />
  </>
  )
}

export default NotifyToggle