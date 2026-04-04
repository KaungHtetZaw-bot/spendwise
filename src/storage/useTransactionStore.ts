import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Transaction, Category } from '../type/transaction';

interface TransactionState {
  transactions: Transaction[];
  categories: Category[];
  loading: boolean;
  fetchTransactions: (userId: string) => Promise<void>;
  addTransaction: (transaction: Omit<Transaction, 'id'>, userId: string) => Promise<void>;
  fetchCategories: (userId: string) => Promise<void>;
}

export const useTransactionStore = create<TransactionState>((set, get) => ({
  transactions: [],
  categories: [],
  loading: false,

  fetchTransactions: async (userId) => {
    set({ loading: true });
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        categories (
          name
        )
      `)
      .eq('user_id', userId)
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

  addTransaction: async (newTx, userId) => {
    const { data, error } = await supabase
      .from('transactions')
      .insert([{ ...newTx, user_id: userId }])
      .select()
      .single();

    if (!error && data) {
      set({ transactions: [data, ...get().transactions] });
    }
  },

  fetchCategories: async (userId: string) => {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('user_id', userId);
        
    if (data) set({ categories: data });
    console.log("Fetched categories:", data, "Error:", error);
    },
}));