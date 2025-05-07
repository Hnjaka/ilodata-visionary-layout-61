
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileAdminLinksProps {
  isAdmin: boolean;
  onLinkClick: () => void;
}

const MobileAdminLinks: React.FC<MobileAdminLinksProps> = ({ isAdmin, onLinkClick }) => {
  if (!isAdmin) return null;
  
  return (
    <>
      <div className="py-2 font-medium text-slate-800">
        Gestion:
      </div>
      <Link 
        to="/admin/templates" 
        className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
        onClick={onLinkClick}
      >
        Templates
      </Link>
      <Link 
        to="/admin/guides" 
        className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
        onClick={onLinkClick}
      >
        Guides
      </Link>
      <Link 
        to="/admin/blog" 
        className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
        onClick={onLinkClick}
      >
        Blog
      </Link>
      <Link 
        to="/admin/articles" 
        className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
        onClick={onLinkClick}
      >
        Articles
      </Link>
      <Link 
        to="/admin/users" 
        className="text-slate-700 hover:text-ilodata-600 py-1 pl-4 transition-colors"
        onClick={onLinkClick}
      >
        Utilisateurs
      </Link>
    </>
  );
};

export default MobileAdminLinks;
