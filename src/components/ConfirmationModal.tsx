import { AlertTriangle, LogOut } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmText: string;
  type: 'danger' | 'warning';
  isLoading?: boolean;
}

const ConfirmationModal = ({ 
  isOpen, onClose, onConfirm, title, description, confirmText, type, isLoading 
}: ConfirmationModalProps) => {
    const { t } = useTranslation()
  if (!isOpen) return null;

  const isDanger = type === 'danger';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
    {/* Card Container: ပိုမှောင်တဲ့ Slate background နဲ့ Border highlight သုံးထားတယ် */}
        <div className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="p-8 text-center">
            {/* Icon Wrapper: Glow effect ထည့်ထားတယ် */}
            <div className={`w-20 h-20 mx-auto rounded-[2rem] flex items-center justify-center mb-6 shadow-inner ${
                isDanger 
                ? 'bg-rose-50 dark:bg-rose-500/10 text-rose-500 border border-rose-100 dark:border-rose-500/20' 
                : 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-500 border border-indigo-100 dark:border-indigo-500/20'
            }`}>
                {isDanger ? <AlertTriangle size={36} strokeWidth={2.5} /> : <LogOut size={36} strokeWidth={2.5} />}
            </div>

            {/* Text Section */}
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                {title}
            </h2>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 px-4 leading-relaxed uppercase tracking-wider opacity-80">
                {description}
            </p>
            </div>

            {/* Actions Section */}
            <div className="p-8 pt-0 flex flex-col gap-3">
            <button
                disabled={isLoading}
                onClick={onConfirm}
                className={`w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] transition-all active:scale-95 flex items-center justify-center gap-3 shadow-xl ${
                isDanger 
                ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/30' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/30'
                }`}
            >
                {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                confirmText
                )}
            </button>
            
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