import { Link } from "react-router-dom";
import { useAppSettings } from "../hooks/useAppSettings"; // ငါတို့ဆောက်ခဲ့တဲ့ hook
import { 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  BarChart3, 
  PieChart 
} from "lucide-react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const { isMM, toggleLanguage } = useAppSettings();
  return (
    <div className="min-h-[100dvh] h-full overflow-y-auto bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-100">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <PieChart size={18} />
            </div>
            <h1 className="md:block hidden text-lg font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                Spend<span className="text-indigo-600">Wise</span>
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 mr-2">
              <span className={`text-[10px] font-black ${!isMM ? 'text-indigo-600' : 'text-slate-400'}`}>EN</span>
              <button 
                onClick={toggleLanguage}
                className={`w-10 h-5 rounded-full relative transition-all duration-500 ${isMM ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
            >
                <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-500 ${isMM ? 'left-6' : 'left-1'}`} />
              </button>
              <span className={`text-[10px] font-black ${isMM ? 'text-indigo-600' : 'text-slate-400'}`}>MM</span>
          </div>
            <Link to="/auth?mode=login" className="text-sm font-bold hover:text-indigo-500 transition-colors">{ t('landing.login')}</Link>
            <Link to="/auth?mode=register" className="px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">
              { t('landing.get_started')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-500/20">
            <TrendingUp size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">{ t('landing.smart_tracking')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
            { t('landing.hero_title_1')} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              { t('landing.hero_title_2')}
            </span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            { t('landing.hero_desc')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth?mode=register" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
              { t('landing.start_trial')} <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <div className="mt-20 max-w-5xl mx-auto relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-4 shadow-2xl overflow-hidden">
             {/* Dashboard Header Mockup */}
             <div className="grid grid-cols-3 gap-4 mb-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="h-24 rounded-2xl bg-slate-50 dark:bg-slate-800/50 animate-pulse" />
                ))}
             </div>
             {/* Chart Mockup */}
             <div className="h-64 w-full rounded-2xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center">
                <BarChart3 className="w-12 h-12 text-slate-300 dark:text-slate-700" />
             </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-100 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldCheck size={24} />
            </div>
            <h3 className="font-black text-xl">{ t('landing.secure_title') }</h3>
            <p className="text-slate-500 text-sm">{ t('landing.secure_desc') }</p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
              <PieChart size={24} />
            </div>
            <h3 className="font-black text-xl">{ t('landing.insights_title') }</h3>
            <p className="text-slate-500 text-sm">{ t('landing.insights_desc') }</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
              <BarChart3 size={24} />
            </div>
            <h3 className="font-black text-xl">{ t('landing.budget_title') }</h3>budget_desc
            <p className="text-slate-500 text-sm">{ t('landing.budget_desc') }</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 text-center text-slate-400 text-xs font-medium uppercase tracking-widest">
        &copy; 2026 SpendWise • Built with React & Supabase
      </footer>
    </div>
  );
};

export default Index;