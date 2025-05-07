
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

  // Fonction séparée pour vérifier le statut de l'utilisateur
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
        return { isAdmin: false, isApproved: false };
      }
      
      if (profileData) {
        // Normalize role for case-insensitive comparison
        const userRole = (profileData.role || '').toLowerCase();
        const isUserAdmin = userRole === 'admin';
        const isUserApproved = !!profileData.is_approved;
        
        console.log("User role from database:", profileData.role, "Is admin:", isUserAdmin);
        
        return { isAdmin: isUserAdmin, isApproved: isUserApproved };
      }
      
      return { isAdmin: false, isApproved: false };
    } catch (error) {
      console.error("Error checking user status:", error);
      return { isAdmin: false, isApproved: false };
    }
  };

  useEffect(() => {
    // Configure l'écouteur d'état d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { isAdmin: userIsAdmin, isApproved: userIsApproved } = await checkUserStatus(session.user.id);
          setIsAdmin(userIsAdmin);
          setIsApproved(userIsApproved);
        } else {
          setIsAdmin(false);
          setIsApproved(false);
        }
      }
    );

    // Vérifie la session existante au chargement
    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        console.log("Got existing session:", session);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          const { isAdmin: userIsAdmin, isApproved: userIsApproved } = await checkUserStatus(session.user.id);
          setIsAdmin(userIsAdmin);
          setIsApproved(userIsApproved);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    console.log("Attempting to sign out in useAuth hook");
    try {
      // Important: Using destructuring to handle the promise properly
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Error during signOut:", error);
        throw error;
      }
      
      // Manually update local state to ensure UI updates immediately
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      setIsApproved(false);
      
      console.log("Sign out successful in useAuth hook");
      return Promise.resolve();
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
