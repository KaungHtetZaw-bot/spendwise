import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Transaction, Category } from '../type/transaction';
import { useUserStore } from './useUserStore';

interface TransactionState {
  transactions: Transaction[];
  categories: Category[];
  loading: boolean;
  fetchTransactions: () => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => Promise<void>;
  fetchCategories: () => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  categories: [],
  loading: false,

  fetchTransactions: async () => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq('user_id', useUserStore.getState().profile?.user_id)
      .order('date', { ascending: true });

    if (!error && data) {
      const formattedData = data.map((t: any) => ({
        ...t,
        category: t.categories?.name || 'General'
      }));
      
      set({ transactions: formattedData, loading: false });
    } else {
      set({ loading: false });
    }
  },

  addTransaction: async (newTx) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...newTx, user_id: useUserStore.getState().profile?.user_id }])
      .select()
      .single();

    if (!error && data) {
      set({ transactions: [data, ...get().transactions] });
    }
  },

  fetchCategories: async () => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', useUserStore.getState().profile?.user_id);
        
    if (data) set({ categories: data });
    console.log("Fetched categories:", data, "Error:", error);
    },
}));

