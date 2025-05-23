
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCta = () => {
  return (
    <section className="py-16 bg-ilodata-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Besoin d'un service de mise en page Word professionnel ?</h2>
          <p className="text-xl mb-8">
            Obtenez un devis gratuit pour votre projet de livre. Nos experts vous proposeront une solution adaptée à vos besoins, 
            avec un tarif transparent et sans engagement.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-full bg-green-600 hover:bg-green-700 text-white font-medium transition-colors"
            >
              Demander un devis gratuit
            </Link>
            <Link 
              to="/modeles" 
              className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition-colors"
            >
              Voir nos modèles Word
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCta;
