
import React from 'react';

const FontSizeFactorsSection = () => {
  return (
    <section id="facteurs" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Les facteurs à considérer pour choisir la taille de police
      </h2>
      
      <h3 className="text-xl font-semibold mb-3 text-slate-800">Type de livre et public cible</h3>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li>Un roman destiné aux adultes utilisera une taille standard (10-12 pts).</li>
        <li>Un livre pour enfants nécessitera une police plus grande (14-16 pts).</li>
        <li>Un ouvrage académique ou technique doit rester lisible même avec une taille légèrement réduite.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3 text-slate-800">Format du livre (papier ou numérique)</h3>
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-6">
        <li><strong>Livre imprimé</strong> : Une taille de 10 à 12 points est courante.</li>
        <li><strong>Livre numérique (eBook)</strong> : Les lecteurs pouvant ajuster la taille de police, une police de base autour de 12-14 pts est recommandée.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-3 text-slate-800">Lisibilité et confort visuel</h3>
      <p className="text-slate-700">
        Il est essentiel de tester plusieurs tailles et polices pour s'assurer d'un bon confort de lecture. 
        Une police trop compacte ou trop large peut rendre la lecture fastidieuse.
      </p>
    </section>
  );
};

export default FontSizeFactorsSection;
