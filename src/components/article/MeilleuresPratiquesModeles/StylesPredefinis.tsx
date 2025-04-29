
import React from 'react';

const StylesPredefinis = () => {
  return (
    <section id="styles-predefinis" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">2. Utilisez les styles prédéfinis pour une cohérence parfaite</h2>
      <p className="text-slate-700 mb-4">
        Nos modèles incluent des styles prédéfinis (titres, sous-titres, corps de texte, citations, etc.) pour :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Éviter les incohérences de mise en forme</li>
          <li>Permettre une navigation facile dans le document</li>
          <li>Faciliter l'export vers d'autres formats (PDF, ePub)</li>
        </ul>
      </div>
      
      <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-200">
        <div className="flex items-center mb-2">
          <span className="text-slate-700 font-bold mr-2">🔧</span>
          <h3 className="font-semibold text-slate-800">Comment faire ? :</h3>
        </div>
        <ol className="list-decimal pl-6 text-slate-700 space-y-1">
          <li>Sélectionnez votre texte</li>
          <li>Appliquez le style correspondant via l'onglet Accueil {'>'} Styles</li>
        </ol>
      </div>
    </section>
  );
};

export default StylesPredefinis;
