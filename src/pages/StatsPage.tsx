import React, { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Calendar, ChevronDown, BarChart3, Check } from 'lucide-react';

const StatsPage = () => {
  const [timeRange, setTimeRange] = useState('This Month');
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Calendar Options
  const timeOptions = ['Today', 'This Week', 'This Month', 'This Year', 'Custom Range'];

  const categoryStats = [
    { name: 'Food & Drinks', amount: 450000, percentage: 45, color: 'bg-rose-500' },
    { name: 'Shopping', amount: 250000, percentage: 25, color: 'bg-amber-500' },
    { name: 'Transportation', amount: 150000, percentage: 15, color: 'bg-indigo-500' },
    { name: 'Others', amount: 150000, percentage: 15, color: 'bg-slate-400' },
  ];

  return (
    <div className="min-h-screen dark:bg-slate-950 md:pt-5 pt-2.5 pb-24">
      <div className="max-w-xl mx-auto md:space-y-8 space-y-4">
        <div className="flex justify-between items-center md:pt-6 relative">
          <h1 className="md:text-2xl text-xl font-black text-slate-900 dark:text-white">Statistics</h1>
          
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
              {timeRange} 
              <ChevronDown size={14} className={`transition-transform duration-300 ${isCalendarOpen ? 'rotate-180' : ''}`} />
            </button>

            {isCalendarOpen && (
              <>
                <div className="fixed w-30 inset-0 z-10" onClick={() => setIsCalendarOpen(false)} />
                <div className="absolute right-0 mt-2 bg-white dark:bg-slate-900 md:rounded-[1.5rem] rounded-[0.75rem] shadow-xl border border-slate-100 dark:border-slate-800 md:py-2 py-1 z-20 animate-in zoom-in-95 whitespace-nowrap duration-200 origin-top-right">
                  {timeOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setTimeRange(option);
                        setIsCalendarOpen(false);
                      }}
                      className="w-full flex items-center justify-between md:px-5 px-2.5 md:py-3 py-1.75 !text-sm font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      {option}
                      {timeRange === option && <Check size={14} className="text-indigo-500" />}
                    </button>
                  ))}
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
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Income</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">1.5M <span className="text-[10px] font-medium opacity-50">Ks</span></h3>
          </div>

          <div className="bg-white dark:bg-slate-900 md:p-6 p-3 md:rounded-[2rem] rounded-[1rem] border border-slate-100 dark:border-slate-800 shadow-sm">
            <div className="w-10 h-10 bg-rose-50 dark:bg-rose-950 text-rose-500 rounded-lg flex items-center justify-center mb-4">
              <ArrowDownRight size={20} />
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Expense</p>
            <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">1.0M <span className="text-[10px] font-medium opacity-50">Ks</span></h3>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 md:p-8 p-6 md:rounded-[2.5rem] rounded-[1.25rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col items-center">
          <div className="relative w-44 h-44 flex items-center justify-center">
             <div className="absolute inset-0 border-[16px] border-slate-100 dark:border-slate-800 rounded-full"></div>
             <div className="absolute inset-0 border-[16px] border-indigo-500 rounded-full border-t-transparent border-r-transparent rotate-45"></div>
             <div className="text-center">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Expenses</p>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">65%</h2>
             </div>
          </div>
          <p className="mt-8 text-xs font-bold text-slate-400 text-center leading-relaxed">
            You spent <span className="text-indigo-600 font-black">15% more</span> than last month. 
          </p>
        </div>

        {/* Breakdown List */}
        <div className="md:space-y-4 space-y-3">
          <div className="flex justify-between items-center px-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Spending Breakdown</h3>
            <BarChart3 size={16} className="text-slate-300" />
          </div>

          <div className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.8rem] p-5 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
            {categoryStats.map((cat, index) => (
              <div key={index} className="space-y-2.5">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${cat.color} shadow-sm`}></div>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{cat.name}</span>
                  </div>
                  <span className="text-[11px] font-black text-slate-900 dark:text-white">{cat.amount.toLocaleString()} Ks</span>
                </div>
                <div className="w-full h-2 bg-slate-50 dark:bg-slate-800 rounded-full overflow-hidden shadow-inner">
                  <div 
                    className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out`} 
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default StatsPage;