
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/2287d112-0fba-4631-a472-4e0865c9a5eb.png" 
        alt="ilodata.com Logo" 
        className="h-10 w-auto"
      />
    </Link>
  );
};

export default HeaderLogo;
