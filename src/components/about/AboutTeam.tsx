
import React from 'react';
import { Users } from 'lucide-react';

const AboutTeam = () => {
  return (
    <section id="team" className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title">Une petite équipe, proche de vous</h2>
          <p className="section-subtitle">
            Passionnée par les beaux documents bien structurés
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1 relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-lg"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-ilodata-100 rounded-lg"></div>
            <div className="glass-card overflow-hidden relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="L'équipe Ilodata au travail" 
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          <div className="order-1 md:order-2 prose max-w-none">
            <p className="text-lg text-slate-700 mb-6">
              Derrière Ilodata, c'est une équipe à taille humaine, passionnée par les beaux documents bien structurés.
              Nous passons nos journées à transformer des fichiers bruts en documents clairs, élégants, cohérents… 
              et agréables à lire.
            </p>
            <p className="text-lg text-slate-700 mb-4">On aime :</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start">
                <span className="text-ilodata-600 mr-2">•</span>
                <span>les belles marges bien alignées,</span>
              </li>
              <li className="flex items-start">
                <span className="text-ilodata-600 mr-2">•</span>
                <span>les titres qui respirent,</span>
              </li>
              <li className="flex items-start">
                <span className="text-ilodata-600 mr-2">•</span>
                <span>et les fichiers qu'on a plaisir à ouvrir.</span>
              </li>
            </ul>
            <p className="text-lg text-slate-700">
              Mais surtout, on aime travailler avec nos clients pour comprendre leurs besoins, leurs idées, 
              et leur rendre un document qui les rend fiers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
