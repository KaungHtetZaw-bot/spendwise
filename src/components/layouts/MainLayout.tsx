import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import BottomNav from '../BottomNav';
import MobileHeader from '../MobileHeader';
import AddTransactionModal from '../AddTransactionModal';

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#F8F9FD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <MobileHeader />
        <BottomNav onAddClick={() => {setIsModalOpen(true)}} />
      <main className="w-full md:max-w-4xl mx-auto px-4 pt-2 pb-24 md:pt-24 md:pb-6">
        <Outlet/>
      </main>
      <AddTransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
    </div>
  );
}

export default MainLayout