
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';

interface MobileAuthButtonsProps {
  user: any;
  isAdmin: boolean;
  onLinkClick: () => void;
  onLoginClick: () => void;
  onSignOut: () => Promise<void>;
}

const MobileAuthButtons: React.FC<MobileAuthButtonsProps> = ({ 
  user, 
  isAdmin,
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
      
      // Call the parent's signOut function
      await onSignOut();
      
      // Close the mobile menu
      onLinkClick();
      
      // Navigation is now handled in the Header component's onSignOut function
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
  
  if (!user) {
    return (
      <button 
        type="button"
        onClick={handleLogin}
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 flex items-center"
      >
        <LogIn className="h-4 w-4 mr-2" /> Connexion
      </button>
    );
  }
  
  return (
    <>
      <div className="py-2 font-medium text-slate-800">
        Mon compte:
      </div>
      
      <button 
        onClick={handleAccountClick}
        className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors flex items-center"
      >
        <User className="h-4 w-4 mr-2" /> Profil
      </button>
      
      {isAdmin && (
        <>
          <div className="py-2 font-medium text-slate-800 mt-2">
            Administration:
          </div>
          <button 
            onClick={() => { navigate('/admin/templates'); onLinkClick(); }}
            className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
          >
            Templates
          </button>
          <button 
            onClick={() => { navigate('/admin/guides'); onLinkClick(); }}
            className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
          >
            Guides
          </button>
          <button 
            onClick={() => { navigate('/admin/blog'); onLinkClick(); }}
            className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
          >
            Blog
          </button>
        </>
      )}
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <button 
          onClick={handleSignOut}
          className="text-red-600 hover:text-red-800 font-medium transition-colors py-2 flex items-center"
        >
          <LogOut className="h-4 w-4 mr-2" /> Déconnexion
        </button>
      </div>
    </>
  );
};

export default MobileAuthButtons;
