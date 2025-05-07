
import React from 'react';
import DesktopNavLinks from './desktop/DesktopNavLinks';
import DesktopAdminMenu from './desktop/DesktopAdminMenu';

interface DesktopNavItemsProps {
  isAdmin: boolean;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ isAdmin }) => {
  // Debug log to check isAdmin value in DesktopNavItems
  console.log('DesktopNavItems - isAdmin:', isAdmin);
  
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <DesktopNavLinks />
      <DesktopAdminMenu isAdmin={isAdmin} />
    </nav>
  );
};

export default DesktopNavItems;
