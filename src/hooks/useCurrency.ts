import { useMemo, useCallback } from 'react';
import { useUserStore } from '../store/useUserStore';

export const useCurrency = () => {
  const { profile } = useUserStore();
  
  const { rate, currency, symbol } = useMemo(() => ({
    rate: profile?.exchange_rate || 4500,
    currency: profile?.currency || 'MMK' as 'MMK' | 'USD',
    symbol: profile?.currency === 'USD' ? '$' : 'Ks'
  }), [profile?.exchange_rate, profile?.currency]);

  const format = useCallback((amount: number) => {
    const converted = currency === 'USD' ? amount / rate : amount;

    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: currency === 'USD' ? 2 : 0,
      maximumFractionDigits: currency === 'USD' ? 2 : 0,
    }).format(converted);
  }, [currency, rate]);

  const convert = useCallback((amount: number) => {
    return currency === 'USD' ? amount / rate : amount;
  }, [currency, rate]);

  return useMemo(() => ({
    format,
    convert,
    currency,
    rate,
    symbol
  }), [format, convert, currency, rate, symbol]);
};