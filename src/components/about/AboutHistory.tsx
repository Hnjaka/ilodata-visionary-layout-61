
import React from 'react';
import { BookOpen } from 'lucide-react';

const AboutHistory = () => {
  return (
    <section id="mission" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title">Notre mission</h2>
          <p className="section-subtitle">
            Vous aider à présenter vos documents avec clarté, style et professionnalisme
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="prose max-w-none lg:pr-10">
            <p className="text-lg text-slate-700 mb-6">
              Chez Ilodata, notre mission est simple : vous aider à présenter vos documents avec clarté, style et professionnalisme.
              Parce qu'un beau contenu mérite une belle mise en page, nous avons créé un service qui s'adresse à tous ceux qui veulent 
              aller plus loin que le simple "copier-coller" dans Word.
            </p>
            <p className="text-lg text-slate-700 mb-6">
              Vous êtes auteur indépendant, formateur, étudiant, entrepreneur ou membre d'une association ?
              Nos modèles Word gratuits sont là pour vous simplifier la vie, et notre service de mise en page 
              personnalisée vous accompagne si vous souhaitez un rendu vraiment professionnel.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-ilodata-100 rounded-lg"></div>
            <div className="glass-card overflow-hidden relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Document bien mis en page" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;
