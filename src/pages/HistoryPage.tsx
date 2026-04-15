import { useState, useMemo } from 'react';
import { ArrowUpCircle, ArrowDownCircle, Search, Filter, X, ChevronDown, Check, Inbox, Trash2, Edit2 } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import { useTranslation } from 'react-i18next';
import { supabase } from '../lib/supabase';
import TransactionActionSheet from '../components/TransactionActionSheet';
import { useOutletContext } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore';
import { useCurrency } from '../hooks/useCurrency';

const HistoryPage = () => {
  const { t } = useTranslation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { data: transactions = [], isLoading, isError } = useTransactions();
  const [selectedT, setSelectedT] = useState<any>(null);
  const [isActionOpen, setIsActionOpen] = useState(false);
  const { onEditAction } = useOutletContext<any>();
  const { showToast } = useToastStore();
  // Filter Dropdown States
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'income' | 'expense'>('all');
  const { format,symbol } = useCurrency()

  const filterOptions = [
    { label: 'All', value: 'all' },
    { label: 'Incomes', value: 'income' },
    { label: 'Expenses', value: 'expense' },
  ];

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((t) => {
        const categoryName = t.categories?.name || '';
        const noteText = t.note || '';
        const searchContent = `${categoryName} ${noteText}`.toLowerCase();
        const matchesSearch = searchContent.includes(searchQuery.toLowerCase());
        
        const matchesType = filterType === 'all' || t.type === filterType;
        
        return matchesSearch && matchesType;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, searchQuery, filterType]);

  const handleItemClick = (t: any) => {
    setSelectedT(t);
    setIsActionOpen(true);
  };

  const onDelete = async (id: string) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this transaction?");
    if (isConfirmed) {
      try {
        const { error } = await supabase
          .from('transactions') // Table name ကို သေချာအောင် စစ်ပေးပါ
          .delete()
          .eq('id', id); // တကယ်လို့ ID column က user_id မဟုတ်ရင် 'id' လို့ပဲ သုံးပါ

        if (error) throw error;
        alert("Deleted successfully!");
        // Note: react-query သုံးထားရင် queryClient.invalidateQueries(['transactions']) လုပ်ပေးဖို့ လိုနိုင်ပါတယ်
      } catch (error: any) {
        showToast(error.messge,'danger')
      }
    }
  };

// --- EDIT LOGIC ---
  const onEdit = (transaction: any) => {
    onEditAction(transaction);
    setIsActionOpen(false);
  };

  return (
    <div className="min-h-screen pb-24">
      <div className="w-full flex justify-between items-center sticky md:-top-8 top-0 backdrop-blur-md md:py-4 py-2 z-20">
        <h1 className={`md:text-2xl text-lg font-black text-slate-900 dark:text-white transition-all duration-300 ${isSearchOpen ? 'opacity-0 scale-90 pointer-events-none absolute' : 'opacity-100 scale-100'}`}>
          { t('nav.history') }
        </h1>

        <div className="flex items-center gap-2">
          <div className={`relative flex items-center transition-all duration-500 ease-in-out ${isSearchOpen ? 'w-64 md:w-80' : 'w-10'}`}>
            <input 
              type="text"
              placeholder={t('search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus={isSearchOpen}
              className={`w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl py-2.5 pl-4 pr-10 text-sm font-bold outline-none transition-all duration-500 shadow-sm ${
                isSearchOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 pointer-events-none'
              }`}
            />
            <button 
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                if(isSearchOpen) setSearchQuery('');
              }}
              className={`absolute right-0 md:p-3 p-2 rounded-xl transition-colors ${isSearchOpen ? 'text-slate-400 hover:text-rose-500' : 'text-slate-500 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm'}`}
            >
              {isSearchOpen ? <X size={18} /> : <Search size={20} />}
            </button>
          </div>

          {/* Filter Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)} 
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest border transition-all shadow-sm ${
                isDropdownOpen 
                ? 'bg-indigo-600 border-indigo-600 text-white' 
                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500'
              }`}
            >
              <Filter size={14} />
              <span className="hidden sm:inline">{filterType}</span>
              <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isDropdownOpen && (
               <>
                 <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                 <div className="absolute right-0 md:w-52 w-30 mt-3 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 z-20 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                    {filterOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setFilterType(opt.value as any); setIsDropdownOpen(false); }}
                        className={`w-full md:px-4 px-2 md:py-3 py-1.5 md:text-[11px] text-xs font-black uppercase text-left transition-colors flex justify-between items-center ${
                          filterType === opt.value 
                          ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400' 
                          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        {opt.label}
                        {filterType === opt.value && <Check size={14} strokeWidth={3} />}
                      </button>
                    ))}
                 </div>
               </>
            )}
          </div>
        </div>
      </div>

      {/* Transactions List Area */}
      <div className="mx-auto space-y-3">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t,i) => (
            <div 
            key={i} 
            onClick={() => handleItemClick(t)}
            className="group flex items-center justify-between md:p-4 p-2 bg-white dark:bg-slate-900 md:rounded-[1.5rem] rounded-[0.75rem] shadow-sm border border-slate-100 dark:border-slate-800/50 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all active:scale-[0.99] relative overflow-hidden"
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl transition-transform group-hover:scale-110 ${
                t.type === 'income' 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600' 
                : 'bg-rose-50 dark:bg-rose-950/30 text-rose-500'
              }`}>
                {t.type === 'income' ? <ArrowUpCircle size={22} /> : <ArrowDownCircle size={22} />}
              </div>
              
              <div className="overflow-hidden">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm truncate max-w-[120px] md:max-w-xs">
                  {t.note || 'No Description'}
                </h3>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded-md">
                    {t.categories?.name || 'General'}
                  </span>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                    {new Date(t.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Amount - Action တွေ ပေါ်လာရင် ဒါကို ဖျောက်ထားချင်ရင် group-hover:hidden သုံးလို့ရတယ် */}
              <div className="text-right group-hover:opacity-0 transition-opacity duration-200">
                <p className={`text-sm font-black ${t.type === 'income' ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
                  {t.type === 'income' ? '+' : '-'} {format(t.amount)}  
                  <span className="ml-1 text-[10px] opacity-40 font-bold">{symbol}</span>
                </p>
              </div>

              {/* Action Buttons - Hover လုပ်မှ ပေါ်လာမယ့် ပုံစံ */}
              <div className="hidden md:absolute right-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                <button 
                  onClick={(e) => { e.stopPropagation(); onEdit(t); }}
                  className="p-2.5 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 rounded-xl hover:bg-indigo-600 hover:text-white transition-all shadow-sm"
                >
                  <Edit2 size={16} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); onDelete(t.transaction_id); }}
                  className="p-2.5 bg-rose-50 dark:bg-rose-950/30 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition-all shadow-sm"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>

          ))
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-32 text-slate-300 dark:text-slate-700">
            <div className="w-20 h-20 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center mb-4">
              <Inbox size={40} strokeWidth={1} />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em]">{ t('no_transactions_found') }</p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[10px] font-bold text-indigo-500 uppercase border-b border-indigo-500 pb-0.5"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
        <TransactionActionSheet 
          isOpen={isActionOpen} 
          transaction={selectedT}
          onClose={() => setIsActionOpen(false)}
          onEdit={() => onEdit(selectedT)}
          onDelete={() => onDelete(selectedT.transaction_id)}
        />
      </div>
    </div>
  );
};

export default HistoryPage;