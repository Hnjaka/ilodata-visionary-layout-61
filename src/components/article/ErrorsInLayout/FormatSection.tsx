
import React from 'react';

const FormatSection = () => {
  return (
    <section id="formats" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Erreur 6 : Ne pas harmoniser la mise en page pour les différents formats</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Adapter la mise en page selon le support</h3>
          <p className="text-slate-700">Chaque support a ses exigences spécifiques. Le format papier nécessite une attention particulière...</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Les erreurs spécifiques aux ebooks</h3>
          <p className="text-slate-700">Évitez les mises en page rigides qui ne s'adaptent pas aux différentes tailles d'écran...</p>
        </div>
      </div>
    </section>
  );
};

export default FormatSection;
