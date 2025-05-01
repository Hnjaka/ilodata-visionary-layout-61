
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
      // Check if user is an admin
      const { data: adminData, error: adminError } = await supabase.rpc(
        'is_admin',
        { user_id: userId }
      );
      
      if (adminError) {
        console.error("Error checking admin status:", adminError);
      } else {
        console.log("Is admin:", adminData);
        setIsAdmin(adminData);
      }
      
      // Check if user is approved
      const { data: approvedData, error: approvedError } = await supabase.rpc(
        'is_approved',
        { user_id: userId }
      );
      
      if (approvedError) {
        console.error("Error checking approval status:", approvedError);
      } else {
        console.log("Is approved:", approvedData);
        setIsApproved(approvedData);
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
