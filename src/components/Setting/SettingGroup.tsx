import React from 'react'
import { Bell, ChevronRight, Coins, ShieldCheck, User } from 'lucide-react';

const SettingGroup = () => {
    const settingsGroups = [
    {
      title: "Personal Preference",
      items: [
        { icon: <Coins size={20} />, label: "Currency", value: "MMK (Ks)", color: "text-amber-500" },
        { icon: <Bell size={20} />, label: "Notifications", value: "On", color: "text-rose-500" },
      ]
    },
    {
      title: "Security & App",
      items: [
        { icon: <ShieldCheck size={20} />, label: "Privacy Policy", value: "", color: "text-emerald-500",onClick: () => setIsPrivacyOpen(true)},
        { icon: <User size={20} />, label: "Account Setting", value: "", color: "text-indigo-500",onClick: () => setIsAccountOpen(true) },
      ]
    }
  ];
  return (
    <div>
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
    </div>
  )
}

export default SettingGroup