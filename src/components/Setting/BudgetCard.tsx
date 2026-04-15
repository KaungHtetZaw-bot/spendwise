import { Coins, Check, X, AlertTriangle, Target, TrendingDown } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../../store/useUserStore';
import { useTransactions } from '../../hooks/useTransactions';
import { useCurrency } from '../../hooks/useCurrency';
import BudgetModal from './BudgetModal';

interface BudgetCardProps {
  onOpenModal:(isOpen: boolean)=>void
}

const BudgetCard = ({onOpenModal}:BudgetCardProps) => {
  const { t } = useTranslation();
  const { profile } = useUserStore();
  const { data: transactions = [] } = useTransactions();
  const { format, currency, symbol } = useCurrency();

  const [isEditing, setIsEditing] = useState(false);
  
  // profile ထဲက values တွေကို local state အဖြစ်ထားမယ်
  const monthlyIncome = profile?.monthly_income ?? 1000000
  const [income, setIncome] = useState(profile?.monthly_income || 0);
  const [tempBudget, setTempBudget] = useState<number>(profile?.monthly_budget ?? monthlyIncome * 0.8);

  useEffect(() => {
    if (profile) {
      setIncome(profile.monthly_income);
      setTempBudget(profile.monthly_budget || profile.monthly_income * 0.8);
    }
  }, [profile]);

  const totalExpense = useMemo(() => {
    return transactions
      .filter((t: any) => t.type === 'expense')
      .reduce((acc: number, curr: any) => acc + Number(curr.amount), 0);
  }, [transactions]);

  const currentPercent = Math.round((tempBudget / income) * 100) || 0;

  const usagePercentage = useMemo(() => {
    if (!tempBudget) return 0;
    return Math.min((totalExpense / tempBudget) * 100, 100);
  }, [totalExpense, tempBudget]);

  const isOverLimit = (totalExpense / tempBudget) * 100 >= 100;
  const isWarning = (totalExpense / tempBudget) * 100 >= 80;

  const handleSave = () => {
    // TODO: Supabase Update Logic { monthly_budget: tempBudget }
    setIsEditing(false);
  };

  return (
    <div className={`relative overflow-hidden group md:rounded-[2.5rem] rounded-[1.8rem] md:p-8 p-6 text-white shadow-xl transition-all duration-700 ${
      isOverLimit ? 'bg-rose-600 shadow-rose-500/30' : isWarning ? 'bg-amber-500 shadow-amber-500/30' : 'bg-indigo-600 shadow-indigo-500/30'
    }`}>
        
        <div className="absolute -top-4 -right-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
            <Coins size={140} />
        </div>

        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
              {isEditing ? t('adjust_limit') : t('monthly_income')}
            </p>
            {isWarning && <AlertTriangle size={18} className="animate-pulse text-white" />}
          </div>

          {isEditing ? (
            /* --- EDIT MODE: Slider & Interactive Amount --- */
            <div className="mt-4 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="flex justify-between items-end">
                <h3 className="text-3xl font-black tracking-tighter">
                  {format(tempBudget)} <span className="text-sm opacity-60">{currency}</span>
                </h3>
                <span className="text-xl font-black text-white/90 bg-white/20 px-3 py-1 rounded-xl">{currentPercent}%</span>
              </div>

              <div className="space-y-3">
                <input 
                  type="range" min="10" max="100" step="1"
                  value={currentPercent}
                  onChange={(e) => setTempBudget((income * Number(e.target.value)) / 100)}
                  className="w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer accent-white"
                />
                <div className="flex justify-between text-[8px] font-black uppercase opacity-60 tracking-widest">
                  <span>Saver (10%)</span>
                  <span>Max (100%)</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={handleSave} className="flex-1 py-3 bg-white text-indigo-600 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg">
                  <Check size={14} /> {t('save_budget')}
                </button>
                <button onClick={() => setIsEditing(false)} className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all">
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            /* --- VIEW MODE --- */
            <div className="mt-2">
              <h3 className="text-4xl font-black tracking-tighter flex items-baseline gap-2">
                {format(income)} 
                <span className="text-xs font-bold opacity-60 uppercase tracking-widest">{currency}</span>
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Target size={12} className="opacity-60" />
                <p className="text-[10px] font-bold opacity-80">
                  {t('budget_limit')}: {format(tempBudget)} {symbol} ({currentPercent}%)
                </p>
              </div>
            </div>
          )}

          {/* Progress Bar Section (Always visible for context) */}
          {!isEditing && (
            <div className="mt-8 space-y-3">
              <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                <span className="opacity-70">{t('spending_progress')}</span>
                <span>{Math.round(usagePercentage)}%</span>
              </div>
              <div className="h-2.5 w-full bg-black/15 rounded-full overflow-hidden p-[2px]">
                <div 
                  className="h-full bg-white rounded-full transition-all duration-1000 ease-out shadow-sm"
                  style={{ width: `${usagePercentage}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] font-black uppercase tracking-tighter opacity-70 pt-1">
                <span>Spent: {format(totalExpense)}</span>
                <span>Left: {format(tempBudget - totalExpense)}</span>
              </div>

              <button 
                onClick={() => onOpenModal(true)}
                className="mt-4 px-6 py-3 bg-white/15 hover:bg-white text-white hover:text-indigo-600 backdrop-blur-md rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/20 active:scale-95 flex items-center gap-2"
              >
                <TrendingDown size={14} /> {t('adjust_budget')}
              </button>
            </div>
          )}
        </div>
        <BudgetModal isOpen={isEditing} onClose={() => setIsEditing(false)} />
    </div>
  )
}

export default BudgetCard;