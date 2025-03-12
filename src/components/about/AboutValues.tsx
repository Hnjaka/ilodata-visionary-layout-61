
import React from 'react';
import { Heart } from 'lucide-react';

const AboutValues = () => {
  return (
    <section className="py-16 md:py-24 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Heart className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Nos valeurs</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-32 h-32 bg-ilodata-100 rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-100 rounded-lg -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1573497491765-dccce02b29df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="Équilibre vie professionnelle et personnelle" 
              className="w-full h-auto object-cover rounded-lg shadow-xl relative z-10"
            />
          </div>
          
          <div>
            <p className="text-lg text-slate-700 mb-6">
              Chez ILODATA, nous croyons en l'équilibre entre vie professionnelle et vie personnelle. 
              Nous réduisons au minimum le travail en dehors des horaires de bureau pour permettre à 
              nos employés de profiter de leur vie de famille. De plus, une partie de notre équipe travaille 
              en télétravail par rotation, ce qui leur offre une meilleure gestion de leur temps et de 
              leurs responsabilités familiales.
            </p>

            <div className="space-y-4 mt-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ilodata-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-slate-800">Respect de la vie familiale</h3>
                  <p className="text-slate-600">Horaires de travail équilibrés pour permettre à chacun de profiter pleinement de sa vie personnelle.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ilodata-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-slate-800">Télétravail</h3>
                  <p className="text-slate-600">Flexibilité pour une meilleure qualité de vie et un équilibre professionnel optimal.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-ilodata-100 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-1 text-slate-800">Sécurisation de l'emploi</h3>
                  <p className="text-slate-600">Collaboration durable avec des clients fidèles pour assurer la stabilité des emplois.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
