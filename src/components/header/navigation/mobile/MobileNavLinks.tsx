
import React from 'react';
import { Link } from 'react-router-dom';

interface MobileNavLinksProps {
  onLinkClick: () => void;
}

const MobileNavLinks: React.FC<MobileNavLinksProps> = ({ onLinkClick }) => {
  return (
    <>
      <Link 
        to="/" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-3 border-b border-gray-100 flex items-center justify-between"
        onClick={onLinkClick}
      >
        Accueil
      </Link>
      <Link 
        to="/guides" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-3 border-b border-gray-100 flex items-center justify-between"
        onClick={onLinkClick}
      >
        Conseils et Guides
      </Link>
      <Link 
        to="/services" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-3 border-b border-gray-100 flex items-center justify-between"
        onClick={onLinkClick}
      >
        Services
      </Link>
      <Link 
        to="/modeles" 
        className="text-green-600 font-medium hover:text-green-700 transition-colors py-3 border-b border-gray-100 flex items-center justify-between"
        onClick={onLinkClick}
      >
        Modèles
      </Link>
      <Link 
        to="/articles" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-3 border-b border-gray-100 flex items-center justify-between"
        onClick={onLinkClick}
      >
        Articles
      </Link>
      <Link 
        to="/about" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-3 border-b border-gray-100 flex items-center justify-between"
        onClick={onLinkClick}
      >
        À propos
      </Link>
      <Link 
        to="/contact" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-3 border-b border-gray-100 flex items-center justify-between"
        onClick={onLinkClick}
      >
        Contact
      </Link>
    </>
  );
};

export default MobileNavLinks;
