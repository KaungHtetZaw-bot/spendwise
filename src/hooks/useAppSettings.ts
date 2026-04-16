import { useTranslation } from 'react-i18next';
import { useUserStore } from '../store/useUserStore';

export const useAppSettings = () => {
  const { i18n } = useTranslation();
  const { theme, setTheme, setLanguage, profile, setProfile } = useUserStore();

  const isDark = theme.toLowerCase() === 'dark';
  const isMM = i18n.language === 'mm';
  const isUSD = profile?.currency === 'USD';

  const toggleTheme = () => {
    const nextTheme = isDark ? "light" : "dark";
    
    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }
    document.startViewTransition(() => setTheme(nextTheme));
  };

  const toggleLanguage = () => {
    const nextLang = isMM ? 'en' : 'mm';
    setLanguage(nextLang);
  };

  const toggleCurrency = () => {
    const nextCurrency = isUSD ? 'MMK' : 'USD';
    setProfile({ currency: nextCurrency });
  };

  return {
    isDark,
    isMM,
    isUSD,
    toggleTheme,
    toggleLanguage,
    toggleCurrency,
    currentCurrency: profile?.currency || 'MMK',
    currentLang: i18n.language.toUpperCase()
  };
};