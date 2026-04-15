import { create } from 'zustand';

interface ConfirmationState {
  isOpen: boolean;
  type: 'danger' | 'warning';
  title: string;
  description: string;
  confirmText: string;
  onConfirm: () => void | Promise<void>;
  openConfirm: (config: Omit<ConfirmationState, 'isOpen' | 'openConfirm' | 'closeConfirm'>) => void;
  closeConfirm: () => void;
}

export const useConfirmationStore = create<ConfirmationState>((set) => ({
  isOpen: false,
  type: 'warning',
  title: '',
  description: '',
  confirmText: '',
  onConfirm: () => {},
  openConfirm: (config) => set({ ...config, isOpen: true }),
  closeConfirm: () => set({ isOpen: false }),
}));