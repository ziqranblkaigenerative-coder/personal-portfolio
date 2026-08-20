import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserSession } from '../lib/types';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  isDemoMode: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ error: Error | null }>;
  signInWithDemo: () => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_ADMIN_KEY = 'portfolio_admin_session';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isDemoMode, setIsDemoMode] = useState<boolean>(!isSupabaseConfigured);

  useEffect(() => {
    // Check Supabase session first if configured
    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@portfolio.dev',
            isAdmin: true
          });
          setIsDemoMode(false);
        } else {
          // Check local admin mock session
          const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
          if (localSession) {
            try {
              setUser(JSON.parse(localSession));
            } catch {
              localStorage.removeItem(LOCAL_ADMIN_KEY);
            }
          }
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || 'admin@portfolio.dev',
            isAdmin: true
          });
          setIsDemoMode(false);
        } else {
          const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
          if (localSession) {
            try {
              setUser(JSON.parse(localSession));
            } catch {
              setUser(null);
            }
          } else {
            setUser(null);
          }
        }
        setLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Offline / Local mock mode
      const localSession = localStorage.getItem(LOCAL_ADMIN_KEY);
      if (localSession) {
        try {
          setUser(JSON.parse(localSession));
        } catch {
          localStorage.removeItem(LOCAL_ADMIN_KEY);
        }
      }
      setIsDemoMode(true);
      setLoading(false);
    }
  }, []);

  const signInWithPassword = async (email: string, password: string): Promise<{ error: Error | null }> => {
    setLoading(true);

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          setLoading(false);
          return { error };
        }

        if (data.user) {
          const userSession: UserSession = {
            id: data.user.id,
            email: data.user.email || email,
            isAdmin: true
          };
          setUser(userSession);
          setIsDemoMode(false);
        }
        setLoading(false);
        return { error: null };
      } catch (err: any) {
        setLoading(false);
        return { error: err };
      }
    }

    // Demo Mode Sign In Fallback
    const demoUser: UserSession = {
      id: 'demo-admin-id',
      email: email || 'admin@portfolio.dev',
      isAdmin: true
    };
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setIsDemoMode(true);
    setLoading(false);
    return { error: null };
  };

  const signInWithDemo = () => {
    const demoUser: UserSession = {
      id: 'demo-admin-id',
      email: 'demo.admin@portfolio.dev',
      isAdmin: true
    };
    localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setIsDemoMode(true);
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.auth.signOut();
      } catch (err) {
        console.error('Supabase signOut error:', err);
      }
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isDemoMode,
        signInWithPassword,
        signInWithDemo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
