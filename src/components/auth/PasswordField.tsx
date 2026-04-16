import { useState } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label: string;
}

const PasswordField = ({ value, onChange, placeholder = "••••••••", label }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="md:space-y-2 space-y-1">
      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">
        {label}
      </label>
      <div className="relative group">
        {/* Icon */}
        <Lock 
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" 
          size={18} 
        />
        
        {/* Input */}
        <input 
          type={showPassword ? "text" : "password"} 
          placeholder={placeholder}
          required 
          value={value}
          onChange={(e) => onChange(e.target.value)} 
          className="w-full bg-slate-50 dark:bg-slate-950 border-2 border-transparent focus:border-indigo-500/20 rounded-2xl py-3.5 pl-12 pr-12 font-bold text-slate-700 dark:text-white outline-none transition-all" 
        />

        {/* Eye Toggle Button */}
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 transition-colors focus:outline-none"
        >
          {!showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordField;