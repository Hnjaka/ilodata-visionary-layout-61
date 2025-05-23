
import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle } from 'lucide-react';

interface DesktopAdminMenuProps {
  isAdmin: boolean;
}

const DesktopAdminMenu: React.FC<DesktopAdminMenuProps> = ({ isAdmin }) => {
  if (!isAdmin) return null;
  
  return (
    <div className="relative group">
      <span className="text-slate-800 font-medium hover:text-ilodata-600 cursor-pointer transition-colors transform hover:scale-110 duration-200 flex items-center">
        <UserCircle className="mr-1 h-4 w-4" /> Gestion
      </span>
      <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <div className="py-1" role="menu" aria-orientation="vertical">
          <Link 
            to="/admin/templates" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Templates
          </Link>
          <Link 
            to="/admin/guides" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Guides
          </Link>
          <Link 
            to="/admin/blog" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Blog
          </Link>
          <Link 
            to="/admin/articles" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Articles
          </Link>
          <Link 
            to="/admin/users" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            role="menuitem"
          >
            Utilisateurs
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopAdminMenu;
