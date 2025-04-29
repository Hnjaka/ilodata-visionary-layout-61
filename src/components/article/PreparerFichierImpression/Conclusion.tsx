
import React from 'react';
import { Link } from 'react-router-dom';

const Conclusion = () => {
  return (
    <section id="conclusion">
      <h2>7. Conclusion</h2>
      <p>
        La préparation de votre fichier pour l'impression est une étape cruciale pour obtenir un résultat professionnel. En suivant nos conseils sur les marges, les fonds perdus, la résolution et les formats de fichier, vous maximisez vos chances d'avoir un livre parfaitement imprimé.
      </p>
      <p className="mt-4">
        N'oubliez pas que la qualité de l'impression reflète directement la qualité de votre contenu aux yeux des lecteurs. Un investissement de temps dans cette préparation est toujours rentable !
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        <Link to="/modeles" className="text-ilodata-600 hover:text-ilodata-800 font-medium">
          → Découvrir nos modèles gratuits
        </Link>
        <Link to="/services" className="text-ilodata-600 hover:text-ilodata-800 font-medium">
          → En savoir plus sur nos services
        </Link>
      </div>
    </section>
  );
};

export default Conclusion;
