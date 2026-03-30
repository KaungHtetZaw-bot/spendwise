import { Link } from 'react-router-dom';
import { Home, AlertCircle, ChevronLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
      
      <div className="relative mb-8">
        <div className="text-[12rem] font-black text-slate-100 dark:text-slate-900 leading-none select-none">
          404
        </div>
        {/* <div className="absolute inset-0 flex items-center justify-center">
          <div className="p-6 bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-800 animate-bounce">
            <AlertCircle size={48} className="text-indigo-600 dark:text-indigo-400" />
          </div>
        </div> */}
      </div>

      <div className="space-y-4 max-w-xs">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
          Oops! Lost in Space?
        </h1>
        <p className="text-sm font-medium text-slate-400 leading-relaxed italic">
          The page you are looking for doesn't exist or has been moved to another dimension.
        </p>
      </div>

      <div className="mt-10 flex flex-col w-full max-w-xs gap-4">
        <Link 
          to="/" 
          className="w-full py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <Home size={16} />
          Back to Dashboard
        </Link>
        
        <button 
          onClick={() => window.history.back()}
          className="w-full py-5 bg-white dark:bg-slate-900 text-slate-400 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] border border-slate-100 dark:border-slate-800 transition-all hover:text-slate-600 dark:hover:text-slate-200 flex items-center justify-center gap-2"
        >
          <ChevronLeft size={16} />
          Go Previous
        </button>
      </div>

    </div>
  );
};

export default NotFoundPage;