
import React from 'react';
import { Link } from 'react-router-dom';
import { LogIn, LogOut } from 'lucide-react';

interface MobileNavItemsProps {
  isAdmin: boolean;
  isOpen: boolean;
  user: any;
  onLinkClick: () => void;
  onLoginClick: () => void;
  onSignOut: () => void;
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
  
  // Debug log to check isAdmin value in MobileNavItems
  console.log('MobileNavItems - isAdmin:', isAdmin, 'User:', user?.email);
  
  const handleLogin = () => {
    console.log("Mobile login button clicked");
    onLoginClick();
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
            to="/templates" 
            className="text-green-600 font-medium hover:text-green-700 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Modèles
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
          <Link 
            to="/blog" 
            className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
            onClick={onLinkClick}
          >
            Blog
          </Link>
          
          {/* Auth button for mobile */}
          {user ? (
            <button 
              onClick={onSignOut}
              className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" /> Déconnexion
            </button>
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
                Admin:
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
