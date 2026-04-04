const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900 z-50">

      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>

      <p className="mt-4 text-slate-600 dark:text-slate-300 font-medium animate-pulse">
        Checking authentication...
      </p>

      <p className="mt-1 text-sm text-slate-400">
        Please wait a moment
      </p>
    </div>
  );
};

export default LoadingScreen;