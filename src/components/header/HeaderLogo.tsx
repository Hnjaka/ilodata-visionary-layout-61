
import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo: React.FC = () => {
  return (
    <Link to="/" className="flex items-center">
      <div className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ilodata-700 to-ilodata-500">
        ilodata.com
      </div>
    </Link>
  );
};

export default HeaderLogo;
