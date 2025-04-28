
import React from 'react';

const FontSection = () => {
  return (
    <section id="polices" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 2 : Utiliser des polices inappropriées</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Comment choisir une police lisible</h3>
          <p className="text-slate-700">Optez pour des polices classiques comme Times New Roman, Garamond ou Georgia pour les textes longs...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Pourquoi éviter les polices fantaisistes</h3>
          <p className="text-slate-700">Des polices excentriques peuvent sembler amusantes, mais elles distraient et rendent la lecture pénible...</p>
        </div>
      </div>
    </section>
  );
};

export default FontSection;
