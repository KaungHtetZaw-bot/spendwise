import { useState } from 'react'
import { Bell,BellOff } from 'lucide-react';


const NotifyToggle = () => {
    const [isNotifyEnabled, setIsNotifyEnabled] = useState(true);
    
  return (
    <>
        <div className="flex items-center gap-4 px-1">
        <div className={`p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 transition-colors text-indigo-400`}>
            {isNotifyEnabled ? <Bell size={20} /> : <BellOff size={20} />}
        </div>
        <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Notifications</span>
        </div>
        <button 
        onClick={() => setIsNotifyEnabled(!isNotifyEnabled)}
        className={`w-12 h-6 rounded-full transition-all relative ${isNotifyEnabled ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'}`}
        >
        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 shadow-sm ${isNotifyEnabled ? 'left-7' : 'left-1'}`} />
        </button>
    </>
  )
}

export default NotifyToggle