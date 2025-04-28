
import React from 'react';

const Step4 = () => {
  return (
    <section id="etape4" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Étape 4 : Insérer des éléments personnalisés</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Ajouter et personnaliser un en-tête</h3>
          <ul className="list-disc pl-6 text-slate-700 space-y-2">
            <li>Double-cliquez sur la partie supérieure de la page pour ouvrir l'en-tête.</li>
            <li>Insérez du texte, une image, ou même votre logo pour personnaliser vos documents.</li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Créer un pied de page professionnel</h3>
          <p className="text-slate-700">
            Accédez au bas de votre page pour insérer un pied de page contenant des informations utiles : titre du document, date, numéros de page automatiques.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Step4;
