
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from './useAdminNotification';

// Define a type for the user object returned from Supabase admin API
interface SupabaseAdminUser {
  id: string;
  email?: string;
  // Add other properties as needed
}

export const useConfirmation = () => {
  const { toast } = useToast();
  const { notifyAdmin } = useAdminNotification();

  const handleResendConfirmation = async (email: string, setLoading: (state: boolean) => void, setError: (message: string, error?: any) => void) => {
    setLoading(true);
    
    try {
      if (!email) {
        throw new Error("Veuillez entrer votre email avant de demander une nouvelle confirmation.");
      }
      
      // Get all users and filter by email manually since Supabase admin API doesn't support filtering
      const { data: userData, error: usersError } = await supabase.auth.admin.listUsers();
      
      if (usersError) {
        console.error("Error fetching user:", usersError);
        throw new Error("Impossible de trouver l'utilisateur.");
      }
      
      // Check if userData and userData.users exist before accessing
      if (!userData || !userData.users) {
        throw new Error("Aucun utilisateur trouvé.");
      }
      
      // Properly type users array from userData.users
      const users: SupabaseAdminUser[] = userData.users;
      
      // Manually filter the users by email
      const filteredUsers = users.filter(user => user.email === email);
      if (filteredUsers && filteredUsers.length > 0) {
        const userId = filteredUsers[0].id;
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
