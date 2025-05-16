
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, HelpCircle, Settings } from 'lucide-react';

const AmazonKdpSection = () => {
  return (
    <section className="py-16 bg-white" id="amazon-kdp">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 text-center">
            📚 Comment faire la mise en page de livre pour Amazon KDP avec Word
          </h2>
          
          <p className="text-lg text-gray-700 mb-6">
            Faire la mise en page de votre livre pour Amazon KDP avec Word demande de respecter certaines normes techniques : 
            tailles de page spécifiques, styles de paragraphes, marges, sauts de section, et formatage compatible. 
            Pas d'inquiétude : nous vous guidons à chaque étape pour réussir votre publication.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-start mb-4">
                <span className="p-2 bg-blue-100 rounded-full mr-4">
                  <BookOpen className="h-5 w-5 text-blue-700" />
                </span>
                <h3 className="text-xl font-semibold text-blue-800">Exigences techniques Amazon KDP</h3>
              </div>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Formats de page adaptés au type d'ouvrage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Marges intérieures et extérieures spécifiques</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Numérotation des pages aux bons emplacements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2">•</span>
                  <span>Table des matières interactive requise</span>
                </li>
              </ul>
              <Link to="/guides" className="text-blue-600 font-medium hover:underline inline-flex items-center">
                Consulter nos guides détaillés
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-white p-8 rounded-lg shadow-sm border border-green-100">
              <div className="flex items-start mb-4">
                <span className="p-2 bg-green-100 rounded-full mr-4">
                  <Settings className="h-5 w-5 text-green-700" />
                </span>
                <h3 className="text-xl font-semibold text-green-800">Notre solution clé en main</h3>
              </div>
              <ul className="space-y-2 text-gray-700 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Utilisation des modèles Word optimisés pour Amazon</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Mise en page professionnelle à partir de votre manuscrit</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Vérification technique avant soumission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  <span>Support pour le téléchargement sur KDP</span>
                </li>
              </ul>
              <Link to="/services" className="text-green-600 font-medium hover:underline inline-flex items-center">
                Voir nos services et tarifs 
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <div className="flex items-center mb-4">
              <HelpCircle className="h-5 w-5 text-amber-500 mr-2" />
              <h3 className="text-lg font-medium text-gray-800">À savoir avant de commencer</h3>
            </div>
            <p className="text-gray-700 mb-4">
              Même si vous ne maîtrisez pas Word à 100%, notre système vous permet de récupérer un fichier 
              parfaitement calibré, prêt à être envoyé sur votre compte KDP. Nous proposons également des 
              ressources gratuites pour vous aider à comprendre les fondamentaux.
            </p>
            <div className="flex items-center">
              <FileText className="h-5 w-5 text-amber-500 mr-2" />
              <Link to="/templates" className="text-amber-600 font-medium hover:underline">
                Télécharger un modèle Word gratuit pour Amazon KDP
              </Link>
            </div>
          </div>
          
          <div className="text-center">
            <Link 
              to="/services" 
              className="bg-ilodata-600 hover:bg-ilodata-700 text-white font-medium px-6 py-3 rounded-full inline-flex items-center transition-colors"
            >
              Découvrir nos services de mise en page pour Amazon
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AmazonKdpSection;
