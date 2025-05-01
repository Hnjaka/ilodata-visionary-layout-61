
import React from 'react';
import { Award } from 'lucide-react';

const AboutValues = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Award className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title">Qualité, clarté, simplicité</h2>
          <p className="section-subtitle">
            Des services adaptés aux clients francophones du monde entier
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="prose max-w-none lg:pr-10">
            <p className="text-lg text-slate-700 mb-6">
              Nous travaillons depuis l'international, mais notre cœur de métier est tourné vers les clients francophones, 
              notamment en France, en Belgique, au Canada et en Afrique francophone.
            </p>
            <p className="text-lg text-slate-700 mb-6">
              On vous parle dans un français clair, on comprend vos attentes, on s'adapte à vos outils.
            </p>
            <p className="text-lg text-slate-700 mb-4">Et on vous propose :</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-ilodata-600 mr-2">•</span>
                <span>des prix justes et transparents</span>
              </li>
              <li className="flex items-start">
                <span className="text-ilodata-600 mr-2">•</span>
                <span>des délais rapides</span>
              </li>
              <li className="flex items-start">
                <span className="text-ilodata-600 mr-2">•</span>
                <span>des échanges fluides et humains</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700">
              Paiement en euros, par carte ou PayPal, sans complication.
            </p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-5">
              <div className="bg-blue-50 p-8 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-ilodata-600 mb-2">100%</div>
                <div className="text-slate-700">Satisfaction client</div>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-ilodata-600 mb-2">24h</div>
                <div className="text-slate-700">Délai de réponse</div>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-ilodata-600 mb-2">15+</div>
                <div className="text-slate-700">Ans d'expérience</div>
              </div>
              <div className="bg-blue-50 p-8 rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300">
                <div className="text-3xl font-bold text-ilodata-600 mb-2">4</div>
                <div className="text-slate-700">Pays servis</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
