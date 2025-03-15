
import React from 'react';

const ImportanceSection = () => {
  return (
    <section id="importance" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Pourquoi une bonne mise en page est essentielle pour un livre ?</h2>
      <p className="mb-4 text-slate-700">
        Une mise en page soignée ne se résume pas à un simple aspect visuel. Elle joue un rôle déterminant dans :
      </p>
      <ul className="list-disc pl-5 space-y-2 text-slate-700 mb-4">
        <li><strong className="font-medium">La lisibilité</strong> : un texte bien espacé et structuré est plus facile à lire.</li>
        <li><strong className="font-medium">Le confort du lecteur</strong> : une bonne mise en page réduit la fatigue oculaire.</li>
        <li><strong className="font-medium">La crédibilité de l'ouvrage</strong> : un livre bien présenté renforce la confiance du lecteur.</li>
        <li><strong className="font-medium">L'accessibilité</strong> : une mise en page adaptée permet une meilleure accessibilité aux personnes ayant des difficultés de lecture.</li>
      </ul>
    </section>
  );
};

export default ImportanceSection;
