
import React from 'react';
import DesktopNavLinks from './desktop/DesktopNavLinks';

interface DesktopNavItemsProps {
  isAdmin?: boolean;
}

const DesktopNavItems: React.FC<DesktopNavItemsProps> = ({ isAdmin = false }) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <DesktopNavLinks />
    </nav>
  );
};

export default DesktopNavItems;
