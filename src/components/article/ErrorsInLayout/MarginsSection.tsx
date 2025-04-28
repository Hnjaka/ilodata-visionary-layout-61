
import React from 'react';

const MarginsSection = () => {
  return (
    <section id="marges" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 1 : Négliger les marges et l'espacement</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Définir des marges appropriées</h3>
          <p className="text-slate-700">Les marges jouent un rôle vital dans la lisibilité d'un livre...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">L'impact de l'espacement sur la lisibilité</h3>
          <p className="text-slate-700">Un espacement correct entre les lignes permet aux yeux de naviguer facilement sur la page...</p>
        </div>
      </div>
    </section>
  );
};

export default MarginsSection;
