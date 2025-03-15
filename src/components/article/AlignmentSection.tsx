
import React from 'react';

const AlignmentSection = () => {
  return (
    <section id="alignement" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Alignement et justification du texte</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Alignement gauche, centré, droit et justifié</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong className="font-medium">Alignement gauche</strong> : utilisé pour les textes courts et les dialogues.</li>
          <li><strong className="font-medium">Alignement centré</strong> : pour les titres et sous-titres.</li>
          <li><strong className="font-medium">Alignement droit</strong> : rarement utilisé.</li>
          <li><strong className="font-medium">Justification</strong> : idéal pour les livres imprimés car il donne un rendu propre et structuré.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Quel alignement choisir pour un livre ?</h3>
        <p className="text-slate-700">
          Le texte justifié est le plus couramment utilisé dans les livres imprimés, car il crée des blocs de texte homogènes. 
          Cependant, il faut veiller à éviter les "rivières" d'espace blanc.
        </p>
      </div>
    </section>
  );
};

export default AlignmentSection;
