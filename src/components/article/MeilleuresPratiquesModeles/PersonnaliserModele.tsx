
import React from 'react';

const PersonnaliserModele = () => {
  return (
    <section id="personnaliser" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">3. Personnalisez sans casser la mise en page</h2>
      <p className="text-slate-700 mb-4">
        Vous pouvez modifier :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Les polices (mais conservez une hiérarchie lisible)</li>
          <li>Les couleurs (en restant dans des tons harmonieux)</li>
          <li>Les interlignes et marges (pour un confort de lecture optimal)</li>
        </ul>
      </div>
      
      <div className="flex items-center p-4 bg-red-50 rounded-lg mb-6 border-l-4 border-red-500">
        <span className="text-red-500 font-bold mr-2">⚠️</span>
        <div>
          <p className="text-slate-700 font-semibold">À éviter :</p>
          <ul className="list-disc pl-6 text-slate-700 space-y-1">
            <li>Supprimer les sauts de section (risque de désorganiser la pagination)</li>
            <li>Redimensionner manuellement les blocs de texte (utilisez plutôt les styles)</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PersonnaliserModele;
