
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
  const [authChecked, setAuthChecked] = useState(false);

  // Effet #1: Surveillance de l'état d'authentification et configuration initiale
  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        if (event === 'SIGNED_OUT') {
          // Reset all states on sign out
          setSession(null);
          setUser(null);
          setIsAdmin(false);
          setIsApproved(false);
          setPermissionsChecked(true);
          console.log("User signed out, reset all states");
          return;
        }

        // Only update session/user if there's a change to avoid loops
        if (JSON.stringify(newSession?.user) !== JSON.stringify(user)) {
          console.log("Auth state changed:", event);
          setSession(newSession);
          setUser(newSession?.user ?? null);
          
          // Reset permission flags when auth state changes
          if (!newSession?.user) {
            setIsAdmin(false);
            setIsApproved(false);
            setPermissionsChecked(true);
          } else if (event !== 'TOKEN_REFRESHED') {
            // Don't re-check permissions on token refresh
            setPermissionsChecked(false);
          }
        }
      }
    );

    // Initial session check
    const checkInitialSession = async () => {
      if (authChecked) return;

      const { data: { session: initialSession } } = await supabase.auth.getSession();
      console.log("Initial session check:", initialSession ? "Session exists" : "No session");
      
      setSession(initialSession);
      setUser(initialSession?.user ?? null);
      
      if (!initialSession?.user) {
        setIsAdmin(false);
        setIsApproved(false);
        setPermissionsChecked(true);
      }
      
      setLoading(false);
      setAuthChecked(true);
    };

    checkInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, [authChecked, user]);

  // Effet #2: Vérification des autorisations utilisateur (séparé pour éviter les boucles)
  useEffect(() => {
    const checkUserPermissions = async () => {
      // Ne vérifier les autorisations que si nous avons un utilisateur et que ce n'est pas déjà vérifié
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
