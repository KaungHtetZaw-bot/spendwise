import { 
  User, 
  Coins,  
  ChevronRight, 
  LogOut, 
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { supabase } from '../lib/supabase.ts';
import { useUserStore } from '../storage/useUserStore';
import { useState } from 'react';
import AccountModal from '../components/Setting/AccountModal.tsx';
import PerSonalSettingGroup from '../components/Setting/PersonalSettingGroup.tsx';
import BudgetCard from '../components/Setting/BudgetCard.tsx';

const SettingPage = () => {
  const { profile } = useUserStore();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const settingsGroups = [
    {
      title: "Security & App",
      items: [
        { icon: <ShieldCheck size={20} />, label: "Privacy Policy", value: "", color: "text-emerald-500",onClick: () => setIsPrivacyOpen(true)},
        { icon: <User size={20} />, label: "Account Setting", value: "", color: "text-indigo-500",onClick: () => setIsAccountOpen(true) },
      ]
    }
  ];

  const logout = async () => { 
    await supabase.auth.signOut();
    window.location.href = '/auth'; 
  };

  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 pb-24">
      <div className="max-w-xl mx-auto md:space-y-8 space-y-4">
        
        <div className="flex flex-col items-center md:py-8 py-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-tr from-indigo-600 to-blue-400 p-1 shadow-xl shadow-indigo-500/20">
              <div className="w-full h-full rounded-[2.3rem] bg-white dark:bg-slate-900 flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.full_name || 'Felix'}`} 
                  alt="avatar" 
                  className="w-20 h-20"
                />
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-2xl border border-slate-100 dark:border-slate-800 hover:scale-110 transition-transform">
              <Plus size={14} className="text-indigo-600" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900 dark:text-white">
            {profile?.full_name || 'User Name'}
          </h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
            {profile?.job_title || 'Junior Developer'}
          </p>
        </div>

        {/* Budget Card */}
        <BudgetCard />

        < PerSonalSettingGroup />

        {/* Settings Groups */}
        {settingsGroups.map((group, idx) => (
          <div key={idx} className="space-y-3">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">
              {group.title}
            </h3>
            <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
              {group.items.map((item, i) => (
                <button 
                  key={i}
                  onClick={item?.onClick}
                  className={`w-full flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all ${
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
                    {item.value && <span className="text-[11px] font-black text-slate-400">{item.value}</span>}
                    <ChevronRight size={14} className="text-slate-300" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
        

        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <div className="absolute h-screen inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsPrivacyOpen(false)} />
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg max-h-[80vh] md:rounded-[2.5rem] rounded-[1.25rem] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Privacy Policy</h3>
                <button onClick={() => setIsPrivacyOpen(false)} className="text-slate-400 font-bold text-xs uppercase">Close</button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 prose dark:prose-invert prose-sm">
                <h4 className="text-slate-900 dark:text-white font-black">1. Data Collection</h4>
                <p className="text-slate-500 dark:text-slate-400">We collect your email and transaction data solely to provide expense tracking services. Your data is stored securely via Supabase.</p>
                <h4 className="text-slate-900 dark:text-white font-black mt-4">2. Data Security</h4>
                <p className="text-slate-500 dark:text-slate-400">All data is encrypted and we do not share your personal information with third parties.</p>
              </div>
            </div>
          </div>
        )}

        <AccountModal isOpen={isAccountOpen} onClose={()=>setIsAccountOpen(!isAccountOpen)} profile={profile} />

        {/* Sign Out Button */}
        <button 
          onClick={logout} 
          className="w-full py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-rose-500 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all mt-4 mb-10 shadow-sm hover:bg-rose-50 dark:hover:bg-rose-950/20"
        >
          <LogOut size={18} />
          Sign Out Account
        </button>

      </div>
    </div>
  );
};

export default SettingPage;