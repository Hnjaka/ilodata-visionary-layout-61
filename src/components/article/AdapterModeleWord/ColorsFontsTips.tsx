
import React from 'react';

const ColorsFontsTips = () => {
  return (
    <section id="couleurs" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">3. Modifiez les couleurs et polices en harmonie</h2>
      <p className="text-slate-700 mb-4">
        Si vous souhaitez changer les couleurs ou les polices, assurez-vous qu'elles restent cohérentes avec le design d'origine.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Bonnes pratiques :</h3>
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Utilisez des outils comme Adobe Color pour choisir une palette harmonieuse.</li>
          <li>Limitez-vous à 2 ou 3 polices maximum pour éviter le désordre visuel.</li>
        </ul>
      </div>
    </section>
  );
};

export default ColorsFontsTips;
