import { supabase } from "./supabase";

const getCurrentWeekData = (transactions: any[]) => {
  const now = new Date();
  
  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay();
  const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); 
  startOfWeek.setDate(diff);
  startOfWeek.setHours(0, 0, 0, 0);

  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);

  return transactions.filter(tx => {
    const txDate = new Date(tx.date);
    return txDate >= startOfWeek && txDate <= endOfWeek;
  });
};

export const getChartData = (transactions: any[]) => {
  const chartData = [
    { name: 'Mon', income: 0, expense: 0 },
    { name: 'Tue', income: 0, expense: 0 },
    { name: 'Wed', income: 0, expense: 0 },
    { name: 'Thu', income: 0, expense: 0 },
    { name: 'Fri', income: 0, expense: 0 },
    { name: 'Sat', income: 0, expense: 0 },
    { name: 'Sun', income: 0, expense: 0 },
  ];

  const currentWeekTransactions = getCurrentWeekData(transactions);

  currentWeekTransactions.forEach(tx => {
    const dayName = new Date(tx.date).toLocaleDateString('en-US', { weekday: 'short' });
    
    const dayEntry = chartData.find(d => d.name === dayName);
    
    if (dayEntry) {
      if (tx.type === 'income') {
        dayEntry.income += Number(tx.amount) || 0;
      } else {
        dayEntry.expense += Number(tx.amount) || 0;
      }
    }
  });

  return chartData;
};

export const StoreAvatar = async (file:File, userId:string) => {
  const fileExt = file.name.split('.').pop();
  const filePath = `${userId}/avatar.${fileExt}`;
  await supabase.storage
    .from('avatars')
    .remove([
      `${userId}/avatar.png`,
      `${userId}/avatar.jpg`,
      `${userId}/avatar.jpeg`,
      `${userId}/avatar.webp`,
    ]);
    
  const { error: uploadError } = await supabase.storage
  .from('avatars')
  .upload(filePath, file, {
    upsert: true,
  });

  if (uploadError) throw uploadError;
  const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
  const publicUrl = urlData.publicUrl;
  return publicUrl;
};