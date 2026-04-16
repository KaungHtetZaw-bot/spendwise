import { motion } from "framer-motion";

interface ToggleSwitchProps {
    active: boolean,
    onClick: ()=> void,
    label?:string
}

const ToggleSwitch = ({ active, onClick, label }: ToggleSwitchProps) => (
  <button 
    onClick={onClick}
    className={`w-12 h-6 rounded-full relative transition-all duration-500 flex items-center shadow-inner cursor-pointer ${
      active ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-800'
    }`}
  >
    <motion.div 
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`absolute w-4 h-4 bg-white rounded-full transition-all duration-500 shadow-md flex items-center justify-center overflow-hidden ${
        active ? 'left-7' : 'left-1'
    }`}>
       {label && <span className="text-[8px] font-black text-indigo-600 leading-none">{label}</span>}
    </motion.div>
  </button>
);

export default ToggleSwitch