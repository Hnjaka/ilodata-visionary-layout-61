
import React from 'react';

const CommonMistakesSection = () => {
  return (
    <section id="erreurs" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Les erreurs courantes à éviter
      </h2>
      
      <ul className="list-disc pl-6 space-y-2 text-slate-700">
        <li>Utiliser une taille trop petite (&lt;10 pts) : rend la lecture difficile.</li>
        <li>Choisir une police fantaisiste : diminue la lisibilité et l'aspect professionnel.</li>
        <li>Négliger l'interligne : trop serré ou trop large affecte le confort de lecture.</li>
        <li>Ne pas tester sur différents supports : ce qui est lisible sur écran ne l'est pas forcément sur papier.</li>
      </ul>
    </section>
  );
};

export default CommonMistakesSection;
