import { Coins, Check, X } from 'lucide-react'
import { useState } from 'react';
import { useTranslation } from 'react-i18next';


const BudgetCard = () => {
    const [isEditing, setIsEditing] = useState(false);
  const [tempBudget, setTempBudget] = useState(1500000);
  const [budget, setBudget] = useState(1500000);
  const { t } =useTranslation()

  const handleSave = () => {
    setBudget(tempBudget);
    setIsEditing(false);
    // TODO: Supabase update logic here
  };
  // တကယ်တမ်းမှာတော့ ဒါတွေကို Store သို့မဟုတ် Props ကနေ ယူရမှာပါ
  const totalBudget = 1500000;
  const currentExpense = 1200000;
  const usagePercentage = (currentExpense / totalBudget) * 100;
  
  // 80% ကျော်ရင် အရောင်ပြောင်းမယ့် logic
  const isOverLimit = usagePercentage >= 100;
  const isWarning = usagePercentage >= 80;

  return (
    <div className={`relative overflow-hidden group md:rounded-[2.5rem] rounded-[1.5rem] md:p-8 p-6 text-white shadow-xl transition-all duration-500 ${
      isOverLimit ? 'bg-rose-600 shadow-rose-500/20' : 'bg-indigo-600 shadow-indigo-500/20'
    }`}>
        
        {/* Background Icon Decoration */}
        <div className="absolute -top-4 -right-4 opacity-10 group-hover:rotate-12 transition-transform duration-500">
            <Coins size={120} />
        </div>

        <div className="relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{ t('budget') }</p>
            {isEditing ? (
          /* Edit Mode Input */
          <div className="mt-2 flex items-center gap-3 animate-in fade-in zoom-in-95 duration-200">
            <input 
              autoFocus
              type="number"
              value={tempBudget}
              onChange={(e) => setTempBudget(Number(e.target.value))}
              className="bg-white/20 border-2 border-white/30 rounded-xl px-4 py-2 text-2xl font-black w-full outline-none focus:border-white transition-all"
            />
            <div className="flex flex-col gap-1">
              <button onClick={handleSave} className="p-2 bg-emerald-500 rounded-lg hover:bg-emerald-400 transition-colors">
                <Check size={16} />
              </button>
              <button onClick={() => setIsEditing(false)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors">
                <X size={16} />
              </button>
            </div>
          </div>
        ) : (
          /* Display Mode */
          <h3 className="text-3xl font-black mt-2 tracking-tighter flex items-baseline gap-2">
            {budget.toLocaleString()} 
            <span className="text-sm font-medium opacity-70 tracking-normal">Ks</span>
          </h3>
        )}

            {!isEditing && (
          <button 
            onClick={() => setIsEditing(true)}
            className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border border-white/10 active:scale-95"
          >
            { t('update_budget') }
          </button>
        )}
        </div>
    </div>
  )
}

export default BudgetCard