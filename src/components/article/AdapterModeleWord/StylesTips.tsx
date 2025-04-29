
import React from 'react';

const StylesTips = () => {
  return (
    <section id="styles" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">1. Utilisez les styles prédéfinis</h2>
      <p className="text-slate-700 mb-4">
        Les modèles Word intègrent souvent des styles prédéfinis (Titre 1, Titre 2, Corps de texte, etc.). 
        Plutôt que de modifier manuellement la police et la taille du texte, appliquez ces styles pour garantir une cohérence visuelle.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Comment faire ?</h3>
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Sélectionnez votre texte.</li>
          <li>Allez dans l'onglet Accueil {'>'}  Styles.</li>
          <li>Choisissez le style approprié.</li>
        </ul>
      </div>
    </section>
  );
};

export default StylesTips;
