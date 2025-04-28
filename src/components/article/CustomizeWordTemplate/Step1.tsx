
import React from 'react';

const Step1 = () => {
  return (
    <section id="etape1" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Étape 1 : Choisir un modèle de mise en page adapté</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Où trouver les modèles Word prédéfinis</h3>
          <p className="text-slate-700">
            Word propose une large bibliothèque de modèles intégrés accessibles directement depuis l'accueil du logiciel. Vous pouvez également télécharger d'autres modèles gratuits depuis des plateformes comme Microsoft Office Online ou Canva.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Conseils pour bien choisir son modèle</h3>
          <ul className="list-disc pl-6 text-slate-700 space-y-2">
            <li>Sélectionnez un modèle qui correspond au style de votre document (formel, créatif, académique).</li>
            <li>Privilégiez un modèle simple que vous pourrez adapter facilement.</li>
            <li>Assurez-vous que la structure du modèle convient à vos besoins (présence d'en-têtes, sections, etc.).</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Step1;
