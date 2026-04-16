import { Mail, X } from 'lucide-react';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useToastStore } from '../../store/useToastStore';

const ForgotPasswordModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [resetEmail, setResetEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth?mode=reset_password`,
      });
      if (error) throw error;
      showToast('Reset link sent to your email!', 'success');
      onClose();
    } catch (error: any) {
      showToast(error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-sm rounded-[1.5rem] p-8 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in zoom-in duration-300">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Reset Password</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-rose-500"><X size={20}/></button>
        </div>
        
        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input 
              type="email" required placeholder="Enter your email"
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-4 pl-12 pr-4 font-bold outline-none"
            />
          </div>
          <button 
            disabled={loading}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/20 active:scale-95 transition-all"
          >
            {loading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;