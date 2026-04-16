import { Mail } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { supabase } from '../../lib/supabase'
import { StoreAvatar } from '../../lib/helper'

interface OTPModalProps {
    email: string;
    tempUserData: any;
    loading: boolean;
    setLoading: (loading: boolean) => void;
    onBack: () => void;
    onSuccess: (message: string) => void; // Toast ပြဖို့ function
    onError: (message: string) => void;
    onNavigate: (path: string) => void;
    currency:'MMK' | 'USD'
}

const OTPModal = ({
    email,
    tempUserData,
    loading,
    setLoading,
    onBack,
    onSuccess,
    onError,
    onNavigate,
    currency
}:OTPModalProps) => {
    const { t } = useTranslation()
    const [otpCode, setOtpCode] = useState('');

    const DEFAULT_RATE = 4500;

    const convertToStoreAmount = (amount: number) => {
        return currency === 'USD' ? amount * DEFAULT_RATE : amount;
    };

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
          const { error: otpError } = await supabase.auth.verifyOtp({
            email,
            token: otpCode,
            type: 'signup'
          });
          if (otpError) throw otpError;
    
          if (tempUserData) {
            const publicUrl = tempUserData.avatarFile 
              ? await StoreAvatar(tempUserData.avatarFile, tempUserData.id) 
              : null;
            
            const storeAmount = convertToStoreAmount(tempUserData.income) || tempUserData.income;
            const budget = storeAmount * 0.8;
    
            const { error: dbError } = await supabase.from('users').insert([
              {
                user_id: tempUserData.id,
                name: tempUserData.fullName,
                career: tempUserData.career,
                monthly_income: storeAmount,
                currency: tempUserData.currency,
                avatar_url: publicUrl,
                monthly_budget: budget,
              }
            ]);
    
            if (dbError) throw dbError;
          }
          
          onSuccess(t('success.register_success'));
          onNavigate('/home');
        } catch (error: any) {
          onError(error.message);
        } finally {
          setLoading(false);
        }
      };
  return (
    <div className="animate-in fade-in zoom-in duration-500 text-center">
        <div className="mb-6">
            <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Mail size={32} />
            </div>
            <h2 className="text-lg font-black uppercase tracking-tight">{t('auth.check_email')}</h2>
            <p className="text-xs font-medium text-slate-400 mt-1">{t('auth.verification_sent')} <br/><span className="text-indigo-500">{email}</span></p>
        </div>

        <input 
            type="text" maxLength={6} placeholder="000000"
            onChange={(e) => setOtpCode(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-4 text-center text-2xl font-black tracking-[0.4em] text-indigo-600 outline-none transition-all mb-6"
        />
        
        <button 
            onClick={handleVerifyOTP}
            disabled={loading || otpCode.length < 6}
            className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-indigo-500/20 transition-all active:scale-95 disabled:opacity-50"
        >
            {loading ? t('auth.verifying') : t('auth.verify_button')}
        </button>

        <button onClick={onBack} className="mt-6 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600 transition-colors">
            {t('auth.back_to_reg')}
        </button>
    </div>
  )
}

export default OTPModal