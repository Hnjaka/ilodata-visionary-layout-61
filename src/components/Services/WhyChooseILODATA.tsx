
import React from 'react';
import { Check, ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';

const WhyChooseILODATA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50" id="contact">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="section-title text-center">Pourquoi choisir ILODATA ?</h2>
          <p className="section-subtitle">
            Nous sommes spécialisés dans l'autoédition et l'édition numérique avec une approche pratique et adaptée à vos besoins.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ul className="space-y-6">
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="mr-4 text-ilodata-600 mt-1">
                  <Check size={24} className="w-8 h-8 p-1.5 bg-blue-100 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Expertise dans l'autoédition et l'édition numérique</h3>
                  <p className="text-slate-600">
                    Nous accompagnons des centaines d'auteurs chaque année dans leur projet d'autoédition.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="mr-4 text-ilodata-600 mt-1">
                  <Check size={24} className="w-8 h-8 p-1.5 bg-blue-100 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Résultats professionnels avec Word</h3>
                  <p className="text-slate-600">
                    Nos modèles permettent de créer des livres d'apparence professionnelle sans logiciel complexe.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="mr-4 text-ilodata-600 mt-1">
                  <Check size={24} className="w-8 h-8 p-1.5 bg-blue-100 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Tarifs accessibles</h3>
                  <p className="text-slate-600">
                    Des solutions adaptées à tous les budgets, pour auteurs débutants comme confirmés.
                  </p>
                </div>
              </li>
              <li className="flex items-start bg-white p-4 rounded-lg shadow-sm">
                <div className="mr-4 text-ilodata-600 mt-1">
                  <Check size={24} className="w-8 h-8 p-1.5 bg-blue-100 rounded-full" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Accompagnement humain et rapide</h3>
                  <p className="text-slate-600">
                    Un service personnalisé et réactif pour vous aider tout au long de votre projet.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          
          <div className="bg-white p-8 rounded-xl border border-blue-100 shadow-md">
            <h3 className="text-2xl font-bold mb-6 text-center">Prêt à débuter votre projet ?</h3>
            <div className="flex flex-col space-y-4">
              <Link to="/templates" className="button-primary flex items-center justify-center gap-2">
                <Download size={18} />
                Télécharger un modèle gratuit
              </Link>
              <p className="text-center text-slate-500 my-2">ou</p>
              <Link to="/contact" className="button-secondary flex items-center justify-center gap-2">
                Demander un devis personnalisé
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseILODATA;
