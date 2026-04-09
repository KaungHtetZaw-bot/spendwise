import { useState } from 'react';
import { ChevronLeft, User, Camera, ShieldAlert } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: any;
}

const AccountModal = ({ isOpen, onClose, profile }: AccountModalProps) => {
  const [name, setName] = useState(profile?.full_name || '');
  const [job, setJob] = useState(profile?.job_title || '');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleUpdate = async () => {
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .update({ full_name: name, job_title: job })
      .eq('user_id', profile.user_id);

    if (!error) {
      alert("Profile updated!");
      onClose();
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[70] bg-white dark:bg-slate-950 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
        <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500">
          <ChevronLeft size={20} />
        </button>
        <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Account Settings</h3>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-10 max-w-md mx-auto w-full">
        {/* Profile Picture Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative group">
            <div className="w-28 h-28 rounded-[2.5rem] bg-indigo-50 dark:bg-slate-900 flex items-center justify-center overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${name || 'user'}`} 
                alt="avatar" 
                className="w-24 h-24"
              />
            </div>
            <button className="absolute bottom-0 right-0 p-3 bg-indigo-600 text-white rounded-2xl shadow-lg border-4 border-white dark:border-slate-950 hover:scale-110 transition-transform">
              <Camera size={16} />
            </button>
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Display Name</label>
            <input 
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500 p-4 rounded-2xl outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm"
              placeholder="Your Name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Job Title / Role</label>
            <input 
              value={job}
              onChange={(e) => setJob(e.target.value)}
              className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-transparent focus:border-indigo-500 p-4 rounded-2xl outline-none font-bold text-slate-700 dark:text-white transition-all shadow-sm"
              placeholder="Developer, Student, etc."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 pt-4">
          <button 
            onClick={handleUpdate}
            disabled={loading}
            className="w-full py-5 bg-indigo-600 text-white rounded-[2rem] font-black text-[11px] uppercase tracking-[0.2em] shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
          >
            {loading ? "Saving Changes..." : "Save Changes"}
          </button>
          
          <div className="pt-8 border-t border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-2 mb-4 ml-2 text-rose-500">
                <ShieldAlert size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">Danger Zone</span>
             </div>
             <button className="w-full py-4 border-2 border-rose-50 dark:border-rose-900/20 text-rose-500 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest hover:bg-rose-50 transition-colors">
                Delete Account & Data
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModal;