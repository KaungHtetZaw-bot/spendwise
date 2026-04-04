import { Navigate, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LoadingScreen from '../components/LoadingScreen.tsx';
import { useUserStore } from '../storage/useUserStore.ts';
import { supabase } from '../lib/supabase.ts';

const ProtectedRoute = () => {
  const [session, setSession] = useState<any>(null);
  const { fetchProfile } = useUserStore();
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const initializeAuth = async () => {
      try {
        const { data: { session: currentSession } } = await supabase.auth.getSession();
        if (isMounted) {
          setSession(currentSession);
          if (currentSession) {
            await fetchProfile(currentSession.user.id);
          }
          setCheckingAuth(false);
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
      if (!currentSession) {
        setCheckingAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  if (checkingAuth) {
    return <LoadingScreen />;
  }

  return session ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;