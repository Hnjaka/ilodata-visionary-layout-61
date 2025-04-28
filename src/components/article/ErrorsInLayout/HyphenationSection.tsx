
import React from 'react';

const HyphenationSection = () => {
  return (
    <section id="cesures" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 9 : Mal gérer les césures et les coupures de mots</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Pourquoi éviter les coupures maladroites</h3>
          <p className="text-slate-700">Un mot coupé en deux au mauvais endroit casse le rythme de la lecture...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Paramétrer correctement les césures</h3>
          <p className="text-slate-700">Utilisez les options de césure automatique de votre logiciel de mise en page...</p>
        </div>
      </div>
    </section>
  );
};

export default HyphenationSection;
