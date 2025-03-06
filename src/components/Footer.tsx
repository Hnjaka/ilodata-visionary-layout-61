
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <div className="font-display font-bold text-2xl text-white">
                ilodata
              </div>
            </Link>
            <p className="text-slate-300 mb-6">
              Solutions professionnelles de mise en page et design éditorial pour valoriser vos contenus.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ilodata-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ilodata-600 transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ilodata-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-ilodata-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/services/mise-en-page" className="text-slate-300 hover:text-white transition-colors">
                  Mise en page professionnelle
                </Link>
              </li>
              <li>
                <Link to="/services/correction" className="text-slate-300 hover:text-white transition-colors">
                  Correction et révision
                </Link>
              </li>
              <li>
                <Link to="/services/design" className="text-slate-300 hover:text-white transition-colors">
                  Design graphique
                </Link>
              </li>
              <li>
                <Link to="/services/formation" className="text-slate-300 hover:text-white transition-colors">
                  Formation et coaching
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Ressources</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/modeles" className="text-slate-300 hover:text-white transition-colors">
                  Modèles de livre
                </Link>
              </li>
              <li>
                <Link to="/tutoriels" className="text-slate-300 hover:text-white transition-colors">
                  Tutoriels et vidéos
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-300 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-slate-300 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-4">Entreprise</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/legal/cgu" className="text-slate-300 hover:text-white transition-colors">
                  CGU
                </Link>
              </li>
              <li>
                <Link to="/legal/confidentialite" className="text-slate-300 hover:text-white transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-800 text-center text-slate-400 text-sm">
          <p>&copy; {currentYear} Ilodata. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
