import { useState, useEffect } from 'react';
import { X, Save, TrendingDown, Target, Wallet } from 'lucide-react';
import { useCurrency } from '../../hooks/useCurrency';
import { useUserStore } from '../../store/useUserStore';
import { useTranslation } from 'react-i18next';

interface BudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BudgetModal = ({ isOpen, onClose }: BudgetModalProps) => {
  const { profile, updateProfile } = useUserStore();
  const { currency, rate } = useCurrency();
  const { t } = useTranslation();
  const [ isUpdating, setIsUpdating ] = useState<boolean>(false)
  
  const [displayIncome, setDisplayIncome] = useState<number>(0);
  const [displayBudget, setDisplayBudget] = useState<number>(0);
  const [percentage, setPercentage] = useState(80);

  useEffect(() => {
    if (profile && isOpen) {
      const rawIncome = currency === "USD" 
        ? profile.monthly_income / rate 
        : profile.monthly_income;

      const currentIncome = currency === "USD" 
      ? Number(rawIncome.toFixed(2)) 
      : Math.round(rawIncome);

      let currentBudget: number;
      if (profile.monthly_budget) {
        currentBudget = currency === "USD" 
        ? Number((currentIncome * percentage / 100).toFixed(2)) 
        : Math.round(currentIncome * percentage / 100);
      } else {
        currentBudget = currentIncome * 0.8;
      }

      const initialPercent = profile.monthly_income > 0 
        ? Math.round(((profile.monthly_budget || (profile.monthly_income * 0.8)) / profile.monthly_income) * 100)
        : 80;

      setDisplayIncome(currentIncome);
      setDisplayBudget(currentBudget);
      setPercentage(initialPercent);
    }
  }, [profile, isOpen, rate, currency]);

  const handleIncomeChange = (val: string) => {
  if (val === "") {
    setDisplayIncome(0);
    return;
  }
  const numVal = parseFloat(val);
  
  const formattedVal = currency === "USD" 
    ? Math.round(numVal * 100) / 100 
    : Math.round(numVal);

  setDisplayIncome(formattedVal);

  const newBudget = (formattedVal * percentage) / 100;
  setDisplayBudget(currency === "USD" ? Number(newBudget.toFixed(2)) : Math.round(newBudget));
};

  const handleSliderChange = (newPercent: number) => {
    setPercentage(newPercent);
    const newBudget = (displayIncome * newPercent) / 100;
    setDisplayBudget(newBudget);
  };

  const handleSave =async () => {
    const baseIncome = currency === "MMK" 
        ? Math.round(displayIncome) 
        : Math.round(displayIncome * rate);

    const baseBudget = currency === "MMK" 
        ? Math.round(displayBudget) 
        : Math.round(displayBudget * rate);
    if(profile?.monthly_budget===baseBudget && profile.monthly_income===baseIncome) return
   try {
    setIsUpdating(true)
    
    await updateProfile({monthly_budget:baseBudget,monthly_income:baseIncome})
    onClose();
   } catch (error) {
    console.log(error)
   }finally{
    setIsUpdating(false)
   }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4 bg-slate-950/40 backdrop-blur-sm animate-in fade-in duration-300">
      
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-t-[2.5rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500">
        
        {/* Header */}
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-slate-50 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">{t('budgetPage.settings_title')}</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{t('budgetPage.settings_desc')}</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-400 hover:text-rose-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-8">
          
          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
              <Wallet size={12} /> { t('monthly_income') } ({currency})
            </label>
            <div className="relative">
              <input
                type="text"
                step='0.001'
                value={displayIncome}
                placeholder='0.00'
                onChange={(e) => handleIncomeChange((e.target.value))}
                className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-slate-100 dark:border-slate-800 rounded-2xl p-4 font-black text-2xl text-indigo-600 outline-none focus:border-indigo-400 transition-all shadow-inner"
              />
            </div>
          </div>

          <hr className="border-slate-50 dark:border-slate-800" />

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('budgetPage.target_budget')}</p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{displayBudget}</h3>
            </div>
            <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">{t('budgetPage.allocation')}</p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">{percentage}%</h3>
            </div>
          </div>

          <div className="space-y-6">
            <div className="relative group px-1">
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={percentage}
                onChange={(e) => handleSliderChange(Number(e.target.value))}
                className="w-full h-4 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600 shadow-inner"
              />
              <div className="flex justify-between mt-4">
                 <div className="flex flex-col items-center gap-1 opacity-60">
                    <TrendingDown size={14} className="text-emerald-500" />
                    <span className="text-[8px] font-black text-slate-400 uppercase">{t('budgetPage.save_more')}</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <Target size={14} className="text-indigo-500" />
                    <span className="text-[8px] font-black text-slate-400 uppercase">{t('budgetPage.balanced')}</span>
                 </div>
                 <div className="flex flex-col items-center gap-1 opacity-60">
                    <TrendingDown size={14} className="text-rose-500 rotate-180" />
                    <span className="text-[8px] font-black text-slate-400 uppercase">{t('budgetPage.spend_more')}</span>
                 </div>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            disabled={isUpdating}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/30 transition-all active:scale-95 flex items-center justify-center gap-3"
          >
            <Save size={18} /> {isUpdating? t('actions.saving') : t('budgetPage.update_plan')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BudgetModal;