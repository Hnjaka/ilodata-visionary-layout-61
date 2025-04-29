
import React from 'react';
import { Link } from 'react-router-dom';

const Conclusion = () => {
  return (
    <section id="conclusion" className="mb-12">
      <p className="text-slate-700 mb-4">
        Ces conseils vous ont été utiles ? Partagez votre expérience en commentaire ou découvrez nos autres ressources pour auteurs !
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-8">
        <Link to="/guides/adapter-modele-word" className="button-secondary">
          Adapter un modèle Word à votre texte
        </Link>
        <Link to="/guides/personnaliser-modele-word" className="button-secondary">
          Personnaliser un modèle Word
        </Link>
      </div>
    </section>
  );
};

export default Conclusion;
