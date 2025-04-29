
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceSection = () => {
  return (
    <section id="services">
      <h2>6. Besoin d'une expertise professionnelle ?</h2>
      <p>
        Malgré ces conseils, la mise en page pour l'impression vous semble complexe ? ILODATA propose des services de mise en page professionnelle adaptés à tous types de documents :
      </p>

      <ul>
        <li>Livres et romans</li>
        <li>Mémoires et thèses</li>
        <li>Catalogues et brochures</li>
        <li>Magazines et revues</li>
      </ul>
      
      <p className="mt-4">
        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
          ✨ À savoir
        </span>
        Nos experts maîtrisent parfaitement les contraintes techniques d'impression et vous garantissent un résultat impeccable.
      </p>
      
      <div className="mt-6">
        <Link to="/services" className="button-primary inline-block">
          Découvrir nos services
        </Link>
      </div>
    </section>
  );
};

export default ServiceSection;
