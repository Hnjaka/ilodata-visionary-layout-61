
import React from 'react';

const Step3 = () => {
  return (
    <section id="etape3" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Étape 3 : Ajuster les marges, l'interligne et les alignements</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Modifier les marges selon vos besoins</h3>
          <p className="text-slate-700">
            Accédez à Mise en page {'>'}  Marges et choisissez parmi les options proposées ou définissez des marges personnalisées selon le format souhaité (ex : pour des rapports ou thèses).
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Gérer l'interligne pour plus de lisibilité</h3>
          <p className="text-slate-700">
            Sous l'onglet Accueil, dans Paragraphe, vous pouvez définir l'interligne (simple, 1,5 ligne, double) et ajouter un espace avant ou après les paragraphes pour aérer le texte.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Step3;
