
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Component imports
import HeaderLogo from './header/HeaderLogo';
import DesktopNavItems from './header/navigation/DesktopNavItems';
import MobileNavItems from './header/navigation/MobileNavItems';
import UserAuthButtons from './header/auth/UserAuthButtons';
import MobileMenuToggle from './header/MobileMenuToggle';

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

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <HeaderLogo />
          <DesktopNavItems isAdmin={isAdmin && !!user} />
          <UserAuthButtons 
            user={user} 
            onSignOut={handleSignOut} 
            onLogin={handleLoginClick} 
          />
          <MobileMenuToggle 
            isOpen={isMobileMenuOpen}
            onToggle={toggleMobileMenu}
          />
        </div>
      </div>

      <MobileNavItems 
        isAdmin={isAdmin && !!user}
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
