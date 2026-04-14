import { Edit2, Trash2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TransactionActionSheet = ({ isOpen, onClose, onEdit, onDelete, transaction }: any) => {
    const { t } = useTranslation()
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />
      
      {/* Sheet Content */}
      <div className="relative w-full bg-white dark:bg-slate-900 rounded-t-[2.5rem] p-8 pb-12 animate-in slide-in-from-bottom duration-300 shadow-2xl">
        <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full mx-auto mb-8" />
        
        <div className="mb-6">
          <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">{ t('actions.transaction_actions')}</h4>
          <p className="font-bold text-slate-900 dark:text-white truncate">{transaction?.note || 'No Description'}</p>
        </div>

        <div className="grid grid-cols-1 gap-3">
          <button 
            onClick={() => { onEdit(transaction); onClose(); }}
            className="flex items-center gap-4 w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-black text-indigo-600 dark:text-indigo-400 active:scale-95 transition-all"
          >
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><Edit2 size={18} /></div>
            { t('actions.edit') }
          </button>
          
          <button 
            onClick={() => { onDelete(transaction.id); onClose(); }}
            className="flex items-center gap-4 w-full p-4 bg-rose-50 dark:bg-rose-900/10 rounded-2xl font-black text-rose-500 active:scale-95 transition-all"
          >
            <div className="p-2 bg-white dark:bg-slate-800 rounded-xl shadow-sm"><Trash2 size={18} /></div>
            { t('actions.delete') }
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionActionSheet;