
import React from 'react';

const ImagesSection = () => {
  return (
    <section id="images" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 7 : Surutiliser les images et les graphiques</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Bien intégrer les éléments visuels</h3>
          <p className="text-slate-700">Les images doivent soutenir le texte et non l'envahir...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Considérations techniques pour les images</h3>
          <p className="text-slate-700">Veillez à la résolution des images pour éviter un rendu pixelisé...</p>
        </div>
      </div>
    </section>
  );
};

export default ImagesSection;
