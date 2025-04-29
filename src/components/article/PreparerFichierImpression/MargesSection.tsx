
import React from 'react';

const MargesSection = () => {
  return (
    <section id="marges">
      <h2>1. Les marges : la base d'une bonne mise en page</h2>

      <h3>Marges standards :</h3>
      <ul>
        <li>Intérieur (côté reliure) : 2 à 2,5 cm</li>
        <li>Extérieur : 1,5 à 2 cm</li>
        <li>Haut/Bas : 2 cm minimum</li>
      </ul>

      <p>
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
          🔍 À savoir
        </span>
        Ces valeurs varient selon le type de reliure (broché, dos carré collé) et l'épaisseur du livre.
      </p>

      <h3>Comment les paramétrer dans Word :</h3>
      <ol>
        <li>Onglet Mise en page &gt; Marges</li>
        <li>Choisissez Marges personnalisées</li>
        <li>Entrez vos valeurs en prévoyant 0,5 cm supplémentaire pour la reliure</li>
      </ol>
    </section>
  );
};

export default MargesSection;
