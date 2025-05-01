
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserData } from './types';

// Define interface for auth user structure
interface AuthUser {
  id: string;
  last_sign_in_at: string | null;
  // Add other fields if needed
}

interface AuthResponse {
  users?: AuthUser[];
}

export const useUsersFetch = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all users from profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }
      
      // Get the auth users data to merge with profiles
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.warn('Impossible de récupérer les données d\'authentification:', authError);
        // Continue with profiles data only
        return data as UserData[];
      }
      
      // Merge profiles with auth data when possible
      const mergedUsers = data.map(profile => {
        const authUser = authUsers?.users?.find(u => u.id === profile.id);
        return {
          ...profile,
          last_sign_in_at: authUser?.last_sign_in_at || null
        } as UserData;
      });

      return mergedUsers;
    } catch (error: any) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de récupérer les utilisateurs',
        variant: 'destructive',
      });
      return [];
    } finally {
      setLoading(false);
    }
  }, [toast]);

  return {
    fetchUsers,
    loading,
    setLoading
  };
};
