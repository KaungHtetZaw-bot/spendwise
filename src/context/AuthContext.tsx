import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import type { Session, User } from '@supabase/supabase-js';

const AuthContext = createContext<{ session: Session | null; user: User | null }>({ session: null, user: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    // ၁။ LocalStorage ထဲက Token နဲ့ Session ကို ပြန်ဆွဲထုတ်မယ်
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    // ၂။ Login ဝင်တာ၊ Logout ထွက်တာတွေကို အမြဲစောင့်ကြည့်နေမယ်
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ session, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);