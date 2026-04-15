import { Home, History, PieChart, Settings, LogOut,Plus } from 'lucide-react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';
import { logout } from '../lib/helper';
import { useConfirmationStore } from '../store/useConfirmationStore';

const Navbar = ({ onAddClick }: { onAddClick: () => void }) => {
  const { t } = useTranslation();
  const { profile } = useUserStore();
  const { openConfirm } = useConfirmationStore()

  const routeItems = [
    { name: t('nav.home'), href: '/home', icon: Home },
    { name: t('nav.history'), href: '/history', icon: History },
    { name: t('nav.stats'), href: '/stats', icon: PieChart },
    { name: t('nav.settings'), href: '/settings', icon: Settings },
  ];

  const handleLogout = () => {
    openConfirm({
      title: t('account.logout_confirm_title'),
      description: t('account.logout_confirm_msg'),
      confirmText: t('account.logout_confirm_btn'),
      type: "warning",
      onConfirm: async ()=>{logout}
    })
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:bottom-auto md:top-0 backdrop-blur-xl border-t md:border-t-0 md:border-b border-slate-200 dark:border-slate-800 px-4 py-2 md:py-3">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section (Desktop Only) */}
        <div className="hidden md:flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <PieChart size={18} />
            </div>
            <h1 className="hidden lg:block text-xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic">
                Spend<span className="text-indigo-600">Wise</span>
            </h1>
        </div>

        {/* Center Links */}
        <div className="flex justify-between w-full md:w-auto md:gap-8 items-center">
          {routeItems.slice(0, 2).map((item, idx) => (
            <NavLink key={idx} icon={<item.icon size={20} />} label={item.name} to={item.href} />
          ))}
          
          {/* Mobile Center Add Button */}
          <div className="relative md:hidden">
            <button 
              onClick={onAddClick}
              className="-mt-12 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center border-4 border-white dark:border-slate-950 active:scale-90 transition-transform"
            >
              <Plus size={28} />
            </button>
          </div>

          {routeItems.slice(2).map((item, idx) => (
            <NavLink key={idx} icon={<item.icon size={20} />} label={item.name} to={item.href} />
          ))}
        </div>

        {/* Desktop Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          
          {/* Add New Button (Desktop) */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-2 py-2 rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-500/20 active:scale-95"
          >
            <LogOut size={16} />
            {t('sign_out')}
          </button>

          <div className="h-6 w-[1px] bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Profile Section */}
          <div className="flex lg:flex-row flex-col items-center gap-3 pl-2">
             <div className="text-right flex flex-col items-end flex-end">
                <span className="text-xs font-black text-slate-900 dark:text-white leading-none capitalize">
                    {profile?.name || 'Guest'}
                </span>
             </div>
             
             <div className="flex start w-10 h-10 rounded-full border-2 border-slate-100 dark:border-slate-800 p-0.5 overflow-hidden ring-2 ring-indigo-500/10">
                <img 
                  src={profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name}`} 
                  alt="avatar" 
                  className="w-full h-full rounded-full object-cover"
                />
             </div>
          </div>
        </div>

      </div>
    </nav>
  );
};

const NavLink = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-1.5 rounded-xl transition-all ${
        isActive 
        ? 'text-indigo-600 dark:text-indigo-400 md:bg-indigo-50 md:dark:bg-indigo-500/10' 
        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
      }`
    }
  >
    {icon}
    <span className="text-[10px] md:text-[13px] font-black uppercase tracking-wide md:tracking-normal">{label}</span>
  </RouterNavLink>
);

export default Navbar;