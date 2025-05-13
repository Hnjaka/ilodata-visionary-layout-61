
import React from 'react';
import { Link } from 'react-router-dom';

const PricingTable = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-800">
            💰 Nos tarifs de mise en page Word
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Nous proposons trois formules adaptées à tous les profils d'auteurs :
          </p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left">Formule</th>
                  <th className="py-4 px-6 text-left">Ce qui est inclus</th>
                  <th className="py-4 px-6 text-right">Tarif</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 px-6 font-semibold text-blue-700">Essentielle</td>
                  <td className="py-4 px-6">Mise en page Word simple (roman, essai)</td>
                  <td className="py-4 px-6 text-right font-bold">39 €</td>
                </tr>
                <tr className="border-b border-gray-200 bg-blue-50">
                  <td className="py-4 px-6 font-semibold text-blue-700">Premium</td>
                  <td className="py-4 px-6">Mise en page Word + couverture simple</td>
                  <td className="py-4 px-6 text-right font-bold">69 €</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-semibold text-blue-700">Amazon KDP</td>
                  <td className="py-4 px-6">Mise en page + vérification des fichiers pour Amazon</td>
                  <td className="py-4 px-6 text-right font-bold">99 €</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-lg text-gray-700 flex items-start">
            <span className="text-blue-600 mr-2 font-bold">➡️</span>
            Tous nos tarifs de mise en page livre sont transparents, sans frais cachés. Vous recevez un document final prêt à l'export en PDF ou DOCX, selon vos besoins.
          </p>
          
          <div className="mt-10 text-center">
            <Link 
              to="/contact" 
              className="button-quote inline-block px-8 py-3 text-lg font-medium"
            >
              Demander un devis personnalisé
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingTable;
