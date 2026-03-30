import React, { useState } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Search, Filter, X, ChevronDown, Check } from 'lucide-react';

const transactions = [
  { id: 1, title: 'Salary', amount: 1500000, type: 'income', date: '2026-03-29' },
  { id: 2, title: 'Lunch at KFC', amount: 12000, type: 'expense', date: '2026-03-29' },
  { id: 3, title: 'Grab Taxi', amount: 5000, type: 'expense', date: '2026-03-28' },
  { id: 4, title: 'Side Business', amount: 25000, type: 'income', date: '2026-03-28' },
];

const HistoryPage = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter Dropdown States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const filterOptions = [
    { label: 'All Transactions', value: 'all' },
    { label: 'Incomes Only', value: 'income' },
    { label: 'Expenses Only', value: 'expense' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24">
      <div className="max-w-3xl mx-auto flex justify-between items-center md:mb-8 mb-4">
        <h1 className={`text-2xl font-black text-slate-900 dark:text-white transition-opacity duration-300 ${isSearchOpen ? 'opacity-20' : 'opacity-100'}`}>
          History
        </h1>

        <div className="flex items-center gap-2 relative">
          <div className={`relative flex items-center transition-all duration-500 ease-in-out ${isSearchOpen ? 'md:w-64 w-40' : 'w-0'}`}>
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:rounded-2xl rounded-xl md:py-2 py-1 pl-4 pr-10 text-sm font-bold outline-none transition-all duration-500 ${
                isSearchOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
              }`}
            />
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if(isSearchOpen) setSearchQuery('');
              }}
              className="absolute right-2 p-1.5 text-slate-400 hover:text-indigo-600 transition-colors z-10"
            >
              {isSearchOpen ? <X size={18} /> : <Search size={20} />}
            </button>
          </div>

          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className={`flex items-center gap-2 px-4 md:py-2 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all ${
                isDropdownOpen 
                ? 'bg-indigo-600 border-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400'
              }`}
            >
              <Filter size={14} />
              <span className="hidden md:inline">{filterType}</span>
              <ChevronDown size={14} className={`${isDropdownOpen ? 'rotate-180' : ''} transition-transform`} />
            </button>

            {isDropdownOpen && (
               <div className="absolute right-0 mt-2 md:w-48 w-30 bg-white dark:bg-slate-900 md:rounded-2xl rounded-xl shadow-xl border border-slate-100 dark:border-slate-800 md:py-2 py-1 z-20 animate-in zoom-in-95">
                  {['all', 'income', 'expense'].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => { setFilterType(opt as any); setIsDropdownOpen(false); }}
                      className="w-full md:px-4 px-2 md:py-3 py-1.5 text-[11px] font-bold uppercase text-left text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex justify-between"
                    >
                      {opt} {filterType === opt && <Check size={14} />}
                    </button>
                  ))}
               </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto md:space-y-4 space-y-2">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <div key={t.id} className="flex items-center justify-between md:p-4 p-2 bg-white dark:bg-slate-900 md:rounded-[2rem] rounded-[1rem] shadow-xs border border-slate-50 dark:border-slate-800/50 hover:scale-[1.01] transition-transform">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${t.type === 'income' ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600' : 'bg-rose-50 dark:bg-rose-950/50 text-rose-500'}`}>
                  {t.type === 'income' ? <ArrowUpCircle size={22} /> : <ArrowDownCircle size={22} />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{t.title}</h3>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">{t.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-black ${t.type === 'income' ? 'text-blue-600' : 'text-slate-900 dark:text-white'}`}>
                  {t.type === 'income' ? '+' : '-'} {t.amount.toLocaleString()} <span className="text-[10px] opacity-50">Ks</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-40">
            <Filter size={48} className="mx-auto mb-4" />
            <p className="text-xs font-black uppercase tracking-[0.2em]">No results for this filter</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;