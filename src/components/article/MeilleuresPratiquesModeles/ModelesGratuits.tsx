
import React from 'react';
import { Link } from 'react-router-dom';

const ModelesGratuits = () => {
  return (
    <section id="modeles-gratuits" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Bonus : Modèles gratuits pour vous faire gagner du temps</h2>
      <p className="text-slate-700 mb-4">
        Vous souhaitez partir sur une base professionnelle ? ILODATA met à votre disposition une collection de modèles Word gratuits, 
        spécialement conçus pour les auteurs et éditeurs. Ces templates optimisés vous offrent :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Une structure éditoriale clé en main</li>
          <li>Des styles prédéfinis adaptés à chaque type d'ouvrage</li>
          <li>Une compatibilité avec les standards d'impression</li>
        </ul>
      </div>
      <div className="flex items-center p-4 bg-green-50 rounded-lg mb-6 border-l-4 border-green-500">
        <span className="text-green-500 font-bold mr-2">📥</span>
        <p className="text-slate-700">
          <Link to="/templates" className="text-ilodata-600 hover:underline">Téléchargez-les dès maintenant</Link> et personnalisez-les en appliquant nos astuces !
        </p>
      </div>
    </section>
  );
};

export default ModelesGratuits;
