import React from 'react'
import { Calendar as CalendarIcon } from 'lucide-react';
import { DatePicker } from '@mantine/dates';
import type { FormData } from '../../type/transaction';

interface CalendarSectionProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

const CalendarSection = ({formData,setFormData}:CalendarSectionProps) => {
  return (
    <>
        <div className="bg-white dark:bg-slate-900 rounded-[1rem] md:p-4 p-2 pt-[calc(1rem+env(safe-area-inset-top))] shadow-sm border border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2 mb-4 ml-2">
                <CalendarIcon size={14} className="text-blue-500" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Select Date</span>
              </div>
              <DatePicker 
                value={formData.date ? new Date(formData.date) : null} 
                
                onChange={(date) => {
                  if (date) {
                    setFormData({ ...formData, date: new Date(date as any) });
                  }
                }}
                maxDate={new Date()}
                size="md"
                className="w-full mx-auto"
                getDayProps={(date: any) => {
                  const calendarDate = new Date(date);
                  
                  const isSelected = formData.date instanceof Date && 
                                    calendarDate.toDateString() === formData.date.toDateString();

                  return {
                    selected: !!isSelected,
                    style: {
                      borderRadius: '12px',
                      fontWeight: 700,
                      ...(isSelected && {
                        backgroundColor: formData.type === 'income' ? '#2563eb' : '#e11d48',
                        color: 'white',
                      }),
                    }
                  };
                }}
              />
          </div>
    </>
  )
}

export default CalendarSection