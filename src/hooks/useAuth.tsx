
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null, 
  loading: true,
  isAdmin: false,
  isApproved: false,
  signOut: async () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        // When auth state changes, we'll check the user's admin status and approval status
        if (session?.user) {
          checkUserStatus(session.user.id);
        } else {
          setIsAdmin(false);
          setIsApproved(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log("Got existing session:", session);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        checkUserStatus(session.user.id);
      }
      setLoading(false);
    }).catch((error) => {
      console.error("Error getting session:", error);
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const checkUserStatus = async (userId: string) => {
    try {
      // Get user profile directly instead of using RPC function
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('role, is_approved')
        .eq('id', userId)
        .single();
      
      if (profileError) {
        console.error("Error fetching user profile:", profileError);
        return;
      }
      
      if (profileData) {
        // Amélioration: Check role case-insensitive and handle null/undefined cases
        const userRole = (profileData.role || '').toLowerCase();
        console.log("User role:", profileData.role, "Is admin:", userRole === 'admin');
        
        // Set admin status based on normalized role comparison
        setIsAdmin(userRole === 'admin');
        setIsApproved(!!profileData.is_approved);
      }
    } catch (error) {
      console.error("Error checking user status:", error);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setIsApproved(false);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    loading,
    isAdmin,
    isApproved,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
