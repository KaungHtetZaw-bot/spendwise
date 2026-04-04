import { 
  User, 
  Globe, 
  Coins,  
  ChevronRight, 
  LogOut, 
  Bell,
  ShieldCheck,Plus
} from 'lucide-react';
import { supabase } from '../lib/supabase.ts';

const SettingPage = () => {
  const settingsGroups = [
    {
      title: "Personal Preference",
      items: [
        { icon: <Coins size={20} />, label: "Currency", value: "MMK (Ks)", color: "text-amber-500" },
        { icon: <Globe size={20} />, label: "Language", value: "English (EN)", color: "text-blue-500" },
        { icon: <Bell size={20} />, label: "Notifications", value: "On", color: "text-rose-500" },
      ]
    },
    {
      title: "Security & App",
      items: [
        { icon: <ShieldCheck size={20} />, label: "Privacy Policy", value: "", color: "text-emerald-500" },
        { icon: <User size={20} />, label: "Account Setting", value: "", color: "text-indigo-500" },
      ]
    }
  ];

  const logout = async() => { 
    await supabase.auth.signOut();
    window.location.href = '/auth'; 
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 pb-24">
      <div className="max-w-xl mx-auto md:space-y-8 space-y-4">
        
        <div className="flex flex-col items-center md:py-8 py-4">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 to-blue-400 p-1">
              <div className="w-full h-full rounded-[2.3rem] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
                  alt="avatar" 
                  className="w-20 h-20"
                />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-2xl border border-slate-100 dark:border-slate-800">
              <Plus size={14} className="text-indigo-600" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900 dark:text-white">Kaung Htet Zaw</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Junior Developer</p>
        </div>

        <div className="bg-indigo-600 md:rounded-[2.5rem] rounded-[1.25rem] md:p-8 p-4 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 md:p-8 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Coins size={80} />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">Monthly Budget</p>
          <h3 className="text-3xl font-black mt-2 tracking-tighter">1,500,000 <span className="text-sm font-medium opacity-70">Ks</span></h3>
          <button className="md:mt-6 mt-3 px-6 py-2 bg-white/20 backdrop-blur-md rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/30 transition-all">
            Edit Income
          </button>
        </div>

        {settingsGroups.map((group, idx) => (
          <div key={idx} className="space-y-4">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">
              {group.title}
            </h3>
            <div className="bg-white dark:bg-slate-900 md:rounded-[2rem] rounded-[1rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              {group.items.map((item, i) => (
                <button 
                  key={i}
                  className={`w-full flex items-center justify-between md:p-5 p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all ${
                    i !== group.items.length - 1 ? 'border-b border-slate-50 dark:border-slate-800/50' : ''
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 ${item.color}`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {item.value && <span className="text-xs font-bold text-slate-400">{item.value}</span>}
                    <ChevronRight size={16} className="text-slate-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* <div className="bg-white dark:bg-slate-900 rounded-[2rem] p-5 border border-slate-100 dark:border-slate-800 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 text-amber-500">
              {darkMode ? <Moon size={20} /> : <Sun size={20} />}
            </div>
            <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Dark Mode</span>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`w-12 h-6 rounded-full transition-all relative ${darkMode ? 'bg-indigo-600' : 'bg-slate-200'}`}
          >
            <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${darkMode ? 'left-7' : 'left-1'}`} />
          </button>
        </div> */}

        <button onClick={()=>logout()} className="w-full py-5 bg-rose-50 dark:bg-rose-900/10 text-rose-500 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all mt-4 mb-10">
          <LogOut size={18} />
          Sign Out Account
        </button>

      </div>
    </div>
  );
};

export default SettingPage;