import { useState } from 'react';
import { ChevronLeft, Camera, ShieldAlert, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore';
import { StoreAvatar } from '../lib/helper';

const AccountPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profile, setProfile } = useUserStore();

  const [name, setName] = useState(profile?.name || '');
  const [career, setCareer] = useState(profile?.career || '');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarPreview(URL.createObjectURL(file));
    setAvatarFile(file);
  };

    const handleUpdate = async () => {
        if (!profile) return;
        if (
        name === profile.name &&
        career === profile.career &&
        !avatarFile
        ) return;
        setLoading(true);

        let avatar_url = profile.avatar_url;

        try {
            // 1. Upload avatar if exists
            if (avatarFile) {
            avatar_url = await StoreAvatar(avatarFile, profile.user_id);
            }

            // 2. Update DB
            const { error } = await supabase
            .from('users')
            .update({ name, career, avatar_url })
            .eq('user_id', profile.user_id);

            if (error) throw error;

            // 3. Update local state
            setProfile({
            ...profile,
            name,
            career,
            avatar_url,
            });

            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);

        } catch (error: any) {
            alert(error.message || "Update failed");
        } finally {
            setLoading(false);
        }
    };

  return (
    <div className="min-h-screen">
      {/* Header - Fixed Top */}
      <div className="sticky top-0 z-30">
        <div className="mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate(-1)} 
              className="md:p-3 p-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl text-slate-500 hover:text-indigo-600 transition-colors shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="hidden md:block font-black text-slate-900 dark:text-white uppercase tracking-widest text-[11px]">
              {t('account.title')}
            </h1>
          </div>
          
          {status === 'success' && (
            <div className="flex items-center gap-2 text-emerald-500 animate-in fade-in zoom-in duration-300">
              <CheckCircle2 size={16} />
              <span className="text-[10px] font-black uppercase tracking-widest">Saved</span>
            </div>
          )}
        </div>
      </div>

      <div className="mx-auto md:py-12 py-6 md:space-y-12 space-y-6">
        {/* Profile Avatar Section */}
        <section className="bg-white dark:bg-slate-900 md:rounded-[2.5rem] rounded-[1.25rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl flex flex-col items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-[3rem] bg-indigo-50 dark:bg-slate-950 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative">
              {uploading && (
                <div className="absolute inset-0 z-10 bg-black/20 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="animate-spin text-white" size={24} />
                </div>
              )}
              
              { avatarPreview ? (
                <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
              ) : profile?.avatar_url ? (
                <img src={`${profile.avatar_url}?t=${Date.now()}`} alt="avatar" className="w-full h-full object-cover" />
              ) : (
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'user'}`} 
                  alt="avatar" 
                  className="w-24 h-24"
                />
              )}
            </div>
            
            {/* Input file ကို Camera ခလုတ်နဲ့ ချိတ်မယ် */}
            <label className="absolute bottom-0 right-0 p-3.5 bg-indigo-600 text-white rounded-[1.25rem] shadow-lg border-4 border-white dark:border-slate-900 hover:bg-indigo-700 active:scale-90 transition-all cursor-pointer">
              <Camera size={18} />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">{name || "User"}</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{career || "Member"}</p>
          </div>
        </section>

        {/* Form Inputs Section */}
        <section className="md:space-y-8 space-y-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('account.name_label')}</label>
              <input 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500/30 p-4 md:rounded-2xl rounded-xl outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm border-slate-100 dark:border-slate-800"
                placeholder={ t('account.name_placeholder') }
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{t('account.job_label')}</label>
              <input 
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                className="w-full bg-white dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500/30 p-4 md:rounded-2xl rounded-xl outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm border-slate-100 dark:border-slate-800"
                placeholder={ t('account.job_placeholder') }
              />
            </div>
          </div>

          <button 
            onClick={handleUpdate}
            disabled={loading}
            className="w-full py-5 bg-indigo-600 text-white md:rounded-3xl rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] shadow-2xl shadow-indigo-500/30 hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {loading ? t('account.saving') : t('account.save')}
          </button>
        </section>

        {/* Danger Zone */}
        <section className="pt-12 border-t border-slate-200 dark:border-slate-800">
           <div className="flex items-center gap-2 mb-6 ml-4 text-rose-500">
              <ShieldAlert size={16} />
              <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t('account.danger_zone')}</span>
           </div>
           <div className="p-8 bg-rose-50/30 dark:bg-rose-950/10 border border-rose-100 dark:border-rose-900/20 md:rounded-[2.5rem] rounded-[1.25rem] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h4 className="text-sm font-black text-slate-900 dark:text-white">Delete Account</h4>
                <p className="text-[10px] font-bold text-slate-400 mt-1">This action is permanent and cannot be undone.</p>
              </div>
              <button className="px-8 py-4 bg-white dark:bg-slate-900 border-2 border-rose-100 dark:border-rose-900/30 text-rose-500 md:rounded-2xl rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all">
                {t('account.delete')}
              </button>
           </div>
        </section>
      </div>
    </div>
  );
};

export default AccountPage;