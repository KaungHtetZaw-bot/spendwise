import { useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useToastStore } from '../../../store/useToastStore';
import PasswordField from '../../auth/PasswordField'; 
import { useTranslation } from 'react-i18next';
import ForgetPasswordBtn from '../../ForgetPasswordBtn';

const ChangePasswordSection = () => {
    const {t} = useTranslation()
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { showToast } = useToastStore();

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      return showToast("Passwords don't match", 'danger');
    }

    setLoading(true);
    try {
      // ၁။ Old Password မှန်မမှန် အရင်စစ်မယ် (Re-authenticate)
      const { data: { user } } = await supabase.auth.getUser();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: oldPassword,
      });

      if (signInError) throw new Error("Old password is incorrect");

      // ၂။ မှန်ပြီဆိုမှ Password အသစ်ကို Update လုပ်မယ်
      const { error: updateError } = await supabase.auth.updateUser({ 
        password: newPassword 
      });

      if (updateError) throw updateError;

      showToast('Password updated successfully!', 'success');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error: any) {
      showToast(error.message, 'danger');
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <section className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.25rem] md:p-8 p-4 border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-50 dark:border-slate-800 pb-4">
        <div>
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">{t('security')}</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Change your account password</p>
        </div>
      </div>

      <form onSubmit={handleUpdatePassword} className="space-y-4">
        <PasswordField 
          label="Old Password" 
          value={oldPassword} 
          onChange={setOldPassword} 
        />
        <ForgetPasswordBtn />
        
        <div className="grid md:grid-cols-2 gap-4">
          <PasswordField 
            label={t('auth.new_password') }
            value={newPassword} 
            onChange={setNewPassword} 
          />
          <PasswordField 
            label={t('auth.confirm_password')}
            value={confirmPassword} 
            onChange={setConfirmPassword} 
          />
        </div>

        <button 
          type="submit"
          disabled={loading || !newPassword}
          className="w-full py-5 bg-indigo-600 text-white md:rounded-3xl rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? t('auth.updating') : t('auth.change_password')}
        </button>
      </form>
    </section>
  );
};

export default ChangePasswordSection