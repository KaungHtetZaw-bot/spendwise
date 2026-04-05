const RecentList = ({transactions}: {transactions: any[]}) => {
    const transactionsToShow = transactions.slice(0, 5);
  return (
    <>
    <section className="space-y-4 ">
        <div className="flex justify-between items-center px-1">
          <h3 className="text-lg font-bold">Recent History</h3>
          <button className="text-xs font-semibold text-indigo-500 uppercase tracking-tighter">View All</button>
        </div>

        <div className="md:space-y-3 space-y-1.5 pb-30">
          {transactions.length==0 ? 
            <div className="text-center py-10 text-slate-400 text-sm font-medium bg-slate-50 dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-100 dark:border-slate-800">
              No transactions yet.
            </div> : transactionsToShow.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between md:p-4 p-2 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800"
            >
              <div className="flex gap-3 items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                  item.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
                }`}>
                  {item.category ? item.category[0] : '?'}
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
    </>
  )
}

export default RecentList