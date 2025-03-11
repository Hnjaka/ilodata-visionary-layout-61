
import React from 'react';
import { Check, Book } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section is-visible">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Book className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Choisissez le modèle adapté à votre projet</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Nos modèles de mise en page sont conçus pour répondre aux besoins des auteurs indépendants et des éditeurs. 
            Que vous créiez un roman, un essai, un guide pratique ou un livre illustré, vous trouverez le modèle qu'il vous faut.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2787&auto=format&fit=crop"
              alt="Exemple de mise en page" 
              className="rounded-lg shadow-xl animate-fade-right"
            />
          </div>
          <div className="animate-fade-left">
            <h3 className="text-2xl font-semibold mb-4 text-slate-800">Pourquoi choisir nos modèles ?</h3>
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Professionnels</span> - Conçus par des experts en édition et design éditorial
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Faciles à utiliser</span> - Remplacez simplement le texte par le vôtre
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Personnalisables</span> - Adaptez les styles à vos besoins spécifiques
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Compatibles</span> - Fonctionnent avec Word, OpenOffice, LibreOffice, etc.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
