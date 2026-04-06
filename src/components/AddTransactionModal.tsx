import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { useTransactionStore } from '../storage/useTransactionStore';
import type { FormData } from '../type/transaction';
import CalendarSection from './transaction-modal/CalendarSection';
import InputSection from './transaction-modal/InputSection';
import CategorySection from './transaction-modal/CategorySection';

const AddTransactionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {

  const { addTransaction } = useTransactionStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    type: 'expense' as 'income' | 'expense',
    amount: Number.NaN,
    date: new Date() as Date | null,
    category_id: '',
    note: '',
  });

  const handleSubmit = async () => {
    if (!formData.date || isNaN(formData.amount) || !formData.category_id || !formData.note) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        amount: formData.amount,
        type: formData.type,
        category_id: formData.category_id,
        date: formData.date.toISOString().split('T')[0],
        note: formData.note,
      };

      await addTransaction(payload as any);
      
      setFormData({
        type: 'expense',
        amount: Number.NaN,
        date: new Date(),
        category_id: '',
        note: '',
      });
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg h-[100dvh] bg-[#F8F9FD] dark:bg-slate-950 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
        
        <div className="bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800">
          <button onClick={onClose} className="p-2 border border-slate-100 dark:border-slate-800 rounded-full text-slate-400">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            <button 
              onClick={() => setFormData({ ...formData, type: 'income' })}
              className={`md:px-6 px-3 md:py-2 py-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'income' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              Income
            </button>
            <button 
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`md:px-6 px-3 md:py-2 py-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-500 shadow-sm' : 'text-slate-400'}`}
            >
              Expense
            </button>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 pb-[calc(8rem+env(safe-area-inset-bottom))] space-y-8 pb-32">

          <CalendarSection formData={formData} setFormData={setFormData}/>
          <InputSection formData={formData} setFormData={setFormData} inputName="note" />
          <InputSection formData={formData} setFormData={setFormData} inputName="amount" />

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Classification</label>
            <CategorySection formData={formData} setFormData={setFormData} />
            <div className='flex justify-center'>
              <button onClick={()=>{handleSubmit()}} className={`md:w-full w-1/2 px-2 md:py-5 py-3 mt-5 rounded-2xl font-black text-[11px] uppercase text-white shadow-xl transition-all active:scale-95 ${
                formData.type === 'income' ? 'bg-blue-600' : 'bg-rose-500'
              }`}>
                {isSubmitting ? 'Saving...' : 'Add Transaction'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;