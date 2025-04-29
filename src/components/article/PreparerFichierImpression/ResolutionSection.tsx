
import React from 'react';

const ResolutionSection = () => {
  return (
    <section id="resolution">
      <h2>3. La résolution : qualité d'image garantie</h2>

      <h3>Les standards professionnels :</h3>
      <ul>
        <li>300 DPI minimum pour les images imprimées</li>
        <li>600 DPI pour le texte et les graphiques vectoriels</li>
      </ul>

      <p>
        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-sm font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20 mr-2">
          ⚠️ Attention
        </span>
        Un agrandissement d'image réduit la résolution !
      </p>

      <h3>Vérification sous Word :</h3>
      <ol>
        <li>Cliquez droit sur l'image &gt; Format de l'image</li>
        <li>Vérifiez la taille réelle en cm et le nombre de pixels</li>
      </ol>
    </section>
  );
};

export default ResolutionSection;
