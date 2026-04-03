import StatCard from '../components/StatCard';
import OverviewChart from '../components/OverviewChart';

const MOCK_SUMMARY = {
  total_income: 1250000,
  total_expense: 450000,
  balance: 800000,
};

const MOCK_TRANSACTIONS = [
  { id: 1, date: '2026-03-25', category: 'Salary', note: 'Monthly Pay', amount: 1200000, type: 'income' },
  { id: 2, date: '2026-03-26', category: 'Food', note: 'Dinner with friends', amount: 35000, type: 'expense' },
  { id: 3, date: '2026-03-26', category: 'Transport', note: 'Grab ride', amount: 8000, type: 'expense' },
  { id: 4, date: '2026-03-26', category: 'Freelance', note: 'Logo Design Project', amount: 50000, type: 'income' },
];

const MainPage = () => {
  return (
    <div className="space-y-8">
      <section className="grid grid-cols-3 md:gap-4 gap-2">
        <StatCard title="Total Income" amount={MOCK_SUMMARY.total_income} variant="income" />
        <StatCard title="Total Expense" amount={MOCK_SUMMARY.total_expense} variant="expense" />
        <StatCard title="Net Balance" amount={MOCK_SUMMARY.balance} variant="neutral" />
      </section>

      <section>
        <OverviewChart />
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold">Recent History</h3>
          <button className="text-xs font-semibold text-indigo-500 uppercase tracking-tighter">View All</button>
        </div>

        {/* Mobile: Card List | Desktop: Table */}
        <div className="space-y-3">
          {MOCK_TRANSACTIONS.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex gap-3 items-center">
                {/* Simple Icon Circle */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  item.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {item.category[0]}
                </div>
                <div>
                  <p className="font-bold text-sm">{item.category}</p>
                  <p className="text-xs text-slate-500 truncate max-w-[120px]">{item.note}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-black text-sm ${item.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {item.type === 'income' ? '+' : '-'} {item.amount.toLocaleString()}
                </p>
                <p className="text-[10px] text-slate-400 uppercase">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default MainPage;