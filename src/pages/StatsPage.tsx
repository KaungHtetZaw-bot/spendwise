import { useState,useMemo } from 'react';
import { ArrowUpRight, ArrowDownRight, Calendar, ChevronDown, BarChart3, Check,PiIcon } from 'lucide-react';
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTransactions } from '../hooks/useTransactions';
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../hooks/useCurrency';

const StatsPage = () => {
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('today');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const { data: transactions = [] } = useTransactions();
  const { format,currency } = useCurrency()
  const [customDates, setCustomDates] = useState({
    start: '', // e.g., '2026-04-01'
    end: ''    // e.g., '2026-04-15'
  });

  const timeOptions = [
    { id: 'today', label: t('time.today') },
    { id: 'week', label: t('time.week') },
    { id: 'month', label: t('time.month') },
    { id: 'year', label: t('time.year') },
    // { id: 'custom', label: t('time.custom') },
  ];

  const colorPalette = [
    '#f43f5e',
    '#f59e0b',
    '#6366f1',
    '#94a3b8',
    '#e2e8f0',
  ];

  const { statsData, totalIncome, totalExpense } = useMemo(() => {
  const breakdown: Record<string, number> = {};
  let income = 0;
  let expense = 0;

  const filteredTransactions = transactions.filter(t => {
    const tDate = new Date(t.created_at);
    const now = new Date();

    switch (timeRange) {
      case 'today':
        return tDate.toDateString() === now.toDateString();
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return tDate >= weekAgo;
      case 'month':
        return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
      case 'year':
        return tDate.getFullYear() === now.getFullYear();
      case 'custom':
        if (!customDates.start || !customDates.end) return true; // Date မရွေးရသေးရင် အကုန်ပြမယ်
        const start = new Date(customDates.start);
        const end = new Date(customDates.end);
        end.setHours(23, 59, 59); // End date ကို နေ့ကုန်အထိ သတ်မှတ်မယ်
        return tDate >= start && tDate <= end;
      default:
        return true;
    }
  });

  filteredTransactions.forEach(t => {
    const amount = Number(t.amount);
    if (t.type === 'income') {
      income += amount;
    } else {
      expense += amount;
      const catName = t.categories?.name || 'General';
      breakdown[catName] = (breakdown[catName] || 0) + amount;
    }
  });

  // Chart data sorting & coloring...
  const chartData = Object.entries(breakdown)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .map((item, index) => ({
      ...item,
      color: colorPalette[index] || '#94a3b8' 
    }));

  return { statsData: chartData, totalIncome: income, totalExpense: expense };
}, [transactions, timeRange]);

  const expensePercentage = totalIncome > 0 ? Math.min(Math.round((totalExpense / totalIncome) * 100), 100) : 0;

  return (
    <div className="min-h-screen md:pt-5 pt-2.5 pb-24">
      <div className="mx-auto md:space-y-8 space-y-4">
        <div className="flex justify-between items-center md:pt-6 relative">
          <h1 className="md:text-2xl text-lg font-black text-slate-900 dark:text-white">{t('statistics')}</h1>
          
          <div className="relative">
            <button 
              onClick={() => setIsCalendarOpen(!isCalendarOpen)}
              className={`flex items-center gap-2 md:px-4 px-2 md:py-2 py-1 md:rounded-2xl rounded-xl shadow-xsx border transition-all active:scale-95 !text-sm font-black uppercase ${
                isCalendarOpen 
                ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-500/20' 
                : 'bg-white dark:bg-slate-900 border-slate-100 dark:border-slate-800 text-slate-500'
              }`}
            >
              <Calendar size={14} /> 
              {timeOptions.find(opt => opt.id === timeRange)?.label} 
              <ChevronDown size={14} className={`transition-transform duration-300 ${isCalendarOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCalendarOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsCalendarOpen(false)} />
                <div className="absolute right-0 mt-2 bg-white dark:bg-slate-900 md:rounded-[1.5rem] rounded-[1rem] shadow-2xl border border-slate-100 dark:border-slate-800 p-2 z-20 animate-in zoom-in-95 duration-200 origin-top-right min-w-[180px]">
                  {timeOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        setTimeRange(option.id);
                        if (option.id !== 'custom') setIsCalendarOpen(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3 text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors"
                    >
                      {option.label}
                      {timeRange === option.id && <Check size={14} className="text-indigo-500" />}
                    </button>
                  ))}

                  {/* Custom Date Inputs */}
                  {timeRange === 'custom' && (
                    <div className="mt-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase ml-1">From</p>
                        <input 
                          type="date" 
                          value={customDates.start}
                          onChange={(e) => setCustomDates(prev => ({ ...prev, start: e.target.value }))}
                          className="w-full p-2 text-[10px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="text-[8px] font-black text-slate-400 uppercase ml-1">To</p>
                        <input 
                          type="date" 
                          value={customDates.end}
                          onChange={(e) => setCustomDates(prev => ({ ...prev, end: e.target.value }))}
                          className="w-full p-2 text-[10px] font-bold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg outline-none focus:border-indigo-500"
                        />
                      </div>
                      <button 
                        disabled={!customDates.start || !customDates.end}
                        onClick={() => setIsCalendarOpen(false)}
                        className="w-full py-2.5 bg-indigo-600 text-white text-[9px] font-black uppercase rounded-xl shadow-lg shadow-indigo-500/20 active:scale-95 disabled:opacity-50"
                      >
                        Apply Filter
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-slate-900 md:p-6 p-3 md:rounded-[2rem] rounded-[1rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950 text-emerald-500 rounded-lg flex items-center justify-center mb-4">
              <ArrowUpRight size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('stats.total_income')}</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">{format(totalIncome)} <span className="text-[10px] font-medium opacity-50">{currency}</span></h3>
          </div>

          <div className="bg-white dark:bg-slate-900 md:p-6 p-3 md:rounded-[2rem] rounded-[1rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950 text-rose-500 rounded-lg flex items-center justify-center mb-4">
              <ArrowDownRight size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('stats.total_expense')}</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">{format(totalExpense)} <span className="text-[10px] font-medium opacity-50">{currency}</span></h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 md:p-8 p-4 md:rounded-[2.5rem] rounded-[1.25rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <div className="w-full h-64 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={1}
                  dataKey="value"
                  stroke="none"
                >
                  {statsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', fontWeight: 'bold' }}
                />
              </PieChart>
            </ResponsiveContainer>
            
            {/* Chart အလယ်က စာသား */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('stats.total_balance')}</p>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{expensePercentage}%</h2>
            </div>
          </div>
        </div>

        {/* Breakdown List */}
        <div className="md:space-y-4 space-y-2">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('stats.spending_breakdown')}</h3>
            <BarChart3 size={16} className="text-slate-300" />
          </div>

          <div className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.25rem] p-4 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm md:space-y-6 space-y-3">
            {statsData.length > 0 ? statsData.map((cat, index) => (
              <div key={index} className="space-y-2.5">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: cat.color }}></div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{cat.name}</span>
                  </div>
                  <span className="text-[11px] font-black text-slate-900 dark:text-white">
                    {format(cat.value)} {currency}
                  </span>
                </div>
                <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-1000 ease-out" 
                    style={{ width: `${(cat.value / totalExpense) * 100}%`, backgroundColor: cat.color }}
                  ></div>
                </div>
              </div>
            )) : (
              <div className="py-10 text-center opacity-30">
                 <PiIcon size={40} className="mx-auto mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-widest">{t('stats.no_data')}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsPage;