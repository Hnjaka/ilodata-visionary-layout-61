
import React from 'react';

const LineSpacingSection = () => {
  return (
    <section id="interligne" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">L'interligne : un facteur de lisibilité primordial</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Qu'est-ce que l'interligne ?</h3>
        <p className="mb-3 text-slate-700">
          L'interligne correspond à l'espace entre deux lignes de texte. Un interligne trop serré rend la lecture difficile, 
          tandis qu'un interligne trop large crée une sensation de vide.
        </p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Comment choisir le bon interligne pour un livre ?</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>Pour un livre imprimé, l'interligne recommandé est généralement 1,2 à 1,5 fois la taille de la police.</li>
          <li>Pour un livre numérique, un interligne légèrement plus grand améliore le confort de lecture.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Erreurs courantes à éviter</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>Un interligne trop réduit rendant la lecture étouffante.</li>
          <li>Un interligne trop large augmentant le nombre de pages inutilement.</li>
        </ul>
      </div>
    </section>
  );
};

export default LineSpacingSection;
