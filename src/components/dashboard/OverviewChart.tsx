import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getChartData } from '../../lib/helper';
import { useTransactionStore } from '../../storage/useTransactionStore.ts';
import { useUserStore } from '../../storage/useUserStore.ts';

const MOCK_CHART_DATA = [
  { name: 'Mon', income: 4000, expense: 2400 },
  { name: 'Tue', income: 3000, expense: 1398 },
  { name: 'Wed', income: 2000, expense: 9800 },
  { name: 'Thu', income: 2780, expense: 3908 },
  { name: 'Fri', income: 1890, expense: 4800 },
  { name: 'Sat', income: 2390, expense: 3800 },
  { name: 'Sun', income: 3490, expense: 4300 },
];

const OverviewChart = () => {
  const { transactions: allTransactions } = useTransactionStore();
  const { profile } = useUserStore();

  const userTransactions = allTransactions.filter(tx => tx.user_id === profile?.user_id);
  const chartData = getChartData(userTransactions);
  return (
    <section className="h-[300px] md:h-[400px] w-full py-4 px-2 md:p-6 rounded-3xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm transition-all">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Weekly Activity</h3>
        <div className="flex gap-4">
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /><span className="text-[10px] text-slate-500">Income</span></div>
            <div className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500" /><span className="text-[10px] text-slate-500">Expense</span></div>
        </div>
      </div>
      
      <div className="h-[220px] md:h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
            <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.1} />
            <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 11, fill: '#64748b' }}
                dy={10}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#64748b' }}
                allowDecimals={false}
                tickFormatter={(value) => value >= 1000 ? `${value / 1000}k` : value}
            />
            <Tooltip 
                cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }}
                contentStyle={{ 
                backgroundColor: '#0f172a', 
                borderRadius: '12px', 
                border: '1px solid #1e293b',
                fontSize: '12px',
                padding: '8px 12px'
                }}
                itemStyle={{ padding: '2px 0' }}
            />
            <Area 
                type="monotone" 
                dataKey="income" 
                stroke="#10b981" 
                fillOpacity={1} 
                fill="url(#colorIncome)" 
                strokeWidth={3}
                activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Area 
                type="monotone" 
                dataKey="expense" 
                stroke="#f43f5e" 
                fillOpacity={1} 
                fill="url(#colorExpense)" 
                strokeWidth={3}
                activeDot={{ r: 6, strokeWidth: 0 }}
            />
            </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default OverviewChart;