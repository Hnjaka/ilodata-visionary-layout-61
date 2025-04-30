
import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [showConfirmationResend, setShowConfirmationResend] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Check if user is already logged in
  if (user) {
    return <Navigate to="/" />;
  }

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
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Inscription réussie",
          description: "Votre compte a été créé. Vous devez confirmer votre email avant de pouvoir vous connecter.",
        });
        
        setShowConfirmationResend(false);
        setIsSignUp(false);
      } else {
        // Sign in
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) throw error;
        
        toast({
          title: "Connexion réussie",
          description: "Vous êtes maintenant connecté.",
        });
        
        navigate('/');
      }
    } catch (error: any) {
      let message = "Une erreur s'est produite.";
      
      if (error.message) {
        // Handle specific error messages
        if (error.message.includes("Email not confirmed")) {
          message = "Votre email n'a pas été confirmé. Veuillez vérifier votre boîte de réception.";
          setShowConfirmationResend(true);
        } else if (error.message.includes("Invalid login credentials")) {
          message = "Email ou mot de passe incorrect.";
        } else {
          message = error.message;
        }
      }
      
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center mb-6">
              {isSignUp ? "Créer un compte" : "Connexion"}
            </h1>
            
            {errorMessage && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Erreur</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleAuth} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="votre@email.com"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Mot de passe
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="********"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Chargement..." : (isSignUp ? "S'inscrire" : "Se connecter")}
              </Button>
              
              {showConfirmationResend && (
                <Button
                  type="button"
                  variant="outline"
                  className="w-full mt-2"
                  disabled={loading}
                  onClick={handleResendConfirmation}
                >
                  Renvoyer l'email de confirmation
                </Button>
              )}
            </form>
            
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrorMessage(null);
                  setShowConfirmationResend(false);
                }}
                className="text-sm text-blue-600 hover:underline"
              >
                {isSignUp ? "Déjà un compte ? Se connecter" : "Pas de compte ? S'inscrire"}
              </button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Auth;
