
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative pt-20 pb-16 bg-gradient-to-b from-blue-900 to-blue-800">
      <div className="absolute inset-0 bg-pattern-overlay opacity-10"></div>
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-4 animate-fade-down">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-ilodata-600 text-sm font-medium border border-blue-100">
              Modèles prêts à l'emploi
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-down delay-100">
            Des modèles de mise en page prêts à l'emploi pour votre livre
          </h1>
          <p className="text-xl text-blue-100 mb-8 animate-fade-down delay-200">
            Découvrez nos modèles Word faciles à utiliser, compatibles avec tous les éditeurs de texte. Téléchargez-les, personnalisez-les et créez une mise en page professionnelle en quelques clics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-down delay-300">
            <a href="#models" className="button-primary">
              Voir tous les modèles
            </a>
            <a href="#how-to-use" className="button-secondary">
              Comment utiliser nos modèles ?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
