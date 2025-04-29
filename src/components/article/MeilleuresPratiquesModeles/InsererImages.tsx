
import React from 'react';

const InsererImages = () => {
  return (
    <section id="inserer-images" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">4. Insérez vos images et graphiques correctement</h2>
      <p className="text-slate-700 mb-4">
        Pour une intégration propre :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Utilisez l'option Habillage du texte {'>'} Carré</li>
          <li>Maintenez le ratio d'aspect en redimensionnant avec la touche Maj enfoncée</li>
          <li>Optez pour une résolution minimum de 300 DPI pour l'impression</li>
        </ul>
      </div>
    </section>
  );
};

export default InsererImages;
