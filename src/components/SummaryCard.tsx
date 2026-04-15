import { Target, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const SummaryCard = () => {
    const { t } = useTranslation();
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-[1.5rem] shadow-xs">
      <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-6 italic">{t('insights.title')}</h3>
      
      <div className="space-y-6">
        <div className="p-4 bg-indigo-50 dark:bg-indigo-500/5 rounded-2xl border border-indigo-100 dark:border-indigo-500/10">
          <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
            <Target size={16} strokeWidth={3} />
            <span className="text-[10px] font-black uppercase tracking-tighter">{t('insights.budget_tip')}</span>
          </div>
          <p className="text-[11px] font-bold leading-relaxed text-slate-600 dark:text-slate-300">
             "{t('insights.tip_1')}"
          </p>
        </div>

        <div className="flex items-center gap-3 px-1">
          <div className="p-2 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-lg"><TrendingUp size={16} /></div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase leading-none">{t('insights.status')}</p>
            <p className="text-xs font-bold mt-1">{t('insights.on_track')}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;