
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

// Component imports
import HeaderLogo from './HeaderLogo';
import DesktopNavItems from './navigation/DesktopNavItems';
import MobileNavItems from './navigation/MobileNavItems';
import UserAuthButtons from './auth/UserAuthButtons';
import UserDropdownMenu from './auth/UserDropdownMenu';
import MobileMenuToggle from './MobileMenuToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Calcul explicite du statut d'administrateur
  const showAdminMenu = Boolean(isAdmin && user);

  const handleSignOut = async () => {
    try {
      console.log("Attempting to sign out from Header component");
      await signOut();
      
      // La notification est maintenant gérée dans le composant UserAuthButtons
      console.log("Sign out successful from Header component");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive"
      });
    }
  };

  const handleLoginClick = () => {
    console.log("Login button clicked, navigating to /auth");
    navigate('/auth');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  // Debug log to check isAdmin value
  console.log('Header - User:', user?.email, 'isAdmin:', isAdmin, 'showAdminMenu:', showAdminMenu);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <HeaderLogo />
          <DesktopNavItems isAdmin={showAdminMenu} />
          
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <UserDropdownMenu 
                user={user} 
                isAdmin={showAdminMenu} 
                onSignOut={handleSignOut} 
              />
            ) : (
              <UserAuthButtons 
                user={null}
                onSignOut={handleSignOut} 
                onLogin={handleLoginClick} 
              />
            )}
            
            <a href="/contact" className="button-quote">
              Demandez un devis
            </a>
          </div>
          
          <MobileMenuToggle 
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>
      </div>

      <MobileNavItems 
        isAdmin={showAdminMenu}
        isOpen={isMobileMenuOpen}
        user={user}
        onLinkClick={handleNavLinkClick}
        onLoginClick={handleLoginClick}
        onSignOut={handleSignOut}
      />
    </header>
  );
};

export default Header;
