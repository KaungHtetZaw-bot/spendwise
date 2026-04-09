import CurrencyToggle from './CurrencyToggle'
import LanguageToggle from './LanguageToggle'
import NotifyToggle from './NotifyToggle'
import PreferThemeToggle from './PreferThemeToggle'

const PerSonalSettingGroup = () => {

    const PersonalsettingsGroups = [
        { component: PreferThemeToggle },
        { component: NotifyToggle },
        { component: LanguageToggle },
        { component: CurrencyToggle },
    ]
  return (
    <div className='space-y-3'>
      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">
        Personal Preference
      </h3>
      <div className='bg-white dark:bg-slate-900 md:rounded-[1.5rem] rounded-[0.75rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm'>
        {PersonalsettingsGroups.map((group, idx) => (
          <div className="p-4 flex items-center justify-between">
          < group.component key={idx} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default PerSonalSettingGroup