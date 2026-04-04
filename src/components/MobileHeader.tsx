import ThemeDropdown from "./ThemeDropdown";
import { useTheme } from "../providers/ThemeProvider";
import { useUserStore } from "../storage/useUserStore";

const MobileHeader = () => {
  const { profile } = useUserStore();
  const { theme, setTheme } = useTheme()!;

  return (
    <div className="flex items-center justify-between px-4 py-4 md:hidden bg-white/50 dark:bg-slate-950/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold shadow-sm">
          {profile?.name ? profile.name.charAt(0) : "K"}
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Welcome back,</p>
          <h2 className="text-sm font-black text-slate-900 dark:text-slate-100 mt-1">{profile?.name || "Kaung Htet"}</h2>
        </div>
      </div>

      <ThemeDropdown theme={theme} setTheme={setTheme} />

      <button className="p-2 rounded-xl text-slate-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>
      </button>
    </div>
  );
};

export default MobileHeader;