import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../BottomNav';
import MobileHeader from '../MobileHeader';
import AddTransactionModal from '../AddTransactionModal';

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="h-screen flex flex-col bg-[#F8F9FD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <MobileHeader />
        <BottomNav onAddClick={() => {setIsModalOpen(true)}} />
      <main className="flex-1 overflow-y-auto w-full md:max-w-4xl mx-auto px-4 pb-24 md:pt-24 md:pb-6 hide-scrollbar">
        <Outlet/>
      </main>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </div>
  );
}

export default MainLayout