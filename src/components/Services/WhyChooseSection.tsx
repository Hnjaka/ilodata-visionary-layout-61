
import React from 'react';
import { Check } from 'lucide-react';

const WhyChooseSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-right">
            <img 
              src="https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=2787&auto=format&fit=crop"
              alt="Exemple de mise en page Word pro" 
              className="rounded-lg shadow-xl"
            />
          </div>
          
          <div className="animate-fade-left">
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Mise en page Word professionnelle : pourquoi est-ce essentiel ?</h2>
            
            <p className="text-slate-700 mb-4">
              Une bonne mise en page influence directement la lisibilité, l'esthétique et la crédibilité de votre livre. Nous utilisons Microsoft Word pour vous proposer des fichiers faciles à modifier, mais avec une structure soignée : marges calibrées, styles automatisés, pagination élégante, chapitrage dynamique, etc.
            </p>
            
            <p className="text-slate-700 mb-8">
              Nos modèles conviennent aussi bien aux romans, essais, mémoires, qu'aux guides pratiques. De plus, ils sont conçus pour s'adapter aux exigences d'Amazon Kindle Direct Publishing (KDP).
            </p>
            
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Expertise dans l'autoédition</span> - Nous connaissons parfaitement les exigences d'Amazon KDP
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Résultats professionnels</span> - Avec un outil accessible comme Word
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Tarifs accessibles</span> - Pour auteurs débutants comme confirmés
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Accompagnement humain</span> - Service rapide et personnalisé
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
