import { 
  User,   
  ChevronRight, 
  LogOut, 
  ShieldCheck,
  Plus,
} from 'lucide-react';
import { useUserStore } from '../store/useUserStore.ts';
import { useState } from 'react';
import PerSonalSettingGroup from '../components/Setting/PersonalSettingGroup.tsx';
import BudgetCard from '../components/Setting/BudgetCard.tsx';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { logout } from '../lib/helper.ts';
import BudgetModal from '../components/Setting/BudgetModal.tsx';
import { useConfirmationStore } from '../store/useConfirmationStore.ts';

const SettingPage = () => {
  const { profile } = useUserStore();
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openConfirm } = useConfirmationStore()
  const settingsGroups = [
    {
      title: t('security_app'),
      items: [
        { icon: <ShieldCheck size={20} />, label: t('privacy.title'), value: "", color: "text-emerald-500",onClick: () => setIsPrivacyOpen(true)},
        { icon: <User size={20} />, label: t('account_settings'), value: "", color: "text-indigo-500",onClick: () => navigate('/settings/account')}, 
      ]
    }
  ];

  const handleLogout = () => {
    openConfirm({
      title: t('account.logout_confirm_title'),
      description: t('account.logout_confirm_msg'),
      confirmText: t('account.logout_confirm_btn'),
      type: "warning",
      onConfirm: async() => {logout}
    })
  }

  return (
    <div className="min-h-screen pb-24">
      <div className="md:space-y-8 space-y-4">
        <div className="flex flex-col items-center md:py-8 py-6">
          <div className="relative">
            <div className='md:w-34 md:h-34 w-30 h-30 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500'>
              {
              profile?.avatar_url ? (
                <img src={`${profile.avatar_url}?t=${Date.now()}`} alt="Avatar" className="w-full h-full object-cover rounded-full" />
              ) : (
                <img 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile?.name || 'Felix'}`} 
                  alt="avatar" 
                  className="w-full h-full rounded-full bg-slate-200 dark:bg-slate-800 p-2 text-slate-500"
                />
              )
            }
            </div>
            <button onClick={()=> navigate('/settings/account')} className="absolute bottom-0 right-0 p-2 bg-white dark:bg-slate-800 shadow-lg rounded-2xl border border-slate-100 dark:border-slate-800 hover:scale-110 transition-transform">
              <Plus size={14} className="text-indigo-600" />
            </button>
          </div>
          <h2 className="mt-4 text-xl font-black text-slate-900 dark:text-white">
            {profile?.name || 'User Name'}
          </h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">
            {profile?.career || 'Junior Developer'}
          </p>
        </div>

        {/* Budget Card */}
        <BudgetCard onOpenModal={setIsModalOpen}/>

        < PerSonalSettingGroup />

        {/* Settings Groups */}
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
        
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <div className="absolute h-screen inset-0 bg-slate-900/60 backdrop-blur-md" onClick={() => setIsPrivacyOpen(false)} />
            <div className="relative bg-white dark:bg-slate-900 w-full max-w-lg max-h-[80vh] md:rounded-[2.5rem] rounded-[1.25rem] overflow-hidden flex flex-col shadow-2xl border border-slate-100 dark:border-slate-800">
              <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex justify-between items-center">
                <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">{t('privacy.title')}</h3>
                <button onClick={() => setIsPrivacyOpen(false)} className="text-slate-400 font-bold text-xs uppercase">{t('privacy.close')}</button>
              </div>
              <div className="flex-1 overflow-y-auto p-8 prose dark:prose-invert prose-sm">
                <h4 className="text-slate-900 dark:text-white font-black">{t('privacy.section1_title')}</h4>
                <p className="text-slate-500 dark:text-slate-400">{t('privacy.section1_desc')}</p>
                <h4 className="text-slate-900 dark:text-white font-black mt-4">{t('privacy.section2_title')}</h4>
                <p className="text-slate-500 dark:text-slate-400">{t('privacy.section2_desc')}</p>
              </div>
            </div>
          </div>
        )}

        {/* Sign Out Button */}
        <button 
          onClick={handleLogout} 
          className="w-full py-5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 text-rose-500 rounded-[1.5rem] font-black text-[11px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 active:scale-95 transition-all mt-4 mb-10 shadow-sm hover:bg-rose-50 dark:hover:bg-rose-950/20"
        >
          <LogOut size={18} />
          { t('sign_out') }
        </button>

      </div>
      <BudgetModal isOpen={isModalOpen} onClose={()=>setIsModalOpen(false)} />
    </div>
  );
};

export default SettingPage;