
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showConfirmationResend, setShowConfirmationResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const notifyAdmin = async (userId: string, userEmail: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-admin-approval-email', {
        body: { userId, userEmail }
      });

      if (error) {
        console.error("Error notifying admin:", error);
        return false;
      }

      console.log("Admin notification sent:", data);
      return true;
    } catch (error) {
      console.error("Error calling admin notification function:", error);
      return false;
    }
  }

  const handleResetPassword = async (resetEmail: string) => {
    setLoading(true);
    setErrorMessage(null);
    
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
      
      setShowForgotPassword(false);
      setEmail(resetEmail); // Pré-remplir l'email pour la connexion
    } catch (error: any) {
      console.error("Erreur lors de la récupération de mot de passe:", error);
      setErrorMessage(error.message || "Une erreur s'est produite lors de l'envoi de l'email.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendConfirmation = async () => {
    setLoading(true);
    setErrorMessage(null);
    
    try {
      toast({
        title: "Information",
        description: "Un administrateur a été notifié de votre inscription et examinera votre demande prochainement.",
      });
    } catch (error: any) {
      console.error("Erreur lors de la demande de confirmation:", error);
      setErrorMessage(error.message || "Une erreur s'est produite lors de l'envoi de la demande.");
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    
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
      
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setErrorMessage(null);
    setShowForgotPassword(false);
    setShowConfirmationResend(false);
  };

  const toggleForgotPassword = () => {
    setShowForgotPassword(!showForgotPassword);
    setErrorMessage(null);
    setShowConfirmationResend(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isSignUp,
    showForgotPassword,
    showConfirmationResend,
    errorMessage,
    handleAuth,
    handleResetPassword,
    handleResendConfirmation,
    toggleSignUp,
    toggleForgotPassword
  };
};
