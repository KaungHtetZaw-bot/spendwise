import { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import MobileHeader from '../MobileHeader';
import AddTransactionModal from '../AddTransactionModal';
import ToastBox from '../ToastBox';
import { useToastStore } from '../../store/useToastStore';
import { useConfirmationStore } from '../../store/useConfirmationStore';
import ConfirmationModal from '../ConfirmationModal';
import SummaryCard from '../SummaryCard';
import QuickActionsCard from '../QuickActionsCard';
import { motion, AnimatePresence } from 'framer-motion';

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const scrollContainerRef = useRef<HTMLElement>(null)
    const [history, setHistory] = useState([]);
    const [editingData, setEditingData] = useState<any>(null);
    const { message, type, isOpen, hideToast } = useToastStore();
    const { isOpen:isComfirmOpen, closeConfirm, onConfirm, title, description, confirmText, type:comfirmType } = useConfirmationStore();
    const isSettingsPage = location.pathname === '/settings';
    const handleCloseModal = () => {
      setIsModalOpen(false);
      setEditingData(null);
    };

    const onEditAction = (data: any) => {
      setEditingData(data);
      setIsModalOpen(true);
    };

    useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col bg-[#F8F9FD] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        <MobileHeader />
        <Navbar onAddClick={() => {setIsModalOpen(true)}} />
        

        <div className="flex-1 flex flex-row max-w-[1400px] mx-auto w-full px-4 overflow-hidden">
      
          {/* Left Panel */}
          <AnimatePresence>
            {!isSettingsPage && (
              <motion.aside 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "circOut" }}
                className="hidden md:block lg:w-72 w-52 pt-24 pb-8 sticky top-0 h-full overflow-y-auto hide-scrollbar"
              >
                <QuickActionsCard onAddClick={() => setIsModalOpen(true)} />
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Main Content (Outlet) */}
          <main 
            ref={scrollContainerRef} 
            className="flex-1 overflow-y-auto px-0 md:px-4 pb-24 md:pt-24 md:pb-8 hide-scrollbar"
          >
            <div className="max-w-2xl mx-auto">
              <Outlet context={{ history, setHistory, setIsModalOpen, onEditAction }}/>
            </div>
          </main>

          {/* Right Panel */}
          <aside className="hidden xl:block w-72 pt-24 pb-8 sticky top-0 h-full overflow-y-auto hide-scrollbar">
            <SummaryCard />
          </aside>
        </div>
        <AddTransactionModal isOpen={isModalOpen} onClose={handleCloseModal} hasData={editingData} />
        {isOpen && (
          <ToastBox 
            message={message} 
            type={type} 
            onClose={hideToast} 
          />
        )}

        <ConfirmationModal
        isOpen={isComfirmOpen}
        onClose={closeConfirm}
        onConfirm={async () => {
          await onConfirm();
          closeConfirm();
        }}
        title={title}
        description={description}
        confirmText={confirmText}
        type={comfirmType}
      />
    </div>
  );
}

export default MainLayout