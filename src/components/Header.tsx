
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-white shadow-sm"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <div className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ilodata-700 to-ilodata-500">
              ilodata.com
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
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
              to="/templates" 
              className="text-green-600 font-medium hover:text-green-700 transition-colors transform hover:scale-110 duration-200"
            >
              Modèles
            </Link>
            <Link to="/about" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              À propos
            </Link>
            <Link to="/contact" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              Contact
            </Link>
            <Link to="/blog" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors transform hover:scale-110 duration-200">
              Blog
            </Link>
          </nav>

          <div className="hidden md:block">
            <Link to="/contact" className="button-quote">
              Demandez un devis
            </Link>
          </div>

          <button 
            className="md:hidden text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/guides" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Conseils et Guides
              </Link>
              <Link 
                to="/services" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/templates" 
                className="text-green-600 font-medium hover:text-green-700 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Modèles
              </Link>
              <Link 
                to="/about" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="/contact" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="/blog" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2 transform hover:scale-105 duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                to="/contact" 
                className="button-quote w-full text-center mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Demandez un devis
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
