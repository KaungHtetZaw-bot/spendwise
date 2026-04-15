import React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react';
import { DatePicker } from '@mantine/dates';
import type { FormData } from '../../type/transaction';
import { useTranslation } from 'react-i18next';

interface CalendarSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const CalendarSection = ({formData,setFormData}:CalendarSectionProps) => {
  const { t } = useTranslation()
  return (
    <>
    <div className="bg-white dark:bg-slate-900 rounded-[1rem] md:p-4 p-2 pt-[calc(1rem+env(safe-area-inset-top))] shadow-sm border border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 mb-4 ml-2">
            <CalendarIcon size={14} className="text-blue-500" />
            <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">{ t('time.select_date')}</span>
          </div>
          <DatePicker 
            value={formData.date} 
            onChange={(date) => {
              const validDate = date ? new Date(date) : null
              setFormData({ ...formData, date:validDate });
            }}
            maxDate={new Date()}
            size="md"
            className="w-full mx-auto"
            getDayProps={(dateString: string | Date) => {
              // ၁။ dateString ကို Date object အဖြစ် အရင်ပြောင်းမယ်
              const date = new Date(dateString);

              // ၂။ formData.date ရှိမရှိနဲ့ သူက Date object ဟုတ်မဟုတ် သေချာအောင် စစ်မယ်
              const isSelected =
                formData.date &&
                new Date(formData.date).toDateString() === date.toDateString(); // ဒီနေရာမှာ new Date() ထပ်ပတ်လိုက်ပါ

              return {
                selected: !!isSelected,
                style: {
                  borderRadius: '12px',
                  fontWeight: 700,
                  ...(isSelected && {
                    backgroundColor:
                      formData.type === 'income' ? '#2563eb' : '#e11d48',
                    color: 'white',
                  }),
                },
              };
            }}
          />
      </div>
    </>
  )
}

export default CalendarSection