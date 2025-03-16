
import React from 'react';

const FontSizeImportanceSection = () => {
  return (
    <section id="importance" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Pourquoi la taille de police est essentielle pour un livre ?
      </h2>
      <p className="text-slate-700 mb-4">
        Une taille de police adaptée influence plusieurs aspects :
      </p>
      <ul className="list-disc pl-6 space-y-2 text-slate-700">
        <li>
          <strong>Lisibilité</strong> : Un texte bien dimensionné est plus facile à lire, surtout pour de longues sessions.
        </li>
        <li>
          <strong>Confort du lecteur</strong> : Une taille adéquate réduit la fatigue oculaire.
        </li>
        <li>
          <strong>Aspect professionnel</strong> : Une mise en page bien équilibrée améliore la perception du livre.
        </li>
        <li>
          <strong>Optimisation du nombre de pages</strong> : Une police trop grande peut gonfler artificiellement le livre et une police trop petite le rendre indigeste.
        </li>
      </ul>
    </section>
  );
};

export default FontSizeImportanceSection;
