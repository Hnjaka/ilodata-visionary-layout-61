
import React from 'react';

const TestingReadabilitySection = () => {
  return (
    <section id="tester-lisibilite" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">
        Comment tester la lisibilité d'une taille de police ?
      </h2>
      
      <p className="text-slate-700 mb-4">
        Avant d'arrêter votre choix, voici quelques méthodes pour vérifier la lisibilité :
      </p>
      
      <ul className="list-disc pl-6 space-y-2 text-slate-700">
        <li>Imprimer une page test avec différentes tailles et polices.</li>
        <li>Lire sur différents supports (ordinateur, tablette, imprimé).</li>
        <li>Faire tester à plusieurs personnes pour obtenir des avis variés.</li>
        <li>Simuler un format livre en pliant une feuille A4 pour évaluer l'aspect final.</li>
      </ul>
    </section>
  );
};

export default TestingReadabilitySection;
