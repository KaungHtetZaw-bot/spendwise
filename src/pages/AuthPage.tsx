import { useState } from 'react';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 flex items-center justify-center md:p-6 p-3">
      <div className="w-full max-w-md md:space-y-8 space-y-4">
        
        <div className="text-center md:space-y-2 space-y-1">
          <h1 className="md:text-3xl text-xl font-black text-slate-900 dark:text-white tracking-tighter">
            {isLogin ? 'Welcome Back!' : 'Create Account'}
          </h1>
          <p className="text-sm font-medium text-slate-400">
            {isLogin ? 'Please enter your details to sign in.' : 'Join us to start managing your budget.'}
          </p>
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-900 rounded-[2rem] border border-slate-200/50 dark:border-slate-800/50">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 md:py-3 py-1.5 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${isLogin ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 md:py-3 py-1.5 rounded-[1.8rem] text-xs font-black uppercase tracking-widest transition-all ${!isLogin ? 'bg-white dark:bg-slate-800 text-indigo-600 shadow-sm' : 'text-slate-400'}`}
          >
            Register
          </button>
        </div>

        <div className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.25rem] md:p-8 p-4 shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in duration-300">
          <form className="md:space-y-5 space-y-2.5" onSubmit={(e) => e.preventDefault()}>
            
            {!isLogin && (
              <div className="md:space-y-2 space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input 
                    type="text" 
                    placeholder="Kaung Htet Zaw"
                    className="form-input"
                  />
                </div>
              </div>
            )}

            <div className="md:space-y-2 space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="email" 
                  placeholder="khz@dev.com"
                  className="form-input"
                />
              </div>
            </div>

            <div className="md:space-y-2 space-y-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="form-input"
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-right px-2">
                <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button className="w-full md:py-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white md:rounded-2xl rounded-xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4">
              {isLogin ? 'Sign In' : 'Create Account'}
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
              <span className="absolute bg-white dark:bg-slate-900 px-4 text-[10px] font-black text-slate-300 uppercase tracking-widest">Or Continue With</span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button className="btn-for-login-method">
                <Lock size={18} className="text-rose-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Google</span>
              </button>
              <button className="btn-for-login-method">
                <Lock size={18} className="text-slate-900 dark:text-white" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300">Github</span>
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-xs font-bold text-slate-400">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            {isLogin ? 'Register Now' : 'Login Here'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;