
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserProfileUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateUserProfile = useCallback(async (userId: string, data: {
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
  }, [toast]);

  return {
    updateUserProfile,
    loading,
    setLoading
  };
};
