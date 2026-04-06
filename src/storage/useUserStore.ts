import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Profile } from '../type/profile';

interface UserState {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: Profile) => Promise<void>;
  setTheme: (newTheme: string) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  profile: null,
  loading: false,

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
      document.documentElement.classList.toggle('dark', data.theme === 'Dark');
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
      
      if (updates.theme) {
        document.documentElement.classList.toggle('dark', updates.theme === 'Dark');
      }
    }
  },

  setTheme: async (newTheme: string) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, theme: newTheme } : null
    }));

    if (newTheme.toLowerCase() === "night") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const { error } = await supabase
      .from('users')
      .update({ theme: newTheme })
      .eq('user_id', get().profile?.user_id);

    if (error) {
      console.error("Failed to sync theme to database:", error);
    }
  }
}));