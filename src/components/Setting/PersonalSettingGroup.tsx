import CurrencyToggle from './CurrencyToggle'
import LanguageToggle from './LanguageToggle'
import NotifyToggle from './NotifyToggle'
import PreferThemeToggle from './PreferThemeToggle'
import { useTranslation } from 'react-i18next'

const PerSonalSettingGroup = () => {
  const { t } = useTranslation()
  const PersonalsettingsGroups = [
      { component: PreferThemeToggle },
      { component: NotifyToggle },
      { component: LanguageToggle },
      { component: CurrencyToggle },
  ]
  return (
    <div className='space-y-3'>
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">
        { t('personal') }
      </h3>
      <div className='bg-white dark:bg-slate-900 md:rounded-[1.5rem] rounded-[0.75rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm'>
        {PersonalsettingsGroups.map((group, idx) => (
          <div className="p-4 flex items-center justify-between" key={idx}>
          < group.component />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerSonalSettingGroup