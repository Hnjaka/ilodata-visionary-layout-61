
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceSection = () => {
  return (
    <section id="services" className="p-6 border border-blue-100 bg-blue-50 rounded-lg my-8">
      <h2 className="text-xl font-semibold mb-4">Besoin d'une expertise professionnelle ?</h2>
      <p>Notre équipe ILODATA spécialisée en mise en page éditoriale peut :</p>
      <ul className="space-y-2 my-4">
        <li className="flex items-center">
          <svg className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Vérifier et corriger votre fichier avant impression
        </li>
        <li className="flex items-center">
          <svg className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Créer une maquette sur mesure pour votre livre
        </li>
        <li className="flex items-center">
          <svg className="h-5 w-5 text-green-600 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Préparer vos fichiers selon les standards des imprimeurs
        </li>
      </ul>
      <p className="mb-4">
        <span className="inline-flex items-center rounded-md bg-blue-100 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
          💬 
        </span>
        Un projet spécifique ? <Link to="/contact" className="text-ilodata-600 hover:text-ilodata-800 font-medium">Contactez-nous</Link> pour une solution clé en main et obtenez un résultat parfait pour votre impression.
      </p>
    </section>
  );
};

export default ServiceSection;
