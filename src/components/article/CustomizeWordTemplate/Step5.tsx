
import React from 'react';

const Step5 = () => {
  return (
    <section id="etape5" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Étape 5 : Sauvegarder et réutiliser votre modèle personnalisé</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold mb-3">Comment enregistrer un modèle personnalisé</h3>
          <ol className="list-decimal pl-6 text-slate-700 space-y-2">
            <li>Une fois les modifications effectuées, allez dans Fichier > Enregistrer sous.</li>
            <li>Choisissez le format Modèle Word (*.dotx).</li>
            <li>Cela vous permettra de réutiliser votre modèle à chaque création de nouveau document.</li>
          </ol>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Astuces pour le réutiliser efficacement</h3>
          <ul className="list-disc pl-6 text-slate-700 space-y-2">
            <li>Classez vos modèles dans un dossier spécifique pour y accéder facilement.</li>
            <li>Nommez vos modèles clairement selon leur usage : « CV Professionnel », « Rapport Marketing », etc.</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Step5;
