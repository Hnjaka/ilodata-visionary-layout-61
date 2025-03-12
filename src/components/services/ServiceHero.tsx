
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ServiceHero = () => {
  return (
    <section className="relative pt-32 pb-16 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="absolute inset-0 bg-pattern-overlay opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="animate-fade-right">
            <div className="inline-block mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-ilodata-600 text-sm font-medium border border-blue-100">
                Services sur mesure
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Des services de mise en page sur mesure pour vos projets
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Que vous soyez auteur indépendant ou éditeur, ilodata.com vous propose des services adaptés à vos besoins. De la création de modèles personnalisés à la mise en page complète, nous vous accompagnons à chaque étape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#services" className="button-primary flex items-center gap-2">
                Découvrir nos services
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <Link to="/contact" className="button-secondary">
                Demandez un devis
              </Link>
            </div>
          </div>
          <div className="hidden md:block animate-fade-left relative rounded-lg overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3"
              alt="Mise en page professionnelle d'un livre" 
              className="w-full h-full object-cover rounded-lg transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceHero;
