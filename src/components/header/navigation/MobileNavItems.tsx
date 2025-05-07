
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNavLinks from './mobile/MobileNavLinks';
import MobileAuthButtons from './mobile/MobileAuthButtons';
import MobileAdminLinks from './mobile/MobileAdminLinks';
import MobileQuoteButton from './mobile/MobileQuoteButton';
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
  
  // Debug log to check isAdmin value in MobileNavItems
  console.log('MobileNavItems - isAdmin:', isAdmin, 'User:', user?.email);
  
  return (
    <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-down">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-3">
          {/* Navigation Links */}
          <MobileNavLinks onLinkClick={onLinkClick} />
          
          {/* Authentication Buttons */}
          <MobileAuthButtons 
            user={user} 
            isAdmin={isAdmin}
            onLinkClick={onLinkClick} 
            onLoginClick={onLoginClick} 
            onSignOut={onSignOut} 
          />
          
          {/* Quote Button */}
          <MobileQuoteButton onLinkClick={onLinkClick} />
        </nav>
      </div>
    </div>
  );
};

export default MobileNavItems;
