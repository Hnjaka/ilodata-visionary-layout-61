
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface MobileNavItemsProps {
  isAdmin: boolean;
  isOpen: boolean;
  user: any;
  onLinkClick: () => void;
  onLoginClick: () => void;
  onSignOut: () => Promise<void>;
}

const MobileNavItems: React.FC<MobileNavItemsProps> = ({ 
  isAdmin, 
  isOpen, 
  user, 
  onLinkClick, 
  onLoginClick, 
  onSignOut 
}) => {
  if (!isOpen) return null;
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Debug log to check isAdmin value in MobileNavItems
  console.log('MobileNavItems - isAdmin:', isAdmin, 'User:', user?.email);
  
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
    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-down">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-3">
          <Link 
            to="/" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Accueil
          </Link>
          <Link 
            to="/guides" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Conseils et Guides
          </Link>
          <Link 
            to="/services" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Services
          </Link>
          <Link 
            to="/modeles" 
            className="text-green-600 font-medium hover:text-green-700 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Modèles
          </Link>
          <Link 
            to="/articles" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Articles
          </Link>
          <Link 
            to="/blog" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Blog
          </Link>
          <Link 
            to="/about" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Contact
          </Link>
          
          {/* Auth button for mobile */}
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
          
          {/* Admin links for mobile */}
          {isAdmin && (
            <>
              <div className="py-2 font-medium text-slate-800">
                Gestion:
              </div>
              <Link 
                to="/admin/templates" 
                className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
                onClick={onLinkClick}
              >
                Templates
              </Link>
              <Link 
                to="/admin/guides" 
                className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
                onClick={onLinkClick}
              >
                Guides
              </Link>
              <Link 
                to="/admin/blog" 
                className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
                onClick={onLinkClick}
              >
                Blog
              </Link>
              <Link 
                to="/admin/users" 
                className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
                onClick={onLinkClick}
              >
                Utilisateurs
              </Link>
            </>
          )}
          
          <Link 
            to="/contact" 
            className="button-quote w-full text-center mt-2"
            onClick={onLinkClick}
          >
            Demandez un devis
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavItems;
