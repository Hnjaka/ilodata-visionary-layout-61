
import React from 'react';

const LineSpacingSection = () => {
  return (
    <section id="interlignage" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 3 : Mauvaise gestion de l'interlignage et de l'alignement</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Trouver le bon interlignage</h3>
          <p className="text-slate-700">Un interlignage trop serré ou trop espacé nuit à la lisibilité...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Alignement du texte : Justifié ou aligné à gauche ?</h3>
          <p className="text-slate-700">Le texte justifié offre une apparence propre, mais nécessite une attention particulière aux césures...</p>
        </div>
      </div>
    </section>
  );
};

export default LineSpacingSection;
