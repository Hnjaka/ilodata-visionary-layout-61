
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showConfirmationResend, setShowConfirmationResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleResendConfirmation = async () => {
    if (!email) {
      setErrorMessage("Veuillez saisir votre email pour recevoir un lien de confirmation.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Email de confirmation envoyé",
        description: "Veuillez vérifier votre boîte de réception pour confirmer votre email.",
      });
      
      setShowConfirmationResend(false);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible d'envoyer l'email de confirmation.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setShowConfirmationResend(false);
    
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
        
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé. Vous devez confirmer votre email avant de pouvoir vous connecter.",
        });
        
        setShowConfirmationResend(false);
        setIsSignUp(false);
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
          message = "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception.";
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
    setShowConfirmationResend(false);
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    isSignUp,
    showConfirmationResend,
    errorMessage,
    handleAuth,
    handleResendConfirmation,
    toggleSignUp
  };
};
