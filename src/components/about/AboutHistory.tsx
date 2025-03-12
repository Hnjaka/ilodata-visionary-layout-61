
import React from 'react';
import { BookOpen } from 'lucide-react';

const AboutHistory = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Notre histoire</h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <p className="text-lg text-slate-700 mb-8 text-center">
            Créé en 2009, ILODATA Madagascar est installé à Antananarivo, la capitale de Madagascar. 
            Notre localisation stratégique nous permet d'offrir à nos clients européens des tarifs offshore compétitifs, 
            soit environ la moitié des prix pratiqués en France. Depuis plus de 10 ans, nous travaillons avec 
            des clients fidèles, dont la plupart sont des sociétés établies depuis une vingtaine d'années.
          </p>

          <div className="grid grid-cols-3 gap-6 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-ilodata-600 mb-1">2009</div>
              <div className="text-sm text-slate-600">Année de création</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ilodata-600 mb-1">50%</div>
              <div className="text-sm text-slate-600">Économies sur les tarifs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-ilodata-600 mb-1">10+</div>
              <div className="text-sm text-slate-600">Années d'expérience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;
