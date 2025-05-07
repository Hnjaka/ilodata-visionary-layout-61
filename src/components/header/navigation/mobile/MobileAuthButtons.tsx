
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileAuthButtonsProps {
  user: any;
  onLinkClick: () => void;
  onLoginClick: () => void;
  onSignOut: () => Promise<void>;
}

const MobileAuthButtons: React.FC<MobileAuthButtonsProps> = ({ 
  user, 
  onLinkClick, 
  onLoginClick, 
  onSignOut 
}) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = () => {
    console.log("Mobile login button clicked");
    onLoginClick();
    onLinkClick(); // Fermer le menu après clic
  };
  
  const handleSignOut = async () => {
    try {
      console.log("Mobile logout button clicked");
      await onSignOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      navigate('/', { replace: true });
      onLinkClick(); // Fermer le menu après clic
    } catch (error) {
      console.error("Error during sign out:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };
  
  const handleAccountClick = () => {
    console.log("Mobile account button clicked");
    navigate('/account');
    onLinkClick(); // Fermer le menu après clic
  };
  
  return (
    <>
      {user ? (
        <>
          <button 
            onClick={handleAccountClick}
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 flex items-center"
          >
            <User className="h-4 w-4 mr-2" /> Mon compte
          </button>
          <button 
            onClick={handleSignOut}
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 flex items-center"
          >
            <LogOut className="h-4 w-4 mr-2" /> Déconnexion
          </button>
        </>
      ) : (
        <button 
          type="button"
          onClick={handleLogin}
          className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 flex items-center"
        >
          <LogIn className="h-4 w-4 mr-2" /> Connexion
        </button>
      )}
    </>
  );
};

export default MobileAuthButtons;
