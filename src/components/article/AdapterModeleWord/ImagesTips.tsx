
import React from 'react';

const ImagesTips = () => {
  return (
    <section id="images" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">4. Insérez des images sans perturber la mise en forme</h2>
      <p className="text-slate-700 mb-4">
        L'ajout d'images peut déplacer des éléments du modèle. Pour éviter cela :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-xl font-semibold mb-2">Conseils :</h3>
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Cliquez sur l'image {'>'}  Format {'>'}  Habillage du texte {'>'}  choisissez Carré ou Au travers pour un meilleur contrôle.</li>
          <li>Redimensionnez proportionnellement en maintenant la touche Maj tout en étirant l'image.</li>
        </ul>
      </div>
    </section>
  );
};

export default ImagesTips;
