import { Lock, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useToastStore } from '../../store/useToastStore';
import PasswordField from './PasswordField';
import { useTranslation } from 'react-i18next';

const ResetPasswordForm = () => {
    const { t } = useTranslation()
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToastStore();

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) return showToast(t('auth.password_mismatch'), 'danger');
    
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      showToast(t('auth.reset_success'), 'success');
      navigate('/auth?mode=login');
    } catch (error: any) {
      showToast(error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <>
    <h1 className="md:text-3xl text-xl font-black text-center text-slate-900 dark:text-white tracking-tighter uppercase">
        {t('security') }
    </h1>
    <div className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.25rem] md:p-8 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 animate-in slide-in-from-bottom-4 duration-500"> 
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Lock size={30} />
        </div>
        <h2 className="text-xl font-black uppercase tracking-tighter">{t('set_new_password')}</h2>
        <p className="text-xs text-slate-400 mt-1 font-bold uppercase">{t('enter_secure_password')}</p>
      </div>

      <form onSubmit={handleUpdate} className="space-y-4">
        <PasswordField 
            label={t('auth.new_password')}
            value={newPassword}
            onChange={setNewPassword}
            />
        <PasswordField 
            label={t('auth.confirm_password')}
            value={confirmPassword}
            onChange={setConfirmPassword}
            />
        <button className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest shadow-xl flex items-center justify-center gap-2">
          {loading ? t('auth.updating') : t('auth.change_password')} <ArrowRight size={18}/>
        </button>
      </form>
    </div>
    </>
  );
};

export default ResetPasswordForm;