import React from 'react'
import { ArrowLeft, Camera, Briefcase, Wallet } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface UserInfoFormProps {
  onBack: () => void;
  avatarPreview: string | null;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  career: string;
  setCareer: (val: string) => void;
  income: number;
  setIncome: (val: number) => void;
  currency: 'MMK' | 'USD';
  setCurrency: (val: 'MMK' | 'USD') => void;
}

const UserInfoForm = ({
  onBack,
  avatarPreview,
  handleFileChange,
  career,
  setCareer,
  income,
  setIncome,
  currency,
  setCurrency
}:UserInfoFormProps) => {
    const { t } = useTranslation();
  return (
     <div className="animate-in slide-in-from-right duration-500">
        <button type="button" onClick={onBack} className="mb-4 flex items-center gap-1 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-500">
            <ArrowLeft size={14} /> {t('auth.back')}
        </button>

        <div className="flex flex-col items-center mb-6">
            <label className="relative group cursor-pointer">
            <div className="w-20 h-20 rounded-[2rem] bg-slate-50 dark:bg-slate-950 border-2 border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-center overflow-hidden group-hover:border-indigo-500/50 transition-all">
                {avatarPreview ? <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" /> : <Camera className="text-slate-300" size={28} />}
            </div>
            <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-3">{t('auth.upload_photo')}</span>
        </div>
        
        <div className="md:space-y-2 space-y-1 mb-4">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t('auth.career')}</label>
            <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input type="text" placeholder="your career" value={career} required onChange={(e) => setCareer(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all" />
            </div>
        </div>

        <div className="md:space-y-2 space-y-1">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{t('auth.income')}</label>
            <div className="relative group">
            <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
            <input type="number" placeholder="3000" value={income} required onChange={(e) => setIncome(Number(e.target.value))} className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-24 font-bold text-slate-700 dark:text-white outline-none transition-all" />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-100 dark:border-slate-800">
                <button type="button" onClick={() => setCurrency('MMK')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${currency === 'MMK' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}>Ks</button>
                <button type="button" onClick={() => setCurrency('USD')} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${currency === 'USD' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-400'}`}>$</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default UserInfoForm