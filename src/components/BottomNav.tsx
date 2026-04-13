import { Home, History, PieChart, Settings, Plus } from 'lucide-react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';

const BottomNav = ({ onAddClick }: { onAddClick: () => void }) => {
  const { t } = useTranslation();
  const { profile } = useUserStore();

const routeItems = [
  { name: t('nav.home'), href: '/home', icon: Home },
  { name: t('nav.history'), href: '/history', icon: History },
  { name: t('nav.stats'), href: '/stats', icon: PieChart },
  { name: t('nav.settings'), href: '/settings', icon: Settings },
];
  const mid = Math.ceil(routeItems.length / 2);
  const firstHalf = routeItems.slice(0, mid);
  const secondHalf = routeItems.slice(mid);

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 md:bottom-auto md:top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-t md:border-t-0 md:border-b border-slate-200 dark:border-slate-800 px-6 py-2 md:py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        <h1 className="hidden md:block text-xl font-bold tracking-tighter text-indigo-600 dark:text-indigo-400">
            ExpenseTracker
        </h1>

        <div className="flex justify-between w-full md:w-auto md:gap-12 items-center">
          {firstHalf.map((item, idx) => (
            <NavLink
              key={idx}
              icon={<item.icon size={22} />}
              label={item.name}
              to={item.href}
            />
          ))}
          
          <div className="relative md:hidden">
            <button 
              onClick={onAddClick}
              className="-mt-12 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center transition-transform active:scale-90 border-4 border-white dark:border-slate-950"
            >
              <Plus size={28} />
            </button>
          </div>

          {secondHalf.map((item, idx) => (
            <NavLink
              key={idx}
              icon={<item.icon size={22} />}
              label={item.name}
              to={item.href}
            />
          ))}
        </div>

        <div className="hidden md:block w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-800" >
          {
            profile?.avatar_url ? (
              <img 
                src={`${profile.avatar_url}?t=${Date.now()}`} 
                alt="avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'Felix'}`} 
                alt="avatar" 
                className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 object-cover"
              />
            )
          }
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ icon, label, to }: { icon: React.ReactNode; label: string; to: string }) => (
  <RouterNavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors ${
        isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'
      }`
    }
  >
    {icon}
    <span className="text-[10px] md:text-sm font-medium">{label}</span>
  </RouterNavLink>
);

export default BottomNav;