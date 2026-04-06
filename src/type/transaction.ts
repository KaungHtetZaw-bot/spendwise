interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category_id: string;
  category: string;
  date: string;
  note: string;
}

interface Category {
  category_id: string;
  user_id: string;
  type: 'income' | 'expense';
  name: string;
}

interface FormData {
  type: 'income' | 'expense';
  amount: number;
  date: Date | null;
  category_id: string;
  note: string;
}

export type { Transaction, Category, FormData };