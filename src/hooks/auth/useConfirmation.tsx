
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from './useAdminNotification';

export const useConfirmation = () => {
  const { toast } = useToast();
  const { notifyAdmin } = useAdminNotification();

  const handleResendConfirmation = async (email: string, setLoading: (state: boolean) => void, setError: (message: string, error?: any) => void) => {
    setLoading(true);
    
    try {
      if (!email) {
        throw new Error("Veuillez entrer votre email avant de demander une nouvelle confirmation.");
      }
      
      // Find the user by email
      const { data, error: usersError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1,
        filter: email
      });
      
      if (usersError) {
        console.error("Error fetching user:", usersError);
        throw new Error("Impossible de trouver l'utilisateur.");
      }
      
      const users = data?.users;
      if (users && users.length > 0) {
        const userId = users[0].id;
        const adminNotified = await notifyAdmin(userId, email);
        
        if (!adminNotified) {
          throw new Error("Impossible de notifier l'administrateur. Veuillez réessayer plus tard.");
        }
      } else {
        throw new Error("Utilisateur non trouvé.");
      }
      
      toast({
        title: "Demande envoyée",
        description: "Un administrateur a été notifié de votre inscription et examinera votre demande prochainement.",
      });

      return { success: true };
    } catch (error: any) {
      console.error("Erreur lors de la demande de confirmation:", error);
      setError(error.message || "Une erreur s'est produite lors de l'envoi de la demande.", error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleResendConfirmation };
};
