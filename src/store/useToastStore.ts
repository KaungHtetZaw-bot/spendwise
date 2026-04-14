import { create } from 'zustand';

type ToastType = 'success' | 'danger' | 'warning';

interface ToastState {
  message: string;
  type: ToastType;
  isOpen: boolean;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  message: '',
  type: 'success',
  isOpen: false,
  showToast: (message, type) => set({ message, type, isOpen: true }),
  hideToast: () => set({ isOpen: false }),
}));