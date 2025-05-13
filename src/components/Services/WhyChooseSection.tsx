
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
            <h2 className="text-3xl font-bold mb-6 text-slate-800">Pourquoi choisir une mise en page Word professionnelle ?</h2>
            
            <p className="text-slate-700 mb-8">
              Une <strong>mise en page Word professionnelle</strong> est essentielle pour que votre livre ait un rendu soigné et soit conforme aux exigences d'<strong>Amazon KDP</strong>. Nous proposons des modèles élégants, compatibles avec Word, et faciles à utiliser.
            </p>
            
            <ul className="space-y-4">
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Conforme aux standards</span> - Respecte les exigences d'Amazon KDP pour une publication sans erreur
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Simple à utiliser</span> - Nos modèles Word sont intuitifs et accompagnés de guides
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Rendu professionnel</span> - Donnez à votre livre l'apparence d'un ouvrage édité par un professionnel
                </p>
              </li>
              <li className="flex">
                <div className="mr-4 text-ilodata-600">
                  <Check size={24} />
                </div>
                <p className="text-slate-700">
                  <span className="font-semibold">Gain de temps</span> - Évitez des heures de formatage manuel et de corrections
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
