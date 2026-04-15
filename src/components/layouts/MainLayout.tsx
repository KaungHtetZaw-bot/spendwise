import { useRef, useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import BottomNav from '../BottomNav';
import MobileHeader from '../MobileHeader';
import AddTransactionModal from '../AddTransactionModal';
import ToastBox from '../ToastBox';
import { useToastStore } from '../../store/useToastStore';
import { useConfirmationStore } from '../../store/useConfirmationStore';
import ConfirmationModal from '../ConfirmationModal';

const MainLayout = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const scrollContainerRef = useRef<HTMLElement>(null)
    const [history, setHistory] = useState([]);
    const [editingData, setEditingData] = useState<any>(null);
    const { message, type, isOpen, hideToast } = useToastStore();
    const { isOpen:isComfirmOpen, closeConfirm, onConfirm, title, description, confirmText, type:comfirmType } = useConfirmationStore();

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
        <BottomNav onAddClick={() => {setIsModalOpen(true)}} />
        <main ref={scrollContainerRef} className="flex-1 overflow-y-auto w-full md:max-w-4xl mx-auto px-4 pb-24 md:pt-24 md:pb-6 hide-scrollbar">
          <Outlet context={{ history, setHistory, setIsModalOpen, onEditAction }}/>
        </main>
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