
import React from 'react';
import { Link } from 'react-router-dom';

const DesktopNavLinks: React.FC = () => {
  return (
    <>
      <Link to="/" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
        Accueil
      </Link>
      <Link to="/guides" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
        Conseils et Guides
      </Link>
      <Link to="/services" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
        Services
      </Link>
      <Link 
        to="/modeles" 
        className="text-green-600 font-medium hover:text-green-700 transition-colors transform hover:scale-110 duration-200"
      >
        Modèles
      </Link>
      <Link to="/articles" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
        Articles
      </Link>
      <Link to="/about" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
        À propos
      </Link>
      <Link to="/contact" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
        Contact
      </Link>
    </>
  );
};

export default DesktopNavLinks;
