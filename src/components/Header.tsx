
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, LogIn, LogOut, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };

  const handleLoginClick = () => {
    navigate('/auth');
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ilodata-700 to-ilodata-500">
              ilodata.com
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              Accueil
            </Link>
            <Link to="/guides" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              Conseils et Guides
            </Link>
            <Link to="/services" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              Services
            </Link>
            <Link 
              to="/templates" 
              className="text-green-600 font-medium hover:text-green-700 transition-colors transform hover:scale-110 duration-200"
            >
              Modèles
            </Link>
            <Link to="/about" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              À propos
            </Link>
            <Link to="/contact" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              Contact
            </Link>
            <Link to="/blog" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              Blog
            </Link>
            
            {/* Admin link if user is admin */}
            {user && isAdmin && (
              <div className="relative group">
                <span className="text-slate-800 font-medium hover:text-ilodata-600 cursor-pointer transition-colors transform hover:scale-110 duration-200 flex items-center">
                  <UserCircle className="mr-1 h-4 w-4" /> Admin
                </span>
                <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1" role="menu" aria-orientation="vertical">
                    <Link 
                      to="/admin/templates" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Templates
                    </Link>
                    <Link 
                      to="/admin/guides" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Guides
                    </Link>
                    <Link 
                      to="/admin/blog" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Blog
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <button 
                onClick={handleSignOut}
                className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
              >
                <LogOut className="h-4 w-4 mr-1" /> Déconnexion
              </button>
            ) : (
              <button 
                onClick={handleLoginClick}
                className="flex items-center text-slate-700 hover:text-ilodata-600 transition-colors"
              >
                <LogIn className="h-4 w-4 mr-1" /> Connexion
              </button>
            )}
            <Link to="/contact" className="button-quote">
              Demandez un devis
            </Link>
          </div>

          <button 
            className="md:hidden text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/guides" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Conseils et Guides
              </Link>
              <Link 
                to="/services" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/templates" 
                className="text-green-600 font-medium hover:text-green-700 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Modèles
              </Link>
              <Link 
                to="/about" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/blog" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              
              {/* Auth button for mobile */}
              {user ? (
                <button 
                  onClick={handleSignOut}
                  className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-2" /> Déconnexion
                </button>
              ) : (
                <button 
                  onClick={handleLoginClick}
                  className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 flex items-center"
                >
                  <LogIn className="h-4 w-4 mr-2" /> Connexion
                </button>
              )}
              
              {/* Admin links for mobile */}
              {user && isAdmin && (
                <>
                  <div className="py-2 font-medium text-slate-800">
                    Admin:
                  </div>
                  <Link 
                    to="/admin/templates" 
                    className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Templates
                  </Link>
                  <Link 
                    to="/admin/guides" 
                    className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Guides
                  </Link>
                  <Link 
                    to="/admin/blog" 
                    className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Blog
                  </Link>
                </>
              )}
              
              <Link 
                to="/contact" 
                className="button-quote w-full text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demandez un devis
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
