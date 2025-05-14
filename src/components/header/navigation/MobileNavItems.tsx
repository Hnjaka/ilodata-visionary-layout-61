
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileNavLinks from './mobile/MobileNavLinks';
import MobileAuthButtons from './mobile/MobileAuthButtons';
import MobileAdminLinks from './mobile/MobileAdminLinks';
import MobileQuoteButton from './mobile/MobileQuoteButton';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  
  if (!isOpen || !isMobile) return null;
  
  return (
    <div className="md:hidden fixed top-[72px] left-0 right-0 bottom-0 bg-white z-50 overflow-y-auto animate-in slide-in-from-top duration-300">
      <div className="container mx-auto px-4 py-6">
        <nav className="flex flex-col space-y-4">
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
          <div className="mt-4 pt-4 border-t border-gray-200">
            <MobileQuoteButton onLinkClick={onLinkClick} />
          </div>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavItems;
