import React from 'react'
import type { FormData } from '../../type/transaction'
import { DollarSign, PenLine } from "lucide-react"
import { useTranslation } from 'react-i18next';
import { useCurrency } from '../../hooks/useCurrency';

interface InputSectionProps {
    formData: FormData,
    setFormData: React.Dispatch<React.SetStateAction<FormData>>
    inputName?: 'amount' | 'note';
}

const InputSection = ({formData,setFormData, inputName}:InputSectionProps) => {
  const { t } = useTranslation();
  const { currency,symbol } = useCurrency();
  return (
    <div>
        <div className="space-y-2">
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-2 flex items-center gap-2">
              {inputName === 'amount' ? (
                <>
                 {symbol} {t('inputs.amount_label')}
                </>
              ) : (
                <>
                  <PenLine size={12} />
                  {t('inputs.note_label')}
                </>
              )}
            </label>
            <div className="relative">
              <input
                type={inputName === 'amount' ? 'number' : 'text'}
                value={inputName === 'amount' ? formData.amount : formData.note}
                onChange={(e) => {
                    if (inputName === 'amount') {
                    const value = e.target.value;

                    setFormData({
                      ...formData,
                      amount: value === '' ? '' : Number(value),
                    });
                  } else {
                    setFormData({
                      ...formData,
                      note: e.target.value,
                    });
                  }
                }}
                placeholder={inputName === 'amount' ? t('inputs.amount_placeholder') : t('inputs.note_placeholder')}
                required
                className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-xl md:p-4 p-2 font-black text-2xl text-slate-700 dark:text-white focus:border-blue-400 outline-none transition-all shadow-sm"
              />
              {inputName === 'amount' && (
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold tracking-tighter">{currency}</span>
                )}
            </div>
          </div>
    </div>
  )
}

export default InputSection