
import React from 'react';
import { Link } from 'react-router-dom';

const ServicesMiseEnPage = () => {
  return (
    <section id="services" className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Besoin d'une mise en page sur mesure ?</h2>
      <p className="text-slate-700 mb-4">
        Notre équipe d'experts chez ILODATA peut vous accompagner pour :
      </p>
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <ul className="list-disc pl-6 text-slate-700 space-y-1">
          <li>Créer un modèle personnalisé adapté à votre livre</li>
          <li>Finaliser la mise en page de votre manuscrit</li>
          <li>Préparer vos fichiers pour l'impression ou l'édition numérique</li>
        </ul>
      </div>
      
      <div className="flex items-center p-4 bg-blue-50 rounded-lg mb-6 border-l-4 border-blue-500">
        <span className="text-blue-500 font-bold mr-2">💡</span>
        <p className="text-slate-700">
          Un projet spécifique ? <Link to="/contact" className="text-ilodata-600 hover:underline">Contactez-nous</Link> pour une solution taillée sur mesure.
        </p>
      </div>
    </section>
  );
};

export default ServicesMiseEnPage;
