import StatCard from '../components/dashboard/StatCard';
import OverviewChart from '../components/dashboard/OverviewChart';
import RecentList from '../components/dashboard/RecentList';
import { useTransactions } from '../hooks/useTransactions';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
  const { t } = useTranslation();
  const { data: transactions = [], isLoading, isError } = useTransactions();
  
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
  
    const balance = income - expense;

    const transactionsToShow = transactions.slice(0, 5);

  return (
    <div className="MD:space-y-8 space-y-4">
      <section className="grid grid-cols-3 md:gap-4 gap-2 pt-2.5">
        <StatCard title={t('stats.total_income')} amount={income} variant="income" isLoading={isLoading}/>
        <StatCard title={t('stats.total_expense')} amount={expense} variant="expense" isLoading={isLoading}/>
        <StatCard title={t('stats.total_net')} amount={balance} variant="neutral" isLoading={isLoading}/>
      </section>

      <OverviewChart allTransactions={transactions}/>
      <RecentList transactions={transactionsToShow} isLoading={isLoading}/>
      
    </div>
  );
};
export default MainPage;