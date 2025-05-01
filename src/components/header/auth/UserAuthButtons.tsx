
import React from 'react';
import { LogIn, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';

interface UserAuthButtonsProps {
  user: any;
  onSignOut: () => Promise<void>;
  onLogin: () => void;
}

const UserAuthButtons: React.FC<UserAuthButtonsProps> = ({ user, onSignOut, onLogin }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleLogin = () => {
    console.log("Login button clicked in UserAuthButtons");
    onLogin();
  };

  const handleSignOut = async () => {
    try {
      console.log("Logout button clicked in UserAuthButtons - starting logout process");
      await onSignOut();
      console.log("Logout successful in UserAuthButtons");
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      // Force navigation to home page after logout
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Erreur lors de la déconnexion dans UserAuthButtons:", error);
      toast({
        title: "Erreur de déconnexion",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };
  
  const handleAccountClick = () => {
    console.log("Account button clicked in UserAuthButtons");
    navigate('/account');
  };

  return (
    <div className="hidden md:flex items-center space-x-4">
      {user ? (
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleAccountClick}
            variant="ghost"
            className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
            type="button"
          >
            <User className="h-4 w-4 mr-1" /> Mon compte
          </Button>
          <Button 
            onClick={handleSignOut}
            variant="ghost"
            className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
            type="button"
          >
            <LogOut className="h-4 w-4 mr-1" /> Déconnexion
          </Button>
        </div>
      ) : (
        <Button 
          type="button"
          onClick={handleLogin}
          variant="ghost"
          className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
        >
          <LogIn className="h-4 w-4 mr-1" /> Connexion
        </Button>
      )}
      <Link to="/contact" className="button-quote">
        Demandez un devis
      </Link>
    </div>
  );
};

export default UserAuthButtons;
