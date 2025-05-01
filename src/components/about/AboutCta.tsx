
import React from 'react';
import { Link } from 'react-router-dom';

const AboutCta = () => {
  return (
    <section className="py-16 bg-ilodata-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Et vous, c'est quoi votre projet ?</h2>
          <p className="text-xl mb-8">
            Que vous ayez besoin d'un petit coup de main ou d'une mise en page complète, 
            on est là pour vous accompagner. Expliquez-nous ce que vous avez en tête — et 
            on vous proposera une solution claire, rapide, et sans jargon.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="button-quote"
            >
              👉 Demander un devis gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCta;
