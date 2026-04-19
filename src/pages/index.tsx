import { Link } from "react-router-dom";
import { useAppSettings } from "../hooks/useAppSettings";
import { motion } from "framer-motion"; // Animation အတွက်
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
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-100 overflow-x-hidden">
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-[100] backdrop-blur-xl border-b border-slate-100 dark:border-slate-800/50 bg-white/80 dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
                <PieChart size={20} />
            </div>
            <h1 className="text-xl font-black tracking-tighter uppercase italic">
                Spend<span className="text-indigo-600">Wise</span>
            </h1>
          </motion.div>

          <div className="flex items-center gap-4 md:gap-8">
            {/* Language Switcher UX */}
            <div className="hidden sm:flex items-center gap-3 bg-slate-100 dark:bg-slate-900 p-1 rounded-full px-3">
              <span className={`text-[10px] font-bold ${!isMM ? 'text-indigo-600' : 'text-slate-400'}`}>EN</span>
              <button onClick={toggleLanguage} className="w-8 h-4 bg-slate-300 dark:bg-slate-700 rounded-full relative">
                <motion.div 
                  animate={{ x: isMM ? 16 : 0 }}
                  className="absolute top-0.5 left-0.5 w-3 h-3 bg-white rounded-full shadow-sm"
                />
              </button>
              <span className={`text-[10px] font-bold ${isMM ? 'text-indigo-600' : 'text-slate-400'}`}>MM</span>
            </div>

            <Link to="/auth?mode=login" className="text-sm font-bold hover:text-indigo-600 transition-colors">{ t('landing.login')}</Link>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/auth?mode=register" className="px-6 py-2.5 bg-indigo-600 text-white rounded-full text-sm font-black shadow-xl shadow-indigo-500/20 hover:bg-indigo-700 transition-all">
                { t('landing.get_started')}
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center pb-20">
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
            <Link to="/auth?mode=register" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-xl shadow-indigo-500/20">
              { t('landing.start_trial')} <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto relative"
        >
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] p-4 md:p-8 shadow-2xl">
            
            {/* StatCards Mockup */}
            <div className="grid grid-cols-3 gap-3 md:gap-6 mb-10">
               <MockStatCard label="Income" amount="+$4,250" color="text-emerald-500" />
               <MockStatCard label="Expense" amount="-$1,120" color="text-rose-500" />
               <MockStatCard label="Net Balance" amount="$3,130" color="text-indigo-600" />
            </div>

            {/* AreaChart Mockup - မင်းရဲ့ Component ပုံစံအတိုင်း Wave တွေနဲ့ */}
            <div className="space-y-6">
              <div className="flex justify-between items-center px-2">
                <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-400">Weekly Activity</h4>
                <div className="flex gap-4">
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] text-slate-500">Income</span></div>
                  <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /><span className="text-[10px] text-slate-500">Expense</span></div>
                </div>
              </div>

              <div className="h-64 w-full bg-slate-50/50 dark:bg-slate-800/30 rounded-[2rem] border border-slate-100 dark:border-slate-800/50 relative overflow-hidden p-6">
                {/* SVG AreaChart Mockup */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 100">
                  {/* Income Wave (Emerald) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: "easeInOut" }}
                    d="M 0 80 Q 50 20 100 50 T 200 30 T 300 60 T 400 20 L 400 100 L 0 100 Z"
                    fill="url(#gradientIncome)"
                    stroke="#10b981"
                    strokeWidth="2"
                  />
                  {/* Expense Wave (Rose) */}
                  <motion.path
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
                    d="M 0 90 Q 50 60 100 80 T 200 70 T 300 85 T 400 60 L 400 100 L 0 100 Z"
                    fill="url(#gradientExpense)"
                    stroke="#f43f5e"
                    strokeWidth="2"
                  />
                  {/* Gradients definitions */}
                  <defs>
                    <linearGradient id="gradientIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                    <linearGradient id="gradientExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Vertical Grid Lines Mockup */}
                <div className="absolute inset-0 flex justify-between px-10 py-6 pointer-events-none opacity-10">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-px h-full bg-slate-500" />
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity Mockup (အောက်ခြေမှာ အနည်းငယ်ပြမယ်) */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
               <MockTransaction title="Apple Store" amount="-$99.00" />
               <MockTransaction title="Freelance Project" amount="+$1,200" isIncome />
            </div>
          </div>
        </motion.div>
      </section>

      {/* --- Features Section --- */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-4xl font-black tracking-tight italic uppercase">
              Why Spend<span className="text-indigo-600">Wise</span>?
            </h2>
            <div className="w-20 h-1.5 bg-indigo-600 mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<ShieldCheck size={28} />}
              title={t('landing.secure_title')}
              desc={t('landing.secure_desc')}
              color="indigo"
            />
            <FeatureCard 
              icon={<PieChart size={28} />}
              title={t('landing.insights_title')}
              desc={t('landing.insights_desc')}
              color="emerald"
            />
            <FeatureCard 
              icon={<BarChart3 size={28} />}
              title={t('landing.budget_title')}
              desc={t('landing.budget_desc')}
              color="amber"
            />
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-20 text-center">
        <div className="flex items-center justify-center gap-2 mb-6 opacity-50">
          <div className="w-6 h-6 bg-slate-400 rounded-lg" />
          <span className="font-black uppercase tracking-tighter text-sm italic">SpendWise</span>
        </div>
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          &copy; 2026 • Crafted for Financial Freedom
        </p>
      </footer>
    </div>
  );
};

const MockStatCard = ({ label, amount, color }: any) => (
  <div className="p-4 md:p-6 rounded-[1.5rem] bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{label}</p>
    <h3 className={`text-sm md:text-xl font-black ${color}`}>{amount}</h3>
  </div>
);

const MockTransaction = ({ title, date, amount, isIncome }: any) => (
  <div className="flex items-center gap-4 p-4 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/50 hover:border-indigo-500/30 transition-colors">
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isIncome ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 dark:bg-slate-700 text-slate-500'}`}>
      <ArrowRight size={16} className={isIncome ? '-rotate-45' : 'rotate-45'} />
    </div>
    <div className="flex-1">
      <h5 className="text-[11px] font-black text-slate-900 dark:text-white leading-none mb-1">{title}</h5>
      <p className="text-[9px] font-medium text-slate-400 uppercase tracking-tighter">{date}</p>
    </div>
    <span className={`text-[11px] font-black ${isIncome ? 'text-emerald-500' : 'text-slate-900 dark:text-white'}`}>
      {amount}
    </span>
  </div>
);

// Reusable Feature Card Component
const FeatureCard = ({ icon, title, desc, color }: any) => (
  <motion.div 
    whileHover={{ y: -10 }}
    className=" space-y-6 p-8 rounded-[2.5rem] bg-white dark:bg-slate-900 border border-transparent transition-all duration-500"
  >
    <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mx-auto transition-transform duration-500
      ${color === 'indigo' ? 'bg-indigo-500/10 text-indigo-600' : 
        color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' : 
        'bg-amber-500/10 text-amber-600'}`}
    >
      {icon}
    </div>
    <div className="space-y-3">
      <h3 className="font-black text-2xl tracking-tight">{title}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">{desc}</p>
    </div>
  </motion.div>
);

export default Index;