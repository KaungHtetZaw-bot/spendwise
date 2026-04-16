import type{ LucideIcon } from 'lucide-react';

interface FormInputProps {
  label: string;
  icon: LucideIcon;
  type?: string;
  placeholder?: string;
  value: any;
  onChange: (val: any) => void;
  required?: boolean;
}

const FormInput = ({ label, icon: Icon, type = "text", placeholder, value, onChange, required = true }: FormInputProps) => (
  <div className="md:space-y-2 space-y-1">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">{label}</label>
    <div className="relative group">
      <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" size={18} />
      <input 
        type={type} placeholder={placeholder} required={required}
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-4 font-bold text-slate-700 dark:text-white outline-none transition-all"
      />
    </div>
  </div>
);

export default FormInput;