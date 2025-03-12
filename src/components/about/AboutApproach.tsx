
import React from 'react';
import { MessageCircle } from 'lucide-react';

const AboutApproach = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <MessageCircle className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Notre approche : réactivité et transparence</h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <p className="text-lg text-slate-700 mb-8 text-center">
            Chez ILODATA, chaque projet est encadré directement par le propriétaire-gérant, 
            qui sera votre interlocuteur principal. Cette structure légère nous permet d'être très réactifs 
            et de résoudre rapidement tout problème, qu'il soit technique, logistique ou lié à la planification. 
            Nous utilisons les dernières technologies de communication, comme les mails, WhatsApp, Teams, Skype 
            et le partage d'écran, pour interagir en temps réel avec nos clients et clarifier les incompréhensions.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-ilodata-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Réactivité</h3>
              <p className="text-slate-600">
                Prise en charge rapide des problèmes au plus haut niveau, pour des solutions efficaces et immédiates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-ilodata-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Transparence</h3>
              <p className="text-slate-600">
                Suivi en temps réel de l'avancement des projets, pour une totale visibilité sur le processus.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 rounded-full bg-ilodata-100 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-ilodata-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-800">Communication</h3>
              <p className="text-slate-600">
                Utilisation d'outils modernes pour une collaboration fluide et efficace avec nos clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutApproach;
