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
  setProfile: (profile: Profile) => void;
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
        }
      },

      setProfile: (updates: Profile) => {
        set((state) => ({
          profile: {
            ...state.profile,
            ...updates,
          },
        }))
      },

      setTheme: async (newTheme: string) => {
        set({ theme: newTheme, useSystemTheme: false });
        const root = document.documentElement
        root.classList.toggle('dark', newTheme.toLowerCase() === 'dark');
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