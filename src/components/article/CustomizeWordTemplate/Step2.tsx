
import React from 'react';

const Step2 = () => {
  return (
    <section id="etape2" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Étape 2 : Modifier les styles de texte</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Comprendre l'importance des styles</h3>
          <p className="text-slate-700">
            Les styles Word définissent l'apparence des titres, paragraphes, listes et citations. Modifier les styles garantit une mise en page cohérente et professionnelle.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Personnaliser les polices, tailles et couleurs</h3>
          <ol className="list-decimal pl-6 text-slate-700 space-y-2">
            <li>Allez dans l'onglet Accueil puis cliquez sur Styles.</li>
            <li>Faites un clic droit sur le style que vous souhaitez modifier (ex : Titre 1) et sélectionnez Modifier.</li>
            <li>Changez la police, la taille, la couleur et appliquez les modifications à tout le document.</li>
          </ol>
        </div>
      </div>
    </section>
  );
};

export default Step2;
