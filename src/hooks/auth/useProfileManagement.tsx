
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface ProfileData {
  email: string;
  firstName?: string;
  lastName?: string;
}

export const useProfileManagement = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const updateProfile = async (userId: string, profileData: ProfileData) => {
    setLoading(true);
    
    try {
      // First check if the profile exists
      const { data: existingProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (fetchError) throw fetchError;

      // If profile exists, update it, otherwise create it
      if (existingProfile) {
        const { error } = await supabase
          .from('profiles')
          .update({
            email: profileData.email,
            first_name: profileData.firstName,
            last_name: profileData.lastName
          })
          .eq('id', userId);
          
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('profiles')
          .insert({
            id: userId,
            email: profileData.email,
            first_name: profileData.firstName,
            last_name: profileData.lastName
          });
          
        if (error) throw error;
      }
      
      toast({
        title: "Profil mis à jour",
        description: "Vos informations de profil ont été mises à jour avec succès.",
      });
      
      return true;
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour du profil:", error);
      
      toast({
        title: "Erreur",
        description: error.message || "Une erreur s'est produite lors de la mise à jour de votre profil.",
        variant: "destructive",
      });
      
      return false;
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
        
      if (error) throw error;
      
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération du profil:", error);
      return null;
    }
  };

  return {
    updateProfile,
    fetchProfile,
    loading
  };
};
