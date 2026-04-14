import { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import type { FormData, Transaction } from '../type/transaction';
import CalendarSection from './transaction-modal/CalendarSection';
import InputSection from './transaction-modal/InputSection';
import CategorySection from './transaction-modal/CategorySection';
import { useTranslation } from 'react-i18next';
import { useAddTransaction, useEditTransaction } from '../hooks/useTransactions';
import { useToastStore } from '../store/useToastStore';

const AddTransactionModal = ({ isOpen, onClose, hasData }: { isOpen: boolean; onClose: () => void; hasData: Transaction }) => {
  const isEditMode = !!hasData;
  const { t } = useTranslation();
  const { mutate: addTransaction } = useAddTransaction();
  const { mutate: editTransaction } = useEditTransaction();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showToast } = useToastStore();

  const [formData, setFormData] = useState<FormData>({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    date: String(new Date().toISOString().split('T')[0]),
    category_id: '',
    note: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (hasData) {
        setFormData({
          type: hasData.type,
          amount: hasData.amount,
          date: hasData.date,
          category_id: hasData.category_id,
          note: hasData.note,
        });
      } else {
        // Add mode ဆိုရင် default ပြန်ထားမယ်
        setFormData({
          type: 'expense',
          amount: '',
          date: String(new Date().toISOString().split('T')[0]),
          category_id: '',
          note: '',
        });
      }
    }
  }, [isOpen, hasData]);

  const handleSubmit = async () => {
    if (!formData.date || formData.amount === '' || !formData.category_id || !formData.note) {
      showToast(t('errors.required_fields'), 'warning');
      return;
    }
    const payload = {
      amount: Number(formData.amount),
      type: formData.type,
      category_id: formData.category_id,
      date: formData.date.toString().split('T')[0],
      note: formData.note,
    };

    setIsSubmitting(true);
    try {

      if(isEditMode && hasData.transaction_id){
        editTransaction(
          { transactionId: hasData.transaction_id, updates:payload }, 
          {
            onSuccess: () => {
              showToast(t('success.transaction_updated'),'success')
            },
            onError: () => {
              showToast(t('errors.update_failed'),'danger')
              setIsSubmitting(false);
            }
          }
        );
      }else{
        addTransaction(payload, {
          onSuccess: () => {
            showToast(t('success.added'),'success')
          },
          onError: () => {
            showToast(t('errors.add_failed'), 'danger');
            setIsSubmitting(false);
          }
      });
      }

      setFormData({
        type: formData.type,
        amount: '',
        date: String(new Date().toISOString().split('T')[0]),
        category_id: '',
        note: '',
      });
      onClose();
    } catch (error) {
      console.error("Submission failed:", error);
      showToast(t(''), 'danger');
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
              {t('income')}
            </button>
            <button 
              onClick={() => setFormData({ ...formData, type: 'expense' })}
              className={`md:px-6 px-3 md:py-2 py-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${formData.type === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-500 shadow-sm' : 'text-slate-400'}`}
            >
              {t('expense')}
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
                {isSubmitting ? t('actions.saving') : (isEditMode ? t('actions.update_transaction') : t('actions.add_transaction'))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;