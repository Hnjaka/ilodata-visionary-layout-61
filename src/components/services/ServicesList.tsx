
import React from 'react';
import { FileText } from 'lucide-react';

const ServicesList = () => {
  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Nos services pour une mise en page de livre réussie</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Découvrez nos services conçus pour répondre aux besoins des auteurs indépendants et des éditeurs. 
            Que vous souhaitiez réaliser vous-même votre mise en page ou confier votre projet à des professionnels, 
            nous avons la solution qu'il vous faut.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesList;
