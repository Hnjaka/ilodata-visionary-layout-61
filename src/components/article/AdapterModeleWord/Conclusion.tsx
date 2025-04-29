
import React from 'react';
import { Link } from 'react-router-dom';

const Conclusion = () => {
  return (
    <section id="conclusion" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Conclusion</h2>
      <p className="text-slate-700 mb-6">
        Adapter un modèle Word à votre texte tout en conservant sa qualité nécessite une approche méthodique. 
        En utilisant les styles, en ajustant la mise en page avec précision et en sauvegardant des versions de secours, 
        vous obtiendrez un document professionnel et esthétique sans difficulté.
      </p>
      
      <div className="bg-blue-50 p-5 rounded-lg mb-6">
        <p className="text-slate-700 mb-4">
          Besoin d'un modèle bien conçu ? Explorez la bibliothèque de modèles Microsoft Word ou des sites comme Canva et Envato Elements pour des designs optimisés.
        </p>
        <div className="font-medium">
          <p className="text-slate-700 mb-3">
            <strong>Bonus :</strong> Vous souhaitez gagner du temps ? ILODATA met à votre disposition une collection de modèles Word professionnels gratuits à télécharger. 
            Ces templates vous offrent une base optimisée que vous pouvez personnaliser en appliquant nos astuces ci-dessus.
          </p>
          <p className="mb-3">
            <Link to="/modeles" className="text-ilodata-600 hover:underline">
              Découvrir nos modèles gratuits
            </Link>
          </p>
        </div>
      </div>
      
      <div className="bg-ilodata-50 p-5 rounded-lg border border-ilodata-200 mb-6">
        <p className="text-slate-700 mb-3">
          💡 Vous préférez confier cette tâche à des experts ? La société ILODATA dispose d'une équipe spécialisée 
          pour réaliser une mise en page professionnelle et personnalisée, vous garantissant un résultat parfaitement adapté à vos besoins.
        </p>
        <p>
          <Link to="/services" className="text-ilodata-600 font-medium hover:underline">
            En savoir plus sur nos services de mise en page
          </Link>
        </p>
      </div>
      
      <div className="border-t border-gray-200 pt-6 mt-6">
        <p className="text-slate-700">
          📌 À vous de jouer ! Testez ces astuces et partagez vos résultats en commentaires. 
          Pour une assistance sur mesure, n'hésitez pas à <Link to="/contact" className="text-ilodata-600 hover:underline">contacter ILODATA</Link>.
        </p>
      </div>
    </section>
  );
};

export default Conclusion;
