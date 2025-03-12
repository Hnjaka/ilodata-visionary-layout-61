
import React from 'react';
import { Link } from 'react-router-dom';

const AboutHero = () => {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="absolute inset-0 bg-pattern-overlay opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              À propos d'ILODATA : votre partenaire en mise en page de livre
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Depuis 2009, ILODATA accompagne les auteurs indépendants et les éditeurs dans la création de livres professionnels. 
              Découvrez notre histoire, notre équipe et nos valeurs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#team" className="button-primary">
                Découvrir notre équipe
              </a>
              <Link to="/contact" className="button-secondary">
                Contactez-nous
              </Link>
            </div>
          </div>
          <div className="hidden md:block animate-fade-left relative rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Équipe ILODATA à Madagascar" 
              className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
