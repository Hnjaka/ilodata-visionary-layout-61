
import React from 'react';

const SectionsTips = () => {
  return (
    <section id="sections" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">6. Utilisez les sections pour des mises en page différentes</h2>
      <p className="text-slate-700 mb-4">
        Si certaines parties nécessitent une mise en forme distincte (comme une page de garde ou un sommaire), insérez des sauts de section :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Onglet Mise en page {'>'}  Sauts de page {'>'}  Sauts de section.</li>
        </ul>
      </div>
    </section>
  );
};

export default SectionsTips;
