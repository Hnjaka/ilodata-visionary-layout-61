
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="font-display font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-ilodata-700 to-ilodata-500">
              ilodata
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors">
              Accueil
            </Link>
            <Link to="/guides" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors">
              Conseils et Guides
            </Link>
            <Link to="/services" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors">
              Services
            </Link>
            <Link to="#about" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors">
              À propos
            </Link>
            <Link to="#contact" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors">
              Contact
            </Link>
            <Link to="#blog" className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors">
              Blog
            </Link>
            <a 
              href="https://www.layoutforall.com/shop/" 
              className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors"
              target="_blank" 
              rel="noopener noreferrer"
            >
              Boutique
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link to="/devis" className="button-primary">
              Demandez un devis
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-down">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link 
                to="/" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/guides" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Conseils et Guides
              </Link>
              <Link 
                to="/services" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="#about" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                À propos
              </Link>
              <Link 
                to="#contact" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link 
                to="#blog" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <a 
                href="https://www.layoutforall.com/shop/" 
                className="text-slate-800 font-medium hover:text-ilodata-600 transition-colors py-2"
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Boutique
              </a>
              <Link 
                to="/devis" 
                className="button-primary w-full text-center mt-2"
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
