import StatCard from '../components/dashboard/StatCard';
import OverviewChart from '../components/dashboard/OverviewChart';
import RecentList from '../components/dashboard/RecentList';
import { useTransactionStore } from '../storage/useTransactionStore';
import { useUserStore } from '../storage/useUserStore';
import { useEffect } from 'react';

const MainPage = () => {
  const { transactions, fetchTransactions } = useTransactionStore();
  const { profile } = useUserStore();
  
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  
    const balance = income - expense;

    const transactionsToShow = transactions.slice(0, 5);

    useEffect(() => {
      const fetchData = async () => {
        if (profile)
        await fetchTransactions(profile?.user_id);
      };
      fetchData();
    }, [ fetchTransactions, profile]);
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-3 md:gap-4 gap-2 pt-2.5">
        <StatCard title="Total Income" amount={income} variant="income" />
        <StatCard title="Total Expense" amount={expense} variant="expense" />
        <StatCard title="Net Balance" amount={balance} variant="neutral" />
      </section>

      <OverviewChart />
      <RecentList transactions={transactionsToShow} />
      
    </div>
  );
};
export default MainPage;