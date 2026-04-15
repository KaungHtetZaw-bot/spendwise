import { createPortal } from 'react-dom';
import { AlertCircle, CheckCircle2, ShieldAlert, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { ToastBoxType } from '../type/profile';

interface ToastBoxProps {
  type: ToastBoxType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const ToastBox = ({ type, message, onClose, duration = 10000 }: ToastBoxProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  if (!mounted) return null;

  const config = {
    success: {
      bg: 'bg-emerald-50/80 dark:bg-emerald-950/20',
      border: 'border-emerald-200/50 dark:border-emerald-900/30',
      text: 'text-emerald-700 dark:text-emerald-400',
      icon: <CheckCircle2 size={20} />,
      glow: 'bg-emerald-400/20'
    },
    danger: {
      bg: 'bg-rose-50/80 dark:bg-rose-950/20',
      border: 'border-rose-200/50 dark:border-rose-900/30',
      text: 'text-rose-700 dark:text-rose-400',
      icon: <ShieldAlert size={20} />,
      glow: 'bg-rose-400/20'
    },
    warning: {
      bg: 'bg-amber-50/80 dark:bg-amber-950/20',
      border: 'border-amber-200/50 dark:border-amber-900/30',
      text: 'text-amber-700 dark:text-amber-400',
      icon: <AlertCircle size={20} />,
      glow: 'bg-amber-400/20'
    }
  };

  const theme = config[type];

  const formatMessage = (msg: string) => {
    if (msg.includes('(Tip:')) {
      const [main, tip] = msg.split('(Tip:');
      return (
        <>
          {main}
          <span className="block text-[11px] font-medium opacity-60 mt-1 italic leading-snug">
            Tip:{tip}
          </span>
        </>
      );
    }
    return msg;
  };

  return createPortal(
    <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-[92%] max-w-sm animate-in fade-in slide-in-from-top-6 duration-500 ease-out">
      <div className={`relative overflow-hidden ${theme.bg} ${theme.border} border backdrop-blur-xl md:p-4 p-2 md:rounded-[1.5rem] rounded-[0.75rem] flex items-center gap-4 shadow-2xl shadow-black/5`}>
        
        {/* Glow Effect */}
        <div className={`absolute -top-12 -left-12 w-24 h-24 ${theme.glow} blur-3xl rounded-full`} />

        <div className={`p-2.5 rounded-xl ${theme.bg} shadow-inner ${theme.text}`}>
          {theme.icon}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-70 ${theme.text}`}>
            {type}
          </h4>
          <div className="text-sm font-bold text-slate-800 dark:text-slate-100 leading-tight mt-0.5 break-words">
            {formatMessage(message)}
          </div>
        </div>

        <button 
          onClick={onClose}
          className="p-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-lg text-slate-400 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ToastBox;