import React, { useState, useEffect } from 'react';
import { ChevronLeft, Plus, DollarSign, PenLine, Calendar as CalendarIcon, Check } from 'lucide-react';
import { DatePicker } from '@mantine/dates';

interface Category {
  id: string;
  name: string;
  type: 'income' | 'expense';
}

const AddTransactionModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [categoryId, setCategoryId] = useState('');

  const allCategories: Category[] = [
    { id: '1', name: 'Salary', type: 'income' },
    { id: '2', name: 'Rewards', type: 'income' },
    { id: '3', name: 'Food', type: 'expense' },
    { id: '4', name: 'Transport', type: 'expense' },
    { id: '5', name: 'Shopping', type: 'expense' },
  ];

  const filteredCategories = allCategories.filter(cat => cat.type === type);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-slate-900/10 dark:bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg h-screen bg-[#F8F9FD] dark:bg-slate-950 shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">
        
        <div className="bg-white dark:bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-50 dark:border-slate-800">
          <button onClick={onClose} className="p-2 border border-slate-100 dark:border-slate-800 rounded-full text-slate-400">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            <button 
              onClick={() => setType('income')}
              className={`md:px-6 px-3 md:py-2 py-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'income' ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              Income
            </button>
            <button 
              onClick={() => setType('expense')}
              className={`md:px-6 px-3 md:py-2 py-1 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${type === 'expense' ? 'bg-white dark:bg-slate-700 text-rose-500 shadow-sm' : 'text-slate-400'}`}
            >
              Expense
            </button>
          </div>
          <div className="w-10" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32">
          
          <div className="bg-white dark:bg-slate-900 rounded-[1rem] md:p-4 p-2 shadow-sm border border-slate-100 dark:border-slate-800">
             <div className="flex items-center gap-2 mb-4 ml-2">
                <CalendarIcon size={14} className="text-blue-500" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Select Date</span>
             </div>
            <DatePicker 
              value={selectedDate} 
              onChange={setSelectedDate}
              size="md"
              fullWidth
              className="mx-auto"
              getDayProps={(date) => ({
                selected: selectedDate && date.toString() === selectedDate.toDateString(),
                style: {
                    borderRadius: '12px',
                    fontWeight: 700,
                    ...(selectedDate && date.toString() === selectedDate.toDateString() && {
                        backgroundColor: type === 'income' ? '#2563eb' : '#e11d48',
                        color: 'white'
                    }),
                    paddingBottom: 0
                }
              })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
              <PenLine size={12} /> {type === 'income' ? 'Income' : 'Expense'} Note
            </label>
            <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What was this for?"
              className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl md:p-4 p-2 font-bold text-slate-700 dark:text-white focus:border-blue-400 outline-none transition-all shadow-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
              <DollarSign size={12} /> Amount
            </label>
            <div className="relative">
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl md:p-4 p-2 font-black text-2xl text-slate-700 dark:text-white focus:border-blue-400 outline-none transition-all shadow-sm"
              />
              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold tracking-tighter">Ks.</span>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2">Classification</label>
            <div className="flex flex-wrap gap-3">
              <button className="w-10 h-10 flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:bg-white dark:hover:bg-slate-900 transition-colors">
                <Plus size={20} />
              </button>
              
              {filteredCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryId(cat.id)}
                  className={`md:px-6 md:py-4 px-2 py-1 rounded-lg font-black uppercase transition-all flex items-center shadow-sm gap-2 ${
                    categoryId === cat.id 
                    ? (type === 'income' ? 'bg-blue-600 text-white' : 'bg-rose-500 text-white') + ' scale-105 shadow-lg'
                    : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
            <div className='flex justify-center'>
              <button className={`md:w-full w-1/2 px-2 md:py-5 py-3 mt-5 rounded-2xl font-black text-[11px] uppercase text-white shadow-xl transition-all active:scale-95 ${
              type === 'income' ? 'bg-blue-600' : 'bg-rose-500'
            }`}>
              Save {type}
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;