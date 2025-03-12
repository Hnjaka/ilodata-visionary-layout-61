
import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCta = () => {
  return (
    <section className="py-16 bg-ilodata-600 text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à donner vie à votre livre ?</h2>
          <p className="text-xl mb-8">
            Que vous choisissiez d'utiliser nos modèles, de suivre nos formations ou de faire appel à notre service sur mesure, 
            ilodata.com est là pour vous accompagner à chaque étape.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-full bg-white text-ilodata-600 font-medium hover:bg-blue-50 transition-colors"
            >
              Demandez un devis
            </Link>
            <Link 
              to="/contact" 
              className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition-colors"
            >
              Contactez-nous
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceCta;
