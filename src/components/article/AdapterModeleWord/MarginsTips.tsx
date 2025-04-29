
import React from 'react';

const MarginsTips = () => {
  return (
    <section id="marges" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">2. Ajustez les marges et la mise en page</h2>
      <p className="text-slate-700 mb-4">
        Si votre texte est trop long ou trop court, modifiez les marges et l'espacement pour optimiser l'espace sans déformer le modèle.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Astuce :</h3>
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Onglet Mise en page {'>'}  Marges (choisissez des marges étroites pour gagner de la place).</li>
          <li>Ajustez l'interligne (Accueil {'>'}  Interligne et paragraphe) pour améliorer la lisibilité.</li>
        </ul>
      </div>
    </section>
  );
};

export default MarginsTips;
