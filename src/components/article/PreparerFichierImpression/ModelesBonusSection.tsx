
import React from 'react';
import { Link } from 'react-router-dom';

const ModelesBonusSection = () => {
  return (
    <section id="modeles-bonus">
      <h2>
        <Link to="/modeles" className="text-ilodata-600 hover:text-ilodata-800 no-underline">
          5. Bonus : Modèles professionnels gratuits
        </Link>
      </h2>
      <p>
        Vous souhaitez gagner du temps ? ILODATA met à votre disposition une collection de modèles Word professionnels gratuits à télécharger. Ces templates vous offrent :
      </p>
      <ul>
        <li>Une base optimisée avec les bonnes marges préparamétrées</li>
        <li>Des guides visuels pour les fonds perdus</li>
        <li>Une structure adaptée à différents types d'ouvrages</li>
      </ul>
      <p className="mt-4">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
          📥 
        </span>
        <Link to="/modeles" className="text-ilodata-600 hover:text-ilodata-800 font-medium">
          Téléchargez-les dès maintenant
        </Link> et personnalisez-les en appliquant nos astuces ci-dessus !
      </p>
    </section>
  );
};

export default ModelesBonusSection;
