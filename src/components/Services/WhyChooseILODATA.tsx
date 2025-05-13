
import React from 'react';
import { Link } from 'react-router-dom';
import { Check, Award, Clock, Users, DollarSign } from 'lucide-react';

const WhyChooseILODATA = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="text-2xl">✅</span> Pourquoi choisir ILODATA ?
            </h2>
            
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <Award className="h-6 w-6 text-ilodata-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Expertise dans l'autoédition</h3>
                  <p className="text-slate-600">
                    Nos experts maîtrisent les exigences particulières de l'édition numérique et de l'autoédition sur toutes les plateformes.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <Users className="h-6 w-6 text-ilodata-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Résultats professionnels</h3>
                  <p className="text-slate-600">
                    Nous vous proposons des résultats professionnels avec un outil accessible (Word) que vous pourrez continuer à utiliser.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <DollarSign className="h-6 w-6 text-ilodata-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Tarifs accessibles</h3>
                  <p className="text-slate-600">
                    Nos services sont accessibles aux auteurs débutants comme confirmés, avec des tarifs transparents et sans surprise.
                  </p>
                </div>
              </li>
              
              <li className="flex items-start">
                <div className="mt-1 mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-ilodata-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Accompagnement humain et rapide</h3>
                  <p className="text-slate-600">
                    Nous offrons un suivi personnalisé avec des délais respectés et une disponibilité par email et téléphone.
                  </p>
                </div>
              </li>
            </ul>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/templates" className="button-primary">
                Télécharger un modèle gratuit
              </Link>
              <Link to="/contact" className="button-quote">
                Demander un devis personnalisé
              </Link>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Mise en page de livre sur Word" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseILODATA;
