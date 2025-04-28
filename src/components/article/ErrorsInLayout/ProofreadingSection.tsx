
import React from 'react';

const ProofreadingSection = () => {
  return (
    <section id="correction" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 5 : Sauter l'étape de la correction d'épreuves</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Pourquoi les relectures sont essentielles</h3>
          <p className="text-slate-700">Une correction minutieuse est impérative pour éliminer les fautes typographiques...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Les outils pour corriger efficacement</h3>
          <p className="text-slate-700">Utilisez des logiciels professionnels comme Antidote ou Grammarly...</p>
        </div>
      </div>
    </section>
  );
};

export default ProofreadingSection;
