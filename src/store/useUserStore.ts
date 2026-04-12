import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Profile } from '../type/profile';
import { persist } from 'zustand/middleware';
import i18n from '../i18n';

interface UserState {
  profile: Profile | null;
  loading: boolean;
  language: string;
  useSystemTheme: boolean;
  theme: string;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: Profile) => Promise<void>;
  setTheme: (newTheme: string) => void;
  setLanguage: (lang: string) => void;
  setUseSystemTheme: (val: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set,get) => ({
      profile: null,
      loading: false,
      language: 'en',
      theme: 'Light',
      useSystemTheme: false,

      fetchProfile: async (userId) => {
        if (get().profile) return; 
        set({ loading: true });
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (data) {
          set({ profile: data, loading: false });
        } else {
          set({ loading: false });
        }
        const currentTheme = get().theme;
        document.documentElement.classList.toggle('dark', currentTheme === 'Dark' || currentTheme.toLowerCase() === 'night');
        i18n.changeLanguage(get().language);
      },

      updateProfile: async (updates) => {
        const profile = get().profile;
        if (!profile) return;

        const { error } = await supabase
          .from('users')
          .update(updates)
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);

        if (!error) {
          set({ profile: { ...profile, ...updates } });
          
          if (updates.theme) {
            document.documentElement.classList.toggle('dark', updates.theme === 'Dark');
          }
        }
      },

      setTheme: async (newTheme: string) => {
        set({ theme: newTheme, useSystemTheme: false });
        const root = document.documentElement
        root.classList.toggle('dark', newTheme.toLowerCase() === 'darkd');
      },

      setUseSystemTheme: (val) => set({ useSystemTheme: val }),

      setLanguage: (lang: string) => {
        i18n.changeLanguage(lang);
        set({ language: lang });
      },
    }),
    {
      name: 'user-storage',
    }
  ),
  
);