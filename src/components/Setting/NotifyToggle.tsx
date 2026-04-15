import { Bell,BellOff } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/useUserStore';

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
      {/* <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{ t('notifications') }</span> */}
    </div>
    <button 
    onClick={toggleNotify}
    className={`w-12 h-6 rounded-full transition-all relative ${isNotifyEnabled ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
    >
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isNotifyEnabled ? 'left-7' : 'left-1'}`} />
    </button>
  </>
  )
}

export default NotifyToggle