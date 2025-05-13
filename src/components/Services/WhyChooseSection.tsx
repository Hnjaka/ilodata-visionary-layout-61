
import React from 'react';
import { Book, Layout, FileText } from 'lucide-react';

const WhyChooseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 flex items-center justify-center gap-2">
            <span className="text-2xl">💼</span> Mise en page Word professionnelle : pourquoi est-ce essentiel ?
          </h2>
          <p className="text-lg text-slate-600">
            Une bonne mise en page influence directement la lisibilité, l'esthétique et la crédibilité de votre livre. 
            Nous utilisons Microsoft Word pour vous proposer des fichiers faciles à modifier, mais avec une structure soignée : 
            marges calibrées, styles automatisés, pagination élégante, chapitrage dynamique, etc.
          </p>
          <p className="text-lg text-slate-600 mt-4">
            Nos modèles conviennent aussi bien aux romans, essais, mémoires, qu'aux guides pratiques. 
            De plus, ils sont conçus pour s'adapter aux exigences d'Amazon Kindle Direct Publishing (KDP).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Book className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Pour tous types d'ouvrages</h3>
            <p className="text-gray-600">
              Romans, essais, mémoires, biographies, guides pratiques – nos modèles s'adaptent à tous les genres littéraires.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Layout className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Structure professionnelle</h3>
            <p className="text-gray-600">
              Marges calibrées, styles automatisés, pagination élégante, chapitrage dynamique pour une mise en page soignée.
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-ilodata-600" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Compatible Amazon KDP</h3>
            <p className="text-gray-600">
              Tous nos modèles sont optimisés pour respecter les exigences spécifiques d'Amazon Kindle Direct Publishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
