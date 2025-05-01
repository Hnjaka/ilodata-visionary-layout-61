
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserDeletion = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const deleteUser = useCallback(async (userId: string) => {
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
  }, [toast]);

  return {
    deleteUser,
    loading,
    setLoading
  };
};
