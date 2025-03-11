
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import StepCard from './StepCard';

const HowToUseSection = () => {
  return (
    <section id="how-to-use" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section is-visible">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Comment personnaliser nos modèles Word ?</h2>
          <p className="section-subtitle">
            Nos modèles sont conçus pour être simples et intuitifs. Voici comment les utiliser :
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          <StepCard 
            number={1} 
            title="Téléchargez le modèle" 
            description="Choisissez et téléchargez le modèle adapté à votre projet de livre."
          />
          <StepCard 
            number={2} 
            title="Ouvrez-le dans votre éditeur" 
            description="Ouvrez-le dans Word ou tout autre éditeur de texte compatible."
          />
          <StepCard 
            number={3} 
            title="Remplacez le contenu" 
            description="Remplacez le texte existant par votre propre contenu."
          />
          <StepCard 
            number={4} 
            title="Personnalisez les styles" 
            description="Modifiez les styles (titres, paragraphes, etc.) selon vos préférences."
          />
          <StepCard 
            number={5} 
            title="Ajoutez vos images" 
            description="Insérez vos propres images, illustrations ou graphiques si nécessaire."
          />
          <StepCard 
            number={6} 
            title="Exportez en PDF" 
            description="Exportez votre fichier en PDF pour l'impression ou la publication en ligne."
          />
        </div>

        <div className="text-center">
          <Link to="/guides" className="button-primary inline-flex items-center">
            Voir le tutoriel complet
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowToUseSection;
