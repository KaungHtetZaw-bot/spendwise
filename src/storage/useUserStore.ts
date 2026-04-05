import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Profile {
  user_id:string;
  name: string;
  monthly_income: number;
  currency: string;
  language: string;
  theme: string;
}

interface UserState {
  profile: Profile | null;
  loading: boolean;
  fetchProfile: (userId: string) => Promise<void>;
  updateProfile: (updates: Profile) => Promise<void>;
  setTheme: (theme: string) => Promise<void>;
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

  setTheme: async (theme: string) => {
    set((state) => ({
      profile: state.profile ? { ...state.profile, theme } : null
    }));
    if (theme === "Dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    await get().updateProfile({ ...get().profile, theme } as Profile);
  }
}));