
import React from 'react';

const BackupTips = () => {
  return (
    <section id="sauvegarde" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">5. Sauvegardez une copie avant modification</h2>
      <p className="text-slate-700 mb-4">
        Avant toute modification, dupliquez le fichier original pour pouvoir revenir en arrière en cas d'erreur.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Méthode rapide :</h3>
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Faites Fichier {'>'}  Enregistrer sous {'>'}  Donnez un nouveau nom au document.</li>
        </ul>
      </div>
    </section>
  );
};

export default BackupTips;
