
import React from 'react';
import { Check, FileText, BookOpen, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

const PricingSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Nos tarifs de mise en page Word et livre</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Découvrez nos tarifs de mise en page Word clairs et adaptés à chaque besoin d'auteur indépendant. 
            Que vous prépariez un roman, un essai ou un livre illustré, nous avons une formule pour vous.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Formule Essentielle */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 flex flex-col h-full">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-ilodata-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Formule Essentielle</h3>
              <div className="text-3xl font-bold text-ilodata-600 mb-2">39€</div>
              <p className="text-slate-600 mb-6">Mise en page Word standard</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Modèle Word prêt à l'emploi</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Styles prédéfinis</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Guide d'utilisation inclus</span>
              </li>
            </ul>
            
            <Link to="/contact" className="button-primary w-full text-center">
              Commander
            </Link>
          </div>
          
          {/* Formule Premium */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 relative flex flex-col h-full">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-ilodata-600 text-white text-sm font-medium px-3 py-1 rounded-full">Populaire</span>
            </div>
            
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-ilodata-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Formule Premium</h3>
              <div className="text-3xl font-bold text-ilodata-600 mb-2">69€</div>
              <p className="text-slate-600 mb-6">Mise en page Word + couverture simple</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Modèle Word personnalisé</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Couverture simple incluse</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Guide d'utilisation détaillé</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Support par email (7j)</span>
              </li>
            </ul>
            
            <Link to="/contact" className="button-primary w-full text-center">
              Commander
            </Link>
          </div>
          
          {/* Formule Amazon KDP */}
          <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-8 border border-gray-100 flex flex-col h-full">
            <div className="mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <ExternalLink className="h-6 w-6 text-ilodata-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Formule Amazon KDP</h3>
              <div className="text-3xl font-bold text-ilodata-600 mb-2">99€</div>
              <p className="text-slate-600 mb-6">Mise en page Word + test d'export Kindle</p>
            </div>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Tout de la formule Premium</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Test d'export pour Amazon KDP</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Vérification de conformité</span>
              </li>
              <li className="flex items-start">
                <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                <span>Support téléphonique (30 min)</span>
              </li>
            </ul>
            
            <Link to="/contact" className="button-primary w-full text-center">
              Commander
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
