
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isApproved: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Check admin and approval status when session changes
        if (newSession?.user) {
          checkPermissions(newSession.user.id);
        } else {
          setIsAdmin(false);
          setIsApproved(false);
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      // Check admin and approval status on initial load
      if (initialSession?.user) {
        checkPermissions(initialSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Function to check admin and approval status
  const checkPermissions = async (userId: string) => {
    try {
      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .rpc('is_admin', { user_id: userId });
        
      if (!adminError) {
        setIsAdmin(adminData || false);
      }

      // Check if user is approved
      const { data: approvedData, error: approvedError } = await supabase
        .rpc('is_approved', { user_id: userId });
        
      if (!approvedError) {
        setIsApproved(approvedData || false);
      }
    } catch (error) {
      console.error("Error checking permissions:", error);
      setIsAdmin(false);
      setIsApproved(false);
    }
  };

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, isAdmin, isApproved, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
