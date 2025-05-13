
import React from 'react';

const IntroSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xl md:text-2xl text-gray-700 mb-6">
            Nos services sont conçus pour répondre aux besoins des auteurs qui souhaitent un résultat 
            de qualité sans passer par des logiciels complexes.
          </p>
          
          <p className="text-xl md:text-2xl text-gray-700">
            Grâce à nos modèles Word optimisés, vous obtenez rapidement un rendu propre, 
            structuré et conforme aux standards d'édition.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
