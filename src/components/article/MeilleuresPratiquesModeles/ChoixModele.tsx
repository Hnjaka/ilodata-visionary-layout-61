
import React from 'react';

const ChoixModele = () => {
  return (
    <section id="choix-modele" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">1. Choisissez le bon modèle pour votre projet</h2>
      <p className="text-slate-700 mb-4">
        Nous proposons différents modèles adaptés à :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Romans (mise en page classique, polices lisibles)</li>
          <li>Livres techniques (espaces pour schémas et notes)</li>
          <li>Essais (structure académique avec notes de bas de page)</li>
          <li>Livres illustrés (emplacements optimisés pour images)</li>
        </ul>
      </div>
      <div className="flex items-center p-4 bg-amber-50 rounded-lg mb-6 border-l-4 border-amber-500">
        <span className="text-amber-500 font-bold mr-2">👉</span>
        <p className="text-slate-700">
          <strong>Astuce :</strong> Téléchargez d'abord un exemple pour vérifier que le format correspond à vos besoins.
        </p>
      </div>
    </section>
  );
};

export default ChoixModele;
