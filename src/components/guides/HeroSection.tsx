
import React from 'react';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-b from-white to-blue-50 pt-32 pb-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Guides et Conseils pour la Mise en Page de Livre
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Tout ce dont vous avez besoin pour créer une mise en page professionnelle pour votre livre. Consultez nos guides détaillés et améliorez vos compétences.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
