
import { supabase } from '@/integrations/supabase/client';

export const useAdminNotification = () => {
  const notifyAdmin = async (userId: string, userEmail: string) => {
    try {
      console.log("Notifying admin about new user registration:", { userId, userEmail });
      
      const { data, error } = await supabase.functions.invoke('send-admin-approval-email', {
        body: { userId, userEmail }
      });

      if (error) {
        console.error("Error notifying admin:", error);
        return false;
      }

      console.log("Admin notification response:", data);
      return true;
    } catch (error) {
      console.error("Error calling admin notification function:", error);
      return false;
    }
  };

  return { notifyAdmin };
};
