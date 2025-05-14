
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, BookOpen, Layout, PenTool } from 'lucide-react';
import ServiceCard from './ServiceCard';

const ServicesCards = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-12">
          <h2 className="section-title text-center">Solutions de mise en page pour tous vos projets</h2>
          <p className="section-subtitle max-w-3xl mx-auto">
            Du modèle Word personnalisable au service complet de mise en page professionnelle, 
            nous proposons des solutions adaptées à votre budget et à votre projet d'édition.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <ServiceCard 
            icon={FileText}
            title="Modèles Word Personnalisables"
            description="Utilisez nos modèles de mise en page Word professionnels, faciles à adapter à votre texte. Idéal pour les auteurs qui souhaitent réaliser eux-mêmes leur mise en page à petit prix."
            buttonText="Voir les modèles"
            link="/modeles"
            delay="delay-100"
          />
          
          <ServiceCard 
            icon={BookOpen}
            title="Formation Mise en Page Livre"
            description="Apprenez à créer une mise en page Word professionnelle grâce à nos guides et tutoriels. Maîtrisez les techniques des professionnels pour l'auto-édition."
            buttonText="En savoir plus"
            link="/guides"
            delay="delay-200"
          />
          
          <ServiceCard 
            icon={Layout}
            title="Mise en Page Word Pro"
            description="Confiez-nous votre projet et bénéficiez d'une mise en page Word professionnelle adaptée à vos besoins. Nos tarifs sont transparents et abordables pour tous les auteurs."
            buttonText="Voir les tarifs"
            link="#services"
            delay="delay-300"
          />
          
          <ServiceCard 
            icon={PenTool}
            title="Mise en Page Amazon KDP"
            description="Un service spécialisé pour les auteurs qui publient sur Amazon KDP. Nous créons une mise en page parfaitement conforme aux exigences d'Amazon pour une publication sans erreurs."
            buttonText="Demander un devis"
            link="/contact"
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
