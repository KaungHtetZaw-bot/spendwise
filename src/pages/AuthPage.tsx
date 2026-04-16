import { useEffect, useState } from 'react';
import { Mail, User, ArrowRight } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useToastStore } from '../store/useToastStore.ts';
import { useTranslation } from 'react-i18next';
import ForgotPasswordModal from '../components/auth/ForgotPasswordModal.tsx'
import ResetPasswordForm from '../components/auth/ResetPasswordForm.tsx'
import PasswordField from '../components/auth/PasswordField.tsx';
import UserInfoForm from '../components/auth/UserInfoForm.tsx';
import FormInput from '../components/auth/FormInput.tsx';
import OTPModal from '../components/auth/OTPModal.tsx';
import ToastBox from '../components/ToastBox.tsx';
import ForgetPasswordBtn from '../components/ForgetPasswordBtn.tsx';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const [tempUserData, setTempUserData] = useState<any>(null);

  const isResetMode = searchParams.get('mode') === 'reset_password';
  const [showForgotModal, setShowForgotModal] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [currency, setCurrency] = useState<'MMK' | 'USD'>('MMK');
  const [career, setCareer] = useState('');
  const [income, setIncome] = useState(0);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { showToast,message, type, isOpen, hideToast } = useToastStore();

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAuth = async (e: any) => {
    e.preventDefault();
    
    if (isLogin || step === 2) {
      setLoading(true);
      try {
        if (isLogin) {
          const { error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          showToast(t('success.login_success'),'success')
          navigate('/home');
        } else {
          
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          
          if (data.user) {

            setTempUserData({
              id: data.user.id,
              fullName,
              career,
              income,
              currency,
              avatarFile
            });

            setStep(3);
            showToast(t('auth.verify_prompt'), 'success');
          }
        }
      } catch (error: any) {
        let errorMessage = t('errors.general_auth_error');
        if (error.message?.includes("Invalid login credentials")) {
          errorMessage = t('errors.invalid_credentials');
        } else if (error.message?.includes("User already registered")) {
          errorMessage = t('errors.user_exists');
        }
        showToast(errorMessage, 'danger');
      } finally {
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) return showToast(t('auth.password_mismatch'), 'danger');
      setStep(2);
    }
  };

  const goToRegister = () => {
    setEmail('')
    setPassword('')
    setIsLogin(false)
  }
  const goToLogin = () => {
    setFullName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setIsLogin(true)
  }

  useEffect(() => {
    setIsLogin(mode !== 'register');
    setStep(1);
  }, [mode]);

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 flex items-center justify-center md:p-6 p-3 font-sans transition-colors duration-500">
      <div className="w-full max-w-md md:space-y-8 space-y-4">
        <div className="text-center space-y-2">
        </div>
        {isResetMode ? (
          <ResetPasswordForm />
        ) :(
        <>
          <div className="text-center md:space-y-2 space-y-1">
            <h1 className="md:text-3xl text-xl font-black text-slate-900 dark:text-white tracking-tighter">
              {step === 3 ? "Verify Email" : (isLogin ? t('auth.welcome_back') : step === 1 ? t('auth.create_account') : t('auth.final_steps'))}
            </h1>
            <p className="text-sm font-medium text-slate-400">
              {step === 3 ? "Almost there! Confirm your account" : (isLogin ? t('auth.login_desc') : step === 1 ? t('auth.register_desc') : t('auth.final_desc'))}
            </p>
          </div>

          {step === 1 && (
            <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50">
              <button onClick={goToLogin} className={`flex-1 md:py-3 py-1.5 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                {t('auth.login_tab')}
              </button>
              <button onClick={goToRegister} className={`flex-1 md:py-3 py-1.5 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-400'}`}>
                {t('auth.register_tab')}
              </button>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.25rem] md:p-8 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
            
            {step === 3 ? (
              <OTPModal 
                email={email}
                tempUserData={tempUserData}
                loading={loading}
                setLoading={setLoading}
                onBack={() => setStep(1)}
                onSuccess={(msg) => showToast(msg, 'success')}
                onError={(msg) => showToast(msg, 'danger')}
                onNavigate={(path) => navigate(path)}
                currency={currency}
              />
            ) : (
              /* --- STEP 1 & 2: Login/Register UI --- */
              <form className="md:space-y-5 space-y-3" onSubmit={handleAuth}>
                {(isLogin || step === 1) && (
                  <div className="animate-in slide-in-from-right duration-500">
                    {!isLogin && (
                    <FormInput 
                      label={t('auth.full_name')} 
                      placeholder="enter your name"
                      icon={User} 
                      value={fullName} 
                      onChange={setFullName} 
                    />
                    )}
                    <FormInput 
                      label={t('auth.email')} 
                      placeholder="@gmail.com"
                      icon={Mail} 
                      value={email} 
                      onChange={setEmail} 
                    />
                    <PasswordField 
                    value={password} 
                    onChange={setPassword} 
                    label={t('auth.password')} 
                    />
                    {!isLogin&&(step === 1) &&<PasswordField 
                    value={confirmPassword} 
                    onChange={setConfirmPassword} 
                    label={t('auth.confirm_password')} 
                    />}
                  </div>
                )}

                {!isLogin && step === 2 && (
                  <UserInfoForm 
                    onBack={() => { setStep(1); setAvatarFile(null); setAvatarPreview(null); }}
                    avatarPreview={avatarPreview}
                    handleFileChange={handleFileChange}
                    career={career}
                    setCareer={setCareer}
                    income={income}
                    setIncome={setIncome}
                    currency={currency}
                    setCurrency={setCurrency}
                  />
                )}

                {isLogin && step === 1 && (
                  <ForgetPasswordBtn onClick={() => setShowForgotModal(true)}/>
                )}

                <button type="submit" disabled={loading} className="w-full md:py-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white md:rounded-2xl rounded-xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50">
                  {loading ? t('auth.processing') : (isLogin ? t('auth.sign_in') : step === 1 ? t('auth.continue') : t('auth.complete_setup'))}
                  <ArrowRight size={16} />
                </button>
              </form>
            )}
          </div>
        </>
        )
      }
      </div>
      <ForgotPasswordModal 
        isOpen={showForgotModal} 
        onClose={() => setShowForgotModal(false)} 
      />

      {isOpen && (
          <ToastBox 
            message={message} 
            type={type} 
            onClose={hideToast} 
          />
        )}
    </div>
  );
};

export default AuthPage;