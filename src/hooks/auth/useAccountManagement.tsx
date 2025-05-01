
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const useAccountManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const deleteAccount = async () => {
    setLoading(true);
    
    try {
      // Call the edge function to delete the user account
      const { data, error } = await supabase.functions.invoke('delete-user-account');
      
      if (error) throw error;
      
      if (data?.error) throw new Error(data.error);
      
      // Account was deleted, sign out locally
      await supabase.auth.signOut();
      
      toast({
        title: "Compte supprimé",
        description: "Votre compte a été supprimé avec succès.",
      });
      
      navigate('/');
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la suppression du compte:", error);
      
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la suppression de votre compte.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteAccount,
    loading,
  };
};
