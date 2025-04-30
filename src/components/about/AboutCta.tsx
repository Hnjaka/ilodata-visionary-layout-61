
import React from 'react';
import { Link } from 'react-router-dom';

const AboutCta = () => {
  return (
    <section className="py-16 bg-ilodata-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à collaborer avec nous ?</h2>
          <p className="text-xl mb-8">
            Que vous ayez besoin d'un modèle de mise en page, d'une formation ou d'un service sur mesure, 
            ILODATA est là pour vous accompagner à chaque étape de votre projet.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="button-quote"
            >
              Demandez un devis
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition-colors"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
