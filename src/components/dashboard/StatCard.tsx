import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'; // Lucide icons သုံးထားပါတယ်
import { useUserStore } from '../../store/useUserStore';
import { useCurrency } from '../../hooks/useCurrency';

const StatCard = ({ title, amount, variant,isLoading }: { title: string; amount: number; variant: 'income' | 'expense' | 'neutral',isLoading:boolean }) => {
  const isIncome = variant === 'income';
  const isExpense = variant === 'expense';
  const { profile } = useUserStore()
  const { format } = useCurrency();
  
  const colorClass = isIncome ? 'text-emerald-500' : isExpense ? 'text-rose-500' : 'text-indigo-500';
  const bgClass = isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10' : isExpense ? 'bg-rose-50 dark:bg-rose-500/10' : 'bg-indigo-50 dark:bg-indigo-500/10';

  if (isLoading) {
    return (
      <div className="p-3 md:p-6 min-h-[100px] md:min-h-[160px] rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 animate-pulse flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div className="p-1.5 md:p-3 rounded-lg md:rounded-xl bg-slate-100 dark:bg-slate-800 w-6 h-6 md:w-12 md:h-12" />
          <div className="hidden md:block h-4 w-20 bg-slate-100 dark:bg-slate-800 rounded shadow-sm" />
        </div>
        <div className="mt-2 md:mt-0 space-y-2">
          <div className="md:hidden h-2 w-12 bg-slate-100 dark:bg-slate-800 rounded" />
          <div className="flex items-baseline gap-2">
            <div className="h-6 md:h-10 w-24 md:w-32 bg-slate-100 dark:bg-slate-800 rounded shadow-sm" />
            <div className="h-3 w-8 bg-slate-50 dark:bg-slate-800/50 rounded" />
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="group p-3 md:p-6 min-h-[100px] md:min-h-[160px] rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95 md:hover:shadow-md flex flex-col justify-between overflow-hidden">
      
      {/* Icon & Title Row */}
      <div className="flex items-center justify-between gap-2">
        <div className={`p-1.5 md:p-3 rounded-lg md:rounded-xl ${bgClass} ${colorClass}`}>
          {isIncome && <ArrowUpRight className="w-3 h-3 md:w-6 md:h-6" />}
          {isExpense && <ArrowDownRight className="w-3 h-3 md:w-6 md:h-6" />}
          {!isIncome && !isExpense && <Wallet className="w-3 h-3 md:w-6 md:h-6" />}
        </div>
        <p className="hidden md:block text-xs md:text-sm font-bold text-slate-400 uppercase tracking-widest">
          {title}
        </p>
      </div>

      <div className="mt-2 md:mt-0">
        <p className="md:hidden text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">
          {title}
        </p>
        <div className="flex items-baseline gap-0.5 md:gap-1.5">
          <span className={`text-sm sm:text-lg md:text-3xl font-black tracking-tighter md:tracking-tight ${colorClass}`}>
            {format(amount)}
          </span>
          <span className="text-[7px] md:text-sm font-medium text-slate-400 inline">
            { profile?.currency ? profile.currency : 'MMK' }
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;