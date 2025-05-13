
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, FileText, Settings, CheckCircle } from 'lucide-react';

const KdpGuideSection = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-50" id="guide-kdp">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Comment faire la mise en page de livre pour Amazon ?</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Faire la mise en page de votre livre pour Amazon demande de respecter certaines normes : tailles de page, styles de paragraphes, marges, sauts de section, etc. Pas d'inquiétude : nous vous expliquons tout dans un guide étape par étape et nous prenons en charge la mise en forme technique pour vous.
          </p>
          <p className="text-slate-600 mb-8">
            Même si vous ne maîtrisez pas Word à 100 %, notre système vous permet de récupérer un fichier parfaitement calibré, prêt à être envoyé sur votre compte KDP.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-blue-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="font-bold text-xl mb-3">Préparation du manuscrit</h3>
            <p className="text-slate-600 mb-4">
              Apprenez comment structurer votre manuscrit et préparer votre document Word pour une mise en page optimale.
            </p>
            <Link to="/guides/preparation-manuscrit-word" className="text-ilodata-600 font-medium inline-flex items-center hover:text-ilodata-700">
              En savoir plus
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-blue-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="font-bold text-xl mb-3">Configuration et formatage</h3>
            <p className="text-slate-600 mb-4">
              Découvrez les paramètres optimaux pour la mise en page Kindle et comment configurer correctement les marges et la typographie.
            </p>
            <Link to="/guides/configuration-formatage-kdp" className="text-ilodata-600 font-medium inline-flex items-center hover:text-ilodata-700">
              En savoir plus
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 border border-blue-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <BookOpen className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="font-bold text-xl mb-3">Export et publication</h3>
            <p className="text-slate-600 mb-4">
              Suivez notre guide étape par étape pour exporter correctement votre document et le publier sur Amazon KDP sans erreur.
            </p>
            <Link to="/guides/export-publication-amazon-kdp" className="text-ilodata-600 font-medium inline-flex items-center hover:text-ilodata-700">
              En savoir plus
              <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>

        <div className="text-center mt-12">
          <Link to="/guides/faire-la-mise-en-page-amazon" className="button-primary inline-flex items-center">
            Lire notre guide complet
            <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default KdpGuideSection;
