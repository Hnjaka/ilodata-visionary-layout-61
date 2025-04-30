
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
  const [permissionsChecked, setPermissionsChecked] = useState(false);

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        console.log("Auth state changed:", event);
        setSession(newSession);
        setUser(newSession?.user ?? null);
        
        // Reset permission flags when auth state changes
        if (!newSession?.user) {
          setIsAdmin(false);
          setIsApproved(false);
          setPermissionsChecked(true);
        } else if (newSession?.user && event !== 'TOKEN_REFRESHED') {
          // Don't re-check permissions on token refresh to avoid loops
          setPermissionsChecked(false);
        }
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      console.log("Initial session check:", initialSession ? "Session exists" : "No session");
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (!initialSession?.user) {
        setIsAdmin(false);
        setIsApproved(false);
        setPermissionsChecked(true);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Separate effect for checking permissions to avoid re-renders
  useEffect(() => {
    const checkUserPermissions = async () => {
      if (user && !permissionsChecked) {
        try {
          console.log("Checking permissions for user:", user.id);
          
          // Check if user is admin
          const { data: adminData, error: adminError } = await supabase
            .rpc('is_admin', { user_id: user.id });
            
          if (!adminError) {
            console.log("Admin check result:", adminData);
            setIsAdmin(adminData || false);
          }

          // Check if user is approved
          const { data: approvedData, error: approvedError } = await supabase
            .rpc('is_approved', { user_id: user.id });
            
          if (!approvedError) {
            console.log("Approved check result:", approvedData);
            setIsApproved(approvedData || false);
          }
          
          setPermissionsChecked(true);
        } catch (error) {
          console.error("Error checking permissions:", error);
          setIsAdmin(false);
          setIsApproved(false);
          setPermissionsChecked(true);
        }
      }
    };

    checkUserPermissions();
  }, [user, permissionsChecked]);

  // Sign out function
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = {
    session,
    user,
    loading: loading || (user && !permissionsChecked), // Consider loading until permissions are checked
    isAdmin,
    isApproved,
    signOut
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
