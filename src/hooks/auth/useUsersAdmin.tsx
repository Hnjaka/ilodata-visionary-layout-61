
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface UserData {
  id: string;
  email: string;
  first_name?: string | null;
  last_name?: string | null;
  is_approved: boolean;
  role: string;
  created_at: string;
  last_sign_in_at?: string | null;
}

export const useUsersAdmin = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchUsers = async () => {
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

      return data as UserData[];
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
  };

  const approveUser = async (userId: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.functions.invoke('approve-user', {
        body: { userId }
      });

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'L\'utilisateur a été approuvé avec succès.',
      });

      return true;
    } catch (error: any) {
      console.error('Erreur lors de l\'approbation de l\'utilisateur:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible d\'approuver l\'utilisateur',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    try {
      // Delete using the edge function
      const { error } = await supabase.functions.invoke('delete-user-account', {
        body: { userId }
      });

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'L\'utilisateur a été supprimé avec succès.',
      });

      return true;
    } catch (error: any) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de supprimer l\'utilisateur',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, role: string) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Le rôle de l\'utilisateur a été mis à jour avec succès.',
      });

      return true;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de mettre à jour le rôle',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateUserProfile = async (userId: string, data: {
    first_name?: string;
    last_name?: string;
    email?: string;
  }) => {
    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', userId);

      if (error) throw error;

      toast({
        title: 'Succès',
        description: 'Le profil utilisateur a été mis à jour avec succès.',
      });

      return true;
    } catch (error: any) {
      console.error('Erreur lors de la mise à jour du profil:', error);
      toast({
        title: 'Erreur',
        description: error.message || 'Impossible de mettre à jour le profil',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    fetchUsers,
    approveUser,
    deleteUser,
    updateUserRole,
    updateUserProfile,
    loading
  };
};
