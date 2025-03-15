
import React from 'react';

const MarginsSection = () => {
  return (
    <section id="marges" className="mb-10">
      <h2 className="text-2xl font-bold mb-4 text-slate-800">Les marges : un élément clé de l'équilibre visuel</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Définition et rôle des marges</h3>
        <p className="mb-3 text-slate-700">
          Les marges sont les espaces vides autour du texte. Elles jouent plusieurs rôles :
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>Éviter que le texte ne soit trop proche des bords.</li>
          <li>Apporter un confort visuel en créant une respiration entre les blocs de texte.</li>
          <li>Laisser de la place pour la reliure dans un livre imprimé.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Les différents types de marges</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li><strong className="font-medium">Marge supérieure</strong> : située en haut de la page.</li>
          <li><strong className="font-medium">Marge inférieure</strong> : située en bas de la page.</li>
          <li><strong className="font-medium">Marge intérieure</strong> (ou reliure) : importante pour éviter que le texte ne soit trop près de la pliure du livre.</li>
          <li><strong className="font-medium">Marge extérieure</strong> : située à l'extérieur de la page, souvent utilisée pour la numérotation.</li>
        </ul>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-3 text-slate-800">Bonnes pratiques pour définir les marges d'un livre</h3>
        <ul className="list-disc pl-5 space-y-2 text-slate-700">
          <li>Une marge intérieure plus large que les autres pour la reliure.</li>
          <li>Une marge extérieure d'au moins 1,5 cm pour faciliter la lecture.</li>
          <li>Une marge inférieure légèrement plus grande pour éviter que le texte ne semble "écrasé" en bas de la page.</li>
        </ul>
      </div>
    </section>
  );
};

export default MarginsSection;
