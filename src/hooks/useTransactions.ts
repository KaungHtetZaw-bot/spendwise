import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { useUserStore } from '../store/useUserStore';
import type { Transaction,Category, FormData } from '../type/transaction';

const convertToStoreAmount = (amount: number, currency: 'USD' | 'MMK', rate: number) => {
  return currency === 'USD' ? amount * rate : amount;
};

export const useTransactions = () => {
  const userId = useUserStore((state) => state.profile?.user_id);

  return useQuery<Transaction[]>({
    queryKey: ['transactions', userId],
    queryFn: async () => {
    const { data, error } = await supabase
        .from('transactions')
        .select('*, categories(name)')
        .eq('user_id', userId)
        .order('date', { ascending: false });

    if (error) throw error;
    return data as Transaction[];
    },
    enabled: !!userId,
  });
};

// Add Transaction Mutation
export const useAddTransaction = () => {
  const queryClient = useQueryClient();
  const profile = useUserStore((state) => state.profile);
  const userId = profile?.user_id;
  
  return useMutation({
    mutationFn: async (newTx:FormData) => {
      if (!userId) throw new Error('User not authenticated');
      const rate = profile?.exchange_rate || 4500;
      const currentCurrency = profile?.currency || 'MMK';
      const formattedDate = newTx.date 
          ? new Date(newTx.date).toISOString().split('T')[0] 
          : new Date().toISOString().split('T')[0];
      const cleanAmount = Number(newTx.amount) || 0;
      const storeAmount = convertToStoreAmount(cleanAmount, currentCurrency, rate);
      const transactionData = {
        ...newTx,
        date: formattedDate, 
        user_id: userId,
        amount: storeAmount,
      };
      const { data, error } = await supabase
        .from('transactions')
        .insert([ transactionData ])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
    },
  });
};

export const useEditTransaction = () => {
  const queryClient = useQueryClient();
  const profile = useUserStore((state) => state.profile);
  const userId = profile?.user_id;

  return useMutation({
    mutationFn: async ({ transactionId, updates }: { transactionId: string; updates: FormData }) => {
      if (!userId) throw new Error('User not authenticated');
      const rate = profile?.exchange_rate || 4500;
      const currentCurrency = profile?.currency || 'MMK';
      const formattedDate = updates.date
        ? new Date(updates.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      const cleanAmount = Number(updates.amount) || 0;
      const storeAmount = convertToStoreAmount(cleanAmount, currentCurrency, rate);
      const transactionData = {
        ...updates,
        date: formattedDate,
        user_id: userId,
        amount: storeAmount,
      };

      const { data, error } = await supabase
        .from('transactions')
        .update(transactionData)
        .eq('transaction_id', transactionId)
        .eq('user_id', userId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.profile?.user_id);

  return useMutation({
    mutationFn: async (transactionId: string) => {
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('transaction_id', transactionId)
        .eq('user_id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['transactions', userId] });
    },
  });
};

export const useCategories = () => {
  const userId = useUserStore((state) => state.profile?.user_id);

  return useQuery<Category[]>({
    queryKey: ['categories',userId],
    queryFn: async () => {
        const { data, error } = await supabase
            .from('categories')
            .select('*')
            .eq('user_id', userId);

        if (error) throw error;
        return data as Category[];
    },
    enabled: !!userId,
  });
};

export const useAddCategory = () => {
  const queryClient = useQueryClient();
  const userId = useUserStore((state) => state.profile?.user_id);

  return useMutation({
    mutationFn: async (newCat: { name: string; type: 'income' | 'expense' }) => {
        if (!userId) throw new Error('User not authenticated');
        const { data:existingCats, error:existingCatsError } = await supabase
            .from('categories')
            .select('*')
            .eq('user_id', userId); 

        if (existingCatsError) throw existingCatsError;

        const incomeCount = existingCats?.filter((cat: Category) => cat.type === 'income').length || 0;
        const expenseCount = existingCats?.filter((cat: Category) => cat.type === 'expense').length || 0;

        if (newCat.type === 'income' && incomeCount >= 10) {
            throw new Error('Income categories are limited to 10');
        }
        if (newCat.type === 'expense' && expenseCount >= 10) {
            throw new Error('Expense categories are limited to 10');
        }

        const { data, error } = await supabase
            .from('categories')
            .insert([{ ...newCat, user_id: userId }])
            .select()
            .single();

        if (error) throw error;
        return data;
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['categories', userId] });
    },
  });
}