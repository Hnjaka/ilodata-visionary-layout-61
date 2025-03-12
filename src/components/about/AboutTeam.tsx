
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
          <h2 className="section-title text-center">Une équipe dédiée à votre réussite</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <p className="text-lg text-slate-700 mb-6">
              Notre équipe est composée d'une quinzaine d'employés en CDI, tous francophones et passionnés par leur travail. 
              Nous sommes organisés en journées de 8 heures (8h à 16h30, heure de Madagascar), ce qui nous permet de couvrir 
              80% des heures de bureau en France (9h à 15h30). Cette proximité horaire facilite une communication directe et 
              efficace avec nos clients en France et en Europe.
            </p>
            <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3 text-ilodata-600">Nos points forts</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-ilodata-100 p-1 mt-1">
                    <svg className="w-4 h-4 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>15 employés francophones en CDI</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-ilodata-100 p-1 mt-1">
                    <svg className="w-4 h-4 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Disponibilité de 8h à 16h30 (heure de Madagascar)</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="rounded-full bg-ilodata-100 p-1 mt-1">
                    <svg className="w-4 h-4 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Couverture de 80% des heures de bureau en France</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="order-1 md:order-2 relative">
            <div className="absolute -top-4 -left-4 w-32 h-32 bg-ilodata-100 rounded-lg -z-10"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-lg -z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
              alt="L'équipe d'ILODATA" 
              className="w-full h-auto object-cover rounded-lg shadow-xl relative z-10"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
