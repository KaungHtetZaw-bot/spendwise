import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { Moon, Sun, Languages, EllipsisVertical, LogOut,Bell, BellOff,PieChart } from "lucide-react";
import { useTranslation } from "react-i18next";
import { logout } from "../lib/helper";
import { useConfirmationStore } from "../store/useConfirmationStore";
import { useTransactions } from "../hooks/useTransactions"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const MobileHeader = () => {
  const { profile, setTheme, theme, language,setLanguage, isNotifyEnabled } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const { i18n,t } = useTranslation()
  const { openConfirm } = useConfirmationStore()
  const { data: transactions = [] } = useTransactions();
  const navigate = useNavigate()
  const loacation = useLocation()

  const totalSpent = transactions
  .filter(t => t.type === 'expense')
  .reduce((sum, t) => sum + t.amount, 0);
  const budget = profile?.monthly_budget || 0;
  const usagePercent = budget > 0 ? (totalSpent / budget) * 100 : 0;
  
  const isOverBudget = usagePercent >= 100;
  const isWarning = usagePercent >= 80;


  const toggleTheme = () => {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const nextTheme = isCurrentlyDark ? "light" : "dark";
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    document.startViewTransition(() => {
      setTheme(nextTheme);
    });
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "mm" : "en";
    setLanguage(nextLang);
    setIsOpen(false);
  };

  const handleBellClick = () => {
  const isWarning = usagePercent >= 80;
  const statusTitle = isOverBudget 
    ? t('budgetPage.exceeded_title') 
    : t('budgetPage.status_title');

  const statusDesc = isOverBudget
    ? t('budgetPage.exceeded_desc')
    : t('budgetPage.usage_desc', { percent: Math.round(usagePercent) });

  openConfirm({
    title: statusTitle,
    description: `${statusDesc}\n\n💡 ${t('notifications.tip_title')}: ${t('notifications.tip_message')}`,
    confirmText: t('notifications.go_to_settings'),
    type: isOverBudget ? "danger" : (isWarning ? "warning" : "info"),
    onConfirm: () => {
      navigate('/settings')
    }
  });
};

  const handleLogout = () => {
    setIsOpen(false)
    openConfirm({
      title: t('account.logout_confirm_title'),
      description: t('account.logout_confirm_msg'),
      confirmText: t('account.logout_confirm_btn'),
      type: "warning",
      onConfirm: async ()=>{logout}
    })
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between px-4 md:py-4 py-2 md:hidden backdrop-blur-sm sticky top-0 z-30">
        {
          loacation.pathname === "/settings" ? (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <PieChart size={18} />
            </div>
            <h1 className="text-lg font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                Spend<span className="text-indigo-600">Wise</span>
            </h1>
          </div>
          ) : (
            <div className="flex items-center gap-3">
            { 
                profile?.avatar_url ? (
                  <img src={`${profile.avatar_url}?t=${Date.now()}`} alt="Avatar" className="w-10 h-10 rounded-full object-cover" />
                ) : (
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'Felix'}`} 
                    alt="avatar" 
                    className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 object-cover"
                  />
                )
              }
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">{ t('greeting') }</p>
                <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 mt-1">{profile?.name || "User"}</h2>
              </div>
            </div>
          )
        }

        <div className="flex items-center gap-2">
          {/* Notification Button */}
          <button 
            onClick={handleBellClick}
            className={`p-2 rounded-xl transition-all duration-500 relative ${
              isOverBudget 
                ? "text-rose-500 bg-rose-50 dark:bg-rose-950/30 animate-pulse" 
                : isWarning 
                ? "text-amber-500 bg-amber-50 dark:bg-amber-950/30" 
                : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            {isNotifyEnabled ? <Bell size={18} /> : <BellOff size={18} />}

            {isNotifyEnabled && (isWarning || isOverBudget) && (
              <span 
                className={`absolute top-[7px] right-[7px] w-2.5 h-2.5 rounded-full border-2 border-white dark:border-slate-900 transition-colors duration-300 ${
                  isOverBudget ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]" : "bg-amber-500"
                }`} 
              />
            )}
          </button>

          {/* Three Dots / Settings Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-xl transition-colors active:bg-indigo-100 dark:active:bg-indigo-900 ${isOpen ? 'text-indigo-600' : 'text-slate-500'}`}
          >
            <EllipsisVertical size={20} />
          </button>
        </div>
      </div>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-4 top-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200 origin-top-right">
            <div className="p-2 space-y-1">
              
              <button 
                onClick={toggleTheme}
                className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors active:bg-slate-100 dark:active:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  {theme === "light" ? (
                    <Moon size={18} className="text-indigo-400" />
                  ) : (
                    <Sun size={18} className="text-amber-500" />
                  )}
                </div>
                  <span className="text-sm font-black uppercase opacity-50">
                    {theme === "light" ? "Night" : "Day"}
                  </span>              
              </button>

              <button 
                onClick={toggleLanguage}
                className="w-full flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors active:bg-slate-100 dark:active:bg-slate-700"
              >
                <div className="flex items-center gap-3">
                  <Languages size={18} className="text-emerald-500" />
                </div>
                <span className="text-sm font-black uppercase opacity-50">{ (language === 'en' || i18n.language === 'en') ? "MM" : "EN" }</span>
              </button>

              <div className="h-[1px] bg-slate-100 dark:bg-slate-800 my-1 mx-2" />

              <button onClick={handleLogout} className="w-full flex items-center gap-3 p-1.5 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20 text-rose-500 transition-colors">
                <LogOut size={18} />
                <span className="text-sm font-bold">{ t('sign_out')}</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MobileHeader;