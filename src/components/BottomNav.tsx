import { Home, History, PieChart, Settings, Plus } from 'lucide-react';
const BottomNav = ({ onAddClick }: { onAddClick: () => void }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:bottom-auto md:top-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-lg border-t md:border-t-0 md:border-b border-slate-200 dark:border-slate-800 px-6 py-2 md:py-4">
      <div className="max-w-4xl mx-auto flex justify-between items-center">
        
        <h1 className="hidden md:block text-xl font-bold tracking-tighter text-indigo-600 dark:text-indigo-400">
            ExpenseTracker
        </h1>

        <div className="flex justify-between w-full md:w-auto md:gap-12 items-center">
          <NavLink icon={<Home size={22} />} label="Home" active />
          <NavLink icon={<History size={22} />} label="History" />
          
          <div className="relative md:hidden">
            <button 
              onClick={onAddClick}
              className="-mt-12 w-14 h-14 bg-indigo-600 text-white rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center transition-transform active:scale-90 border-4 border-white dark:border-slate-950"
            >
              <Plus size={28} />
            </button>
          </div>

          <NavLink icon={<PieChart size={22} />} label="Stats" />
          <NavLink icon={<Settings size={22} />} label="Settings" />
        </div>

        <div className="hidden md:block w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800" />
      </div>
    </nav>
  );
};

const NavLink = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 transition-colors ${active ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 hover:text-slate-600'}`}>
    {icon}
    <span className="text-[10px] md:text-sm font-medium">{label}</span>
  </button>
);

export default BottomNav;