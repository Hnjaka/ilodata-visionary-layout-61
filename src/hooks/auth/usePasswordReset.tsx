
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuthState } from './useAuthState';

export const usePasswordReset = () => {
  const { toast } = useToast();
  const [resetLoading, setResetLoading] = useState(false);

  const handleResetPassword = async (resetEmail: string, onSuccess?: () => void) => {
    setResetLoading(true);
    
    try {
      console.log("Tentative de récupération de mot de passe pour:", resetEmail);
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/auth`,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email envoyé",
        description: "Vérifiez votre boîte de réception pour réinitialiser votre mot de passe.",
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      console.error("Erreur lors de la récupération de mot de passe:", error);
      return { error: error.message || "Une erreur s'est produite lors de l'envoi de l'email." };
    } finally {
      setResetLoading(false);
    }
    
    return { error: null };
  };

  return {
    resetLoading,
    handleResetPassword
  };
};
