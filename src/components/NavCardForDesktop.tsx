import { Palette, Globe, Coins, Bell, User as UserIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const NavCardForDesktop = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row gap-6 items-start">
      
      {/* 1. Sidebar Card (Hidden on Mobile, Sticky on Desktop) */}
      <aside className="hidden md:flex w-72 flex-col gap-2 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2rem] shadow-sm sticky top-28">
        <h3 className="px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
            Quick Settings
        </h3>
        
        <SidebarLink icon={<Palette size={18} />} label="Theme & Design" active />
        <SidebarLink icon={<Globe size={18} />} label="Language" />
        <SidebarLink icon={<Coins size={18} />} label="Currency" />
        <SidebarLink icon={<Bell size={18} />} label="Notifications" />
        
        <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-500/10 rounded-2xl border border-indigo-100 dark:border-indigo-500/20">
            <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 leading-snug">
                Your profile is 80% complete. Add an avatar to reach 100%.
            </p>
        </div>
      </aside>

      {/* 2. Main Content Card */}
      <div className="flex-1 w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm">
        
        {/* Profile Header in Main Card */}
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Account Settings
            </h2>
            <p className="text-sm font-medium text-slate-500">Manage your preference and account security.</p>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-8">
            {/* မင်းရဲ့ Existing Settings Components (Theme, Lang, Currency) တွေကို ဒီထဲမှာ ထည့်မယ် */}
            <section>
                {/* Theme Toggle Component */}
            </section>
            
            <section>
                {/* Language Switcher Component */}
            </section>

            <section>
                {/* Currency Selector Component */}
            </section>
        </div>
      </div>

    </div>
  );
};

// Sidebar Link Component
const SidebarLink = ({ icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-bold text-sm ${
        active 
        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-[1.02]' 
        : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
    }`}>
        {icon}
        {label}
    </button>
)

export default NavCardForDesktop;