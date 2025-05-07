
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
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
        onClick={onLinkClick}
      >
        Accueil
      </Link>
      <Link 
        to="/guides" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
        onClick={onLinkClick}
      >
        Conseils et Guides
      </Link>
      <Link 
        to="/services" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
        onClick={onLinkClick}
      >
        Services
      </Link>
      <Link 
        to="/modeles" 
        className="text-green-600 font-medium hover:text-green-700 transition-colors py-2 transform hover:scale-105 duration-200"
        onClick={onLinkClick}
      >
        Modèles
      </Link>
      <Link 
        to="/articles" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
        onClick={onLinkClick}
      >
        Articles
      </Link>
      <Link 
        to="/about" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
        onClick={onLinkClick}
      >
        À propos
      </Link>
      <Link 
        to="/contact" 
        className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
        onClick={onLinkClick}
      >
        Contact
      </Link>
    </>
  );
};

export default MobileNavLinks;
