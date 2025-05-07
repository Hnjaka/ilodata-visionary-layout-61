
import React from 'react';
import DesktopNavLinks from './desktop/DesktopNavLinks';

const DesktopNavItems: React.FC = () => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <DesktopNavLinks />
    </nav>
  );
};

export default DesktopNavItems;
