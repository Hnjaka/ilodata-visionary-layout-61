
import React from 'react';

const LineSpacingBalanceSection = () => {
  return (
    <section id="interlignage" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Taille de police et interlignage : trouver le bon équilibre
      </h2>
      
      <p className="text-slate-700 mb-4">
        La taille de police ne doit pas être choisie seule : l'interligne (espacement entre les lignes) joue un rôle tout aussi crucial.
      </p>
      
      <p className="font-semibold text-slate-800 mb-2">Recommandations générales :</p>
      
      <ul className="list-disc pl-6 space-y-2 text-slate-700 mb-4">
        <li><strong>Interligne simple (1.0 - 1.2)</strong> : adapté aux documents courts.</li>
        <li><strong>Interligne moyen (1.2 - 1.5)</strong> : idéal pour les livres imprimés.</li>
        <li><strong>Interligne large (1.5 - 2.0)</strong> : recommandé pour les livres numériques et les ouvrages pédagogiques.</li>
      </ul>
      
      <p className="text-slate-700">
        Un interligne trop serré fatigue l'œil, tandis qu'un interligne trop espacé allonge artificiellement le texte.
      </p>
    </section>
  );
};

export default LineSpacingBalanceSection;
