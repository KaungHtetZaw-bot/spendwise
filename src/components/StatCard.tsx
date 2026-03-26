import { ArrowUpRight, ArrowDownRight, Wallet } from 'lucide-react'; // Lucide icons သုံးထားပါတယ်

const StatCard = ({ title, amount, variant }: { title: string; amount: number; variant: 'income' | 'expense' | 'neutral' }) => {
  const isIncome = variant === 'income';
  const isExpense = variant === 'expense';
  
  const colorClass = isIncome ? 'text-emerald-500' : isExpense ? 'text-rose-500' : 'text-indigo-500';
  const bgClass = isIncome ? 'bg-emerald-50 dark:bg-emerald-500/10' : isExpense ? 'bg-rose-50 dark:bg-rose-500/10' : 'bg-indigo-50 dark:bg-indigo-500/10';

  return (
    <div className="group p-3 md:p-6 min-h-[100px] md:min-h-[160px] rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all active:scale-95 md:hover:shadow-md flex flex-col justify-between overflow-hidden">
      
      {/* Icon & Title Row */}
      <div className="flex items-center justify-between gap-2">
        <div className={`p-1.5 md:p-3 rounded-lg md:rounded-xl ${bgClass} ${colorClass}`}>
          {isIncome && <ArrowUpRight className="w-3 h-3 md:w-6 md:h-6" />}
          {isExpense && <ArrowDownRight className="w-3 h-3 md:w-6 md:h-6" />}
          {!isIncome && !isExpense && <Wallet className="w-3 h-3 md:w-6 md:h-6" />}
        </div>
        <p className="hidden md:block text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest truncate">
          {title}
        </p>
      </div>

      {/* Amount Section */}
      <div className="mt-2 md:mt-0">
        <p className="md:hidden text-[8px] font-bold text-slate-400 uppercase tracking-tighter mb-0.5">
          {title}
        </p>
        <div className="flex items-baseline gap-0.5 md:gap-1.5">
          <span className={`text-sm sm:text-lg md:text-3xl font-black tracking-tighter md:tracking-tight ${colorClass}`}>
            {amount.toLocaleString()}
          </span>
          <span className="text-[7px] md:text-sm font-medium text-slate-400 hidden sm:inline">
            MMK
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatCard;