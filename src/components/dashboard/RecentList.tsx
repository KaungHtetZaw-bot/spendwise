import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useCurrency } from "../../hooks/useCurrency";
import type { Transaction } from "../../type/transaction";

const RecentList = ({transactions,isLoading}: {transactions: Transaction[],isLoading:boolean}) => {
  const { t } = useTranslation();
    const navigate = useNavigate();
    const { format,symbol } = useCurrency()
  return (
    <>
    <section className="space-y-4 ">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold">{ t('recent_history') }</h3>
          <button onClick={() => navigate('/history')} className="text-xs font-semibold text-indigo-500 uppercase tracking-tighter">View All</button>
        </div>

        <div className="md:space-y-3 space-y-1.5 pb-30">
          {isLoading ? (
          // Loading ဖြစ်နေရင် Skeleton ၅ ခု ပြမယ်
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ): transactions.length==0 ? 
            <div className="text-center py-10 text-slate-400 text-sm font-medium bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800">
              { t('no_transactions') }
            </div> : transactions.map((item,i) => (
            <div 
              key={i} 
              className="flex items-center justify-between md:p-4 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex gap-3 items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  item.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {item.categories?.name ? item.categories?.name[0] : '?'}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.categories?.name}</p>
                  <p className="text-xs text-slate-500 truncate max-w-[120px]">{item.note}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black text-sm ${item.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {item.type === 'income' ? '+' : '-'} {format(item.amount)} {symbol}
                </p>
                <p className="text-[10px] text-slate-400 uppercase">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default RecentList


const SkeletonRow = () => (
  <div className="flex items-center justify-between md:p-4 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 animate-pulse">
    <div className="flex gap-3 items-center">
      <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800" />
      <div className="space-y-2">
        <div className="h-3 w-20 bg-slate-200 dark:bg-slate-800 rounded" />
        <div className="h-2 w-28 bg-slate-100 dark:bg-slate-800/50 rounded" />
      </div>
    </div>
    <div className="flex flex-col items-end space-y-2">
      <div className="h-3 w-16 bg-slate-200 dark:bg-slate-800 rounded" />
      <div className="h-2 w-12 bg-slate-100 dark:bg-slate-800/50 rounded" />
    </div>
  </div>
);