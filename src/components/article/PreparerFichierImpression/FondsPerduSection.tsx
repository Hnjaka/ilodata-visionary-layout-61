
import React from 'react';

const FondsPerduSection = () => {
  return (
    <section id="fonds-perdus">
      <h2>2. Les fonds perdus : essentiels pour les images en bord de page</h2>

      <h3>Pourquoi sont-ils indispensables ?</h3>
      <p>
        Les fonds perdus (ou débords) garantissent qu'aucun blanc n'apparaîtra lors de la coupe du papier.
      </p>

      <p>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
          📏 Nos recommandations
        </span>
      </p>
      <ul>
        <li>3 mm minimum tout autour des éléments touchant les bords</li>
        <li>5 mm pour plus de sécurité</li>
      </ul>

      <h3>Mise en œuvre dans Word :</h3>
      <ol>
        <li>Agrandissez votre zone d'image de 3 à 5 mm au-delà du format final</li>
        <li>Utilisez des repères visuels pour marquer la zone de coupe</li>
      </ol>
    </section>
  );
};

export default FondsPerduSection;
