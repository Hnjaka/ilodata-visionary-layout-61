
import React from 'react';

const WhyImportant = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            💼 Mise en page Word professionnelle : pourquoi est-ce essentiel ?
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Une bonne mise en page influence directement la lisibilité, l'esthétique et la crédibilité de votre livre. 
            Nous utilisons Microsoft Word pour vous proposer des fichiers faciles à modifier, mais avec une structure soignée : 
            marges calibrées, styles automatisés, pagination élégante, chapitrage dynamique, etc.
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Nos modèles conviennent aussi bien aux romans, essais, mémoires, qu'aux guides pratiques. 
            De plus, ils sont conçus pour s'adapter aux exigences d'Amazon Kindle Direct Publishing (KDP).
          </p>
          
          <div className="mt-10 grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Facilité d'utilisation</h3>
              <p className="text-gray-700">Nos fichiers Word sont simples à comprendre et modifier, même pour les débutants.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Conformité KDP</h3>
              <p className="text-gray-700">Templates conçus pour respecter les standards d'Amazon KDP.</p>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">Résultat professionnel</h3>
              <p className="text-gray-700">Une mise en page qui reflète la qualité de votre travail d'écriture.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyImportant;
