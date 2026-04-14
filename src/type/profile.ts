export interface Profile {
  user_id:string;
  name: string;
  monthly_income: number;
  currency: 'MMK' | 'USD';
  career: string;
  avatar_url: string;
  monthly_budget: number;
  exchange_rate:number;
}

export type ToastBoxType = 'success' | 'danger' | 'warning';
