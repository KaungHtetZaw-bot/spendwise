import React, { useEffect } from 'react'
import BottomNav from '../BottomNav';
import MobileHeader from '../MobileHeader';
import { useState } from 'react';
import AddTransactionModal from '../AddTransactionModal';

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(()=>{
        console.log(isModalOpen)
    },[isModalOpen])
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <MobileHeader />
        <BottomNav onAddClick={() => {setIsModalOpen(true)}} />
      <main className="max-w-4xl mx-auto px-4 pt-6 pb-24 md:pt-24 md:pb-6">
        {children}
      </main>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </div>
  );
}

export default MainLayout