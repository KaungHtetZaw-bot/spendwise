import React, { useState } from 'react'
import { Plus } from 'lucide-react';
import type { FormData } from '../../type/transaction';
import { useCategories, useAddCategory } from '../../hooks/useTransactions';

interface CategorySectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}
const CategorySection = ({ formData, setFormData }: CategorySectionProps) => {
    const { data: categories = [], error } = useCategories();
    const { mutate: addCategory, error: addCategoryError } = useAddCategory();
    const [isAdding, setIsAdding] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    
    const filteredCategories = categories?.filter(cat => cat.type === formData.type) || [];

    const onAddCategory = async () => {
        if (newCategoryName.trim()) {
            addCategory(
            { name: newCategoryName, type: formData.type },
            {
            onSuccess: (data) => {
                setCategoryId(data.category_id);
                setFormData((prev) => ({
                ...prev,
                category_id: data.category_id,
                }));
            },
            });
            setNewCategoryName('');
            setIsAdding(false);
        }
      };
  return (
    <div className="flex flex-wrap gap-3">
        <button 
        type="button"
        onClick={() => setIsAdding(!isAdding)}
        className={`md:w-16 md:h-12 w-10 h-10 flex items-center justify-center border-2 border-dashed rounded-2xl transition-all active:scale-95 ${
            isAdding 
            ? 'border-rose-500 text-rose-500 rotate-45' 
            : 'border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-500 hover:border-indigo-500'
        }`}
        >
        <Plus size={20} />
        </button>

        {isAdding && (
        <input 
            autoFocus
            type="text" 
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onAddCategory()}
            onBlur={() => !newCategoryName && setIsAdding(false)}
            placeholder="New Category..."
            className="md:px-6 md:py-3 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest bg-white dark:bg-slate-900 border-2 border-indigo-500 text-indigo-600 outline-none shadow-indigo-500/10 animate-in fade-in zoom-in-95 duration-200"
        />
        )}
        
        {filteredCategories.map((cat) => (
        <button
            key={cat.category_id}
            type="button"
            onClick={() => {
            setCategoryId(cat.category_id); 
            setFormData({ ...formData, category_id: cat.category_id });
            }}
            className={`md:px-6 md:py-3 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center shadow-sm ${
            categoryId === cat.category_id
            ? (formData.type === 'income' ? 'bg-indigo-600 text-white' : 'bg-rose-500 text-white') + ' shadow-md scale-105'
            : 'bg-white dark:bg-slate-900 text-slate-400 border border-slate-100 dark:border-slate-800'
            }`}
        >
            {cat.name}
        </button>
        ))}
    </div>
  )
}

export default CategorySection