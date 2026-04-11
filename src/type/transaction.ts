interface Transaction {
  transaction_id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category_id: string;
  categories: {
    name: string;
  };
  date: string;
  note: string;
  created_at: string;
}

interface Category {
  category_id: string;
  user_id: string;
  type: 'income' | 'expense';
  name: string;
}

interface FormData {
  type: 'income' | 'expense';
  amount: number | '';
  date: string;
  category_id: string;
  note: string;
}

export type { Transaction, Category, FormData };
