import { Link } from "react-router-dom";
import { 
  Wallet, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  BarChart3, 
  PieChart 
} from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-[100dvh] h-full overflow-y-auto bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-100">
      
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 bg-white/70 dark:bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2 font-black text-xl text-indigo-600 dark:text-indigo-400">
            <Wallet className="w-8 h-8" />
            <span className="tracking-tight">SpendWise</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/auth?mode=login" className="text-sm font-bold hover:text-indigo-500 transition-colors">Login</Link>
            <Link to="/auth?mode=register" className="px-5 py-2 bg-indigo-600 text-white rounded-full text-sm font-bold shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-6 border border-emerald-500/20">
            <TrendingUp size={14} />
            <span className="text-[10px] font-black uppercase tracking-wider">Smart Finance Tracking</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black mb-6 leading-[1.1]">
            Take Control of Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
              Financial Future.
            </span>
          </h1>
          
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
            မင်းရဲ့ နေ့စဉ်အသုံးစရိတ်တွေကို စနစ်တကျ မှတ်သားပြီး ငွေစုဆောင်းနိုင်မယ့် နည်းလမ်းကောင်း။ 
            Simple, Secure, and Automated.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/auth?mode=register" className="w-full sm:w-auto px-10 py-4 bg-indigo-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-500/20">
              Start Free Trial <ArrowRight size={20} />
            </Link>
          </div>
        </div>

        {/* Mockup Preview - Dashboard အသွင်ပြောင်းလဲပြသခြင်း */}
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
            <h3 className="font-black text-xl">Secure Data</h3>
            <p className="text-slate-500 text-sm">Supabase နဲ့ ချိတ်ဆက်ထားလို့ မင်းရဲ့ data တွေက အမြဲတမ်း လုံခြုံနေမှာပါ။</p>
          </div>
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
              <PieChart size={24} />
            </div>
            <h3 className="font-black text-xl">Visual Insights</h3>
            <p className="text-slate-500 text-sm">Chart တွေ၊ Graph တွေနဲ့ မင်းငွေ ဘယ်ကိုရောက်နေလဲဆိုတာ ရှင်းရှင်းလင်းလင်း သိနိုင်မယ်။</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-2xl flex items-center justify-center mx-auto">
              <BarChart3 size={24} />
            </div>
            <h3 className="font-black text-xl">Monthly Budget</h3>
            <p className="text-slate-500 text-sm">လအလိုက် Budget သတ်မှတ်ပြီး ပိုမသုံးမိအောင် ထိန်းချုပ်လိုက်ပါ။</p>
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