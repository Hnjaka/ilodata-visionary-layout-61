
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminNotification } from './useAdminNotification';

export const useAuthentication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { notifyAdmin } = useAdminNotification();

  const handleAuth = async (
    isSignUp: boolean, 
    email: string, 
    password: string,
    setLoading: (loading: boolean) => void,
    setError: (message: string, error?: any) => void,
    setIsSignUp: (isSignUp: boolean) => void,
    setShowConfirmationResend: (show: boolean) => void
  ) => {
    setLoading(true);
    
    try {
      if (isSignUp) {
        // Sign up
        console.log("Tentative d'inscription avec:", { email });
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        console.log("Résultat de l'inscription:", { data, error });
        
        if (error) throw error;
        
        // Notify admin about the new user
        if (data.user) {
          const adminNotified = await notifyAdmin(data.user.id, email);
          if (!adminNotified) {
            console.warn("Could not notify admin, but user was created");
          }
        }
        
        toast({
          title: "Inscription réussie",
          description: "Votre demande a été enregistrée. Un administrateur examinera votre compte et vous recevrez une confirmation une fois approuvé.",
        });
        
        setIsSignUp(false);
        setShowConfirmationResend(true);
      } else {
        // Sign in
        console.log("Tentative de connexion avec:", { email });
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        console.log("Résultat de la connexion:", { data, error });
        
        if (error) throw error;
        
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        });
        
        navigate('/');
      }
      
      return { success: true };
    } catch (error: any) {
      console.error("Erreur d'authentification:", error);
      let message = "Une erreur s'est produite.";
      
      if (error.message) {
        // Handle specific error messages
        if (error.message.includes("Email not confirmed")) {
          message = "Votre compte n'a pas encore été approuvé par un administrateur. Veuillez patienter.";
          setShowConfirmationResend(true);
        } else if (error.message.includes("Invalid login credentials")) {
          message = "Email ou mot de passe incorrect.";
        } else if (error.message.includes("Email logins are disabled")) {
          message = "Les connexions par email sont désactivées. Veuillez contacter l'administrateur.";
        } else {
          message = error.message;
        }
      }
      
      setError(message, error);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { handleAuth };
};
