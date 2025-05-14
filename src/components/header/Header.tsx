
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

  // Explicitly calculate admin status
  const showAdminMenu = Boolean(isAdmin && user);

  const handleSignOut = async () => {
    try {
      console.log("Attempting to sign out from Header component");
      await signOut();
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      
      console.log("Sign out successful from Header component");
      navigate('/', { replace: true });
      return Promise.resolve();
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
      toast({
        title: "Erreur",
        description: "Un problème est survenu lors de la déconnexion.",
        variant: "destructive"
      });
      return Promise.reject(error);
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

  // Setup click outside listener to close mobile menu
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const headerElement = document.querySelector('header');
      if (headerElement && !headerElement.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Debug log to check isAdmin value
  console.log('Header - User:', user?.email, 'isAdmin:', isAdmin, 'showAdminMenu:', showAdminMenu);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <HeaderLogo />
          
          {/* Desktop navigation - hidden on mobile */}
          <div className="hidden md:block">
            <DesktopNavItems isAdmin={showAdminMenu} />
          </div>
          
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
