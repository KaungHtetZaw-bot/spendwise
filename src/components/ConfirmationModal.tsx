import { AlertTriangle, Bell,Info } from 'lucide-react';import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  type: 'danger' | 'warning' | 'info';
  isLoading?: boolean;
}

const ConfirmationModal = ({ 
  isOpen, onClose, onConfirm, title, description, confirmText, type, isLoading 
}: ConfirmationModalProps) => {
    const { t } = useTranslation()
  if (!isOpen) return null;

  const config = {
    danger: {
      icon: <AlertTriangle size={36} strokeWidth={2.5} />,
      colorClass: 'bg-rose-50 dark:bg-rose-500/10 text-rose-500 border-rose-100 dark:border-rose-500/20',
      btnClass: 'bg-rose-500 hover:bg-rose-600 shadow-rose-500/30'
    },
    warning: {
      icon: <AlertTriangle size={36} strokeWidth={2.5} />,
      colorClass: 'bg-amber-50 dark:bg-amber-500/10 text-amber-500 border-amber-100 dark:border-amber-500/20',
      btnClass: 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/30'
    },
    info: {
      icon: <Info size={36} strokeWidth={2.5} />, // Info အတွက် Bell သုံးတာ ပိုလိုက်ဖက်တယ်
      colorClass: 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 border-indigo-100 dark:border-indigo-500/20',
      btnClass: 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/30'
    }
  };

  const currentTheme = config[type] || config.info;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 md:rounded-[2.5rem] rounded-[1.25rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-8 text-center">
                {/* Dynamic Icon Wrapper */}
                <div className={`w-20 h-20 mx-auto rounded-[2rem] flex items-center justify-center mb-6 shadow-inner border transition-colors ${currentTheme.colorClass}`}>
                    {currentTheme.icon}
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                    {title}
                </h2>
                
                {/* whitespace-pre-wrap ထည့်ထားမှ \n line breaks တွေ အလုပ်လုပ်မှာပါ */}
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 px-4 leading-relaxed uppercase tracking-wider opacity-80 whitespace-pre-wrap">
                    {description}
                </p>
            </div>

            <div className="p-8 pt-0 flex flex-col gap-3">
                <button
                    disabled={isLoading}
                    onClick={onConfirm}
                    className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl text-white ${currentTheme.btnClass}`}
                >
                    {isLoading ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        confirmText
                    )}
                </button>
                
                {/* Bell ကို နှိပ်လို့ ပေါ်လာတဲ့ modal ဆိုရင် Cancel ခလုတ် မပြချင်လည်း ရတယ် (Optional) */}
                <button
                    disabled={isLoading}
                    onClick={onClose}
                    className="w-full py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all hover:bg-slate-100 dark:hover:bg-slate-800/50"
                >
                    {t('actions.cancel')}
                </button>
            </div>
        </div>
    </div>
  );
};

export default ConfirmationModal;