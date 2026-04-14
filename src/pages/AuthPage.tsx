import { useEffect, useState } from 'react';
import { Mail, Lock, User, ArrowRight, Briefcase, Wallet, ArrowLeft, Camera } from 'lucide-react';
import { supabase } from '../lib/supabase.ts';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreAvatar } from '../lib/helper.ts';
import { useToastStore } from '../store/useToastStore.ts';
import { useTranslation } from 'react-i18next';

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode');
  const [isLogin, setIsLogin] = useState(true);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [currency, setCurrency] = useState<'MMK' | 'USD'>('MMK');
  const [career, setCareer] = useState('');
  const [income, setIncome] = useState(0);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const { showToast } = useToastStore();

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log("Selected file:", file);
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleAuth = async (e: any) => {
    e.preventDefault();
    
    // Login ဖြစ်နေရင် သို့မဟုတ် Register ရဲ့ Step 2 ရောက်မှ Database ထဲ သွားမယ်
    if (isLogin || step === 2) {
      setLoading(true);
      try {
        if (isLogin) {
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });
          if (error) throw error;
          showToast('success.login_success','success')
          navigate('/home');
        } else {
          // Registration Logic
          const { data, error } = await supabase.auth.signUp({ email, password });
          if (error) throw error;
          
          if (data.user) {

            const publicUrl = avatarFile ? await StoreAvatar(avatarFile, data.user.id) : null;
            await supabase.from('users').insert([
              {
                user_id: data.user.id,
                name: fullName,
                career: career,
                monthly_income: income,
                currency,
                avatar_url: publicUrl,
              }
            ]);
            showToast('success.register_success','success')
            navigate('/home');
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
      setStep(2);
    }
  };

  useEffect(() => {
    if (mode === 'register') {
      setIsLogin(false);
      setStep(1);
    } else {
      setIsLogin(true);
      setStep(1);
    }
  }, [mode]);

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 flex items-center justify-center md:p-6 p-3 font-sans transition-colors duration-500">
      <div className="w-full max-w-md md:space-y-8 space-y-4">
        
        {/* Header Section */}
        <div className="text-center md:space-y-2 space-y-1">
          <h1 className="md:text-3xl text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            {isLogin ? t('auth.welcome_back') : step === 1 ? t('auth.create_account') : t('auth.final_steps')}
          </h1>
          <p className="text-sm font-medium text-slate-400">
            {isLogin ? t('auth.login_desc') : step === 1 ? t('auth.register_desc') : t('auth.final_desc')}
          </p>
        </div>

        {/* Tab Switcher (Only show in Step 1 or Login) */}
        {step === 1 && (
          <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 md:py-3 py-1.5 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              { t('landing.login')}
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 md:py-3 py-1.5 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
            >
              Register
            </button>
          </div>
        )}

        <div className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.25rem] md:p-8 p-6 shadow-2xl border border-slate-100 dark:border-slate-800 relative overflow-hidden">
          
          <form className="md:space-y-5 space-y-3" onSubmit={handleAuth}>
            
            {/* --- STEP 1: Basic Info & Login --- */}
            {(isLogin || step === 1) && (
              <div className="animate-in slide-in-from-right duration-500">
                {!isLogin && (
                  <div className="md:space-y-2 space-y-1 mb-4">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t('auth.full_name')}</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                      <input 
                        type="text" placeholder="Kaung Htet Zaw" required
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all"
                      />
                    </div>
                  </div>
                )}

                <div className="md:space-y-2 space-y-1 mb-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{ t('auths.email')}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="email" placeholder="khz@dev.com" required
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="md:space-y-2 space-y-1">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{ t('auths.password')}</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="password" placeholder="••••••••" required
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* --- STEP 2: Professional Info (Only for Register) --- */}
            {!isLogin && step === 2 && (
              <div className="animate-in slide-in-from-right duration-500">
                <button type="button" onClick={() => {setStep(1);setAvatarFile(null);setAvatarPreview(null)}} className="mb-4 flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-500">
                  <ArrowLeft size={14} /> { t('auth.back')}
                </button>

                <div className="flex flex-col items-center mb-6">
                  <label className="relative group cursor-pointer">
                    <div className="w-20 h-20 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden group-hover:border-indigo-500/50 transition-all">
                      {avatarPreview ? (
                        <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Camera className="text-slate-300 group-hover:text-indigo-500 transition-colors" size={28} />
                      )}
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    <div className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-xl shadow-lg border-2 border-white dark:border-slate-900">
                      <Camera size={12} />
                    </div>
                  </label>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{ t('auth.upload_photo')}</span>
                </div>
                
                <div className="md:space-y-2 space-y-1 mb-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{ t('auth.career')}</label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                    <input 
                      type="text" placeholder="Frontend Developer" required
                      onChange={(e) => setCareer(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="md:space-y-2 space-y-1">
  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
    {t('auth.income')}
  </label>
  <div className="relative group">
    {/* Icon */}
    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
    
    {/* Input Field */}
    <input 
      type="number" 
      placeholder="3000" 
      required
      onChange={(e) => setIncome(Number(e.target.value))}
      className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-24 font-bold text-slate-700 dark:text-white outline-none transition-all"
    />

    {/* Currency Switcher */}
    <div className="absolute right-2 top-1/2 -translate-y-1/2 flex bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
      <button
        type="button"
        onClick={() => setCurrency('MMK')}
        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
          currency === 'MMK' 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        Ks
      </button>
      <button
        type="button"
        onClick={() => setCurrency('USD')}
        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${
          currency === 'USD' 
          ? 'bg-indigo-600 text-white shadow-md' 
          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
        }`}
      >
        $
      </button>
    </div>
  </div>
</div>
              </div>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full md:py-5 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white md:rounded-2xl rounded-xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50"
            >
              {loading 
              ? t('auth.processing') 
              : (isLogin ? t('auth.sign_in') : step === 1 ? t('auth.continue') : t('auth.complete_setup'))}
              <ArrowRight size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;