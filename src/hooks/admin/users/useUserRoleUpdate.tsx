import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useUserRoleUpdate = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateUserRole = useCallback(async (userId: string, role: string) => {
    setLoading(true);
    try {
      // Map UI role names to database values if needed
      let dbRole = role;
      if (role === 'moderator') {
        dbRole = 'moderator'; // This ensures we store "moderator" in the database
      } else if (role === 'user') {
        dbRole = 'user'; // This ensures we store "user" in the database
      }
      // For "admin", we keep it as is since both UI and DB use the same value
      
      console.log(`Saving role to database: ${dbRole} for user: ${userId}`);
      
      const { error } = await supabase
        .from('profiles')
        .update({ role: dbRole })
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
  }, [toast]);

  return {
    updateUserRole,
    loading,
    setLoading
  };
};
