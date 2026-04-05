interface Transaction {
  id: string;
  user_id: string;
  amount: number;
  type: 'income' | 'expense';
  category_id: string;
  date: string;
  note: string;
}

interface Category {
  category_id: string;
  user_id: string;
  type: 'income' | 'expense';
  name: string;
}

export type { Transaction, Category };