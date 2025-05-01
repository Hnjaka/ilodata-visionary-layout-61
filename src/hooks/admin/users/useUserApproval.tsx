
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserApproval = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const approveUser = useCallback(async (userId: string) => {
    setLoading(true);
    try {
      // 1. Mettre à jour le champ is_approved dans la table profiles
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_approved: true })
        .eq('id', userId);

      if (profileError) throw profileError;

      // 2. Confirmer l'email de l'utilisateur dans auth.users via la fonction Edge
      const { error: confirmError } = await supabase.functions.invoke('approve-user', {
        body: { userId }
      });

      if (confirmError) throw confirmError;

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
  }, [toast]);

  return {
    approveUser,
    loading,
    setLoading
  };
};
