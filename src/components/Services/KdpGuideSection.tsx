
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Columns, Layers, BookmarkIcon } from 'lucide-react';

const KdpGuideSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
            <span className="text-2xl">📚</span> Comment faire la mise en page de livre pour Amazon ?
          </h2>
          <p className="text-lg text-slate-600">
            Faire la mise en page de votre livre pour Amazon demande de respecter certaines normes : tailles de page, 
            styles de paragraphes, marges, sauts de section, etc. Pas d'inquiétude : nous vous expliquons tout dans 
            un guide étape par étape et nous prenons en charge la mise en forme technique pour vous.
          </p>
          <p className="text-lg text-slate-600 mt-4">
            Même si vous ne maîtrisez pas Word à 100 %, notre système vous permet de récupérer un fichier parfaitement 
            calibré, prêt à être envoyé sur votre compte KDP.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">1. Format de page</h3>
            <p className="text-gray-600">
              Choix du format de livre adapté (5x8, 6x9 pouces) et configuration des marges selon les exigences KDP.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">2. Styles de paragraphe</h3>
            <p className="text-gray-600">
              Configuration des styles cohérents pour le corps du texte, titres, sous-titres et éléments spéciaux.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Columns className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">3. Tables des matières</h3>
            <p className="text-gray-600">
              Création d'une table des matières dynamique avec liens cliquables pour la version numérique.
            </p>
          </div>
          
          <div className="glass-card p-6">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <BookmarkIcon className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">4. Export PDF</h3>
            <p className="text-gray-600">
              Préparation du fichier final avec les paramètres d'export optimaux pour l'envoi sur KDP.
            </p>
          </div>
        </div>
        
        <div className="text-center mt-12">
          <Link to="/guides" className="button-primary">
            Consulter notre guide complet KDP
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KdpGuideSection;
