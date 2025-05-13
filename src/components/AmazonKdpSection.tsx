
import React from 'react';
import { Link } from 'react-router-dom';

const AmazonKdpSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            📚 Comment faire la mise en page de livre pour Amazon ?
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Faire la mise en page de votre livre pour Amazon demande de respecter certaines normes : 
            tailles de page, styles de paragraphes, marges, sauts de section, etc. Pas d'inquiétude : 
            nous vous expliquons tout dans un guide étape par étape et nous prenons en charge la mise en 
            forme technique pour vous.
          </p>
          
          <p className="text-lg text-gray-700 mb-10">
            Même si vous ne maîtrisez pas Word à 100 %, notre système vous permet de récupérer un fichier 
            parfaitement calibré, prêt à être envoyé sur votre compte KDP.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Nos guides gratuits</h3>
              <p className="mb-6">Consultez nos articles et tutoriels pour apprendre les bases de la mise en page pour l'autoédition.</p>
              <Link to="/guides" className="text-blue-600 font-medium hover:underline">
                Lire nos guides →
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Service clé en main</h3>
              <p className="mb-6">Faites appel à nos services pour une mise en page professionnelle conforme aux exigences KDP.</p>
              <Link to="/services" className="text-green-600 font-medium hover:underline">
                Découvrir nos services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmazonKdpSection;
