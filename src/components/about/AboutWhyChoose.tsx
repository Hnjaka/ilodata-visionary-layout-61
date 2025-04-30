
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutWhyChoose = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <CheckCircle className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Pourquoi choisir ILODATA ?</h2>
        </div>

        <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
          <p className="text-lg text-slate-700 mb-8 text-center">
            Nous combinons expertise, réactivité et tarifs compétitifs pour vous offrir un service de qualité. 
            Que vous soyez auteur indépendant ou éditeur, nous mettons tout en œuvre pour répondre à vos besoins 
            et vous accompagner dans la réussite de votre projet.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-ilodata-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Expertise</h3>
              <p className="text-slate-600">
                Des professionnels qualifiés avec plus de 10 ans d'expérience
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-ilodata-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Réactivité</h3>
              <p className="text-slate-600">
                Une prise en charge rapide et efficace de vos projets
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-ilodata-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-slate-800">Tarifs compétitifs</h3>
              <p className="text-slate-600">
                Des prix offshore environ 50% inférieurs aux tarifs français
              </p>
            </div>
          </div>

          <div className="text-center">
            <Link to="/contact" className="button-quote">
              Demandez un devis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutWhyChoose;
