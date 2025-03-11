
import React from 'react';
import { FileText, BookOpen, Layout, PenTool } from 'lucide-react';
import ServiceCard from './ServiceCard';

const ServicesCards = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-12">
          <h2 className="section-title text-center">Choisissez le service adapté à votre projet</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <ServiceCard 
            icon={FileText}
            title="Modèles Word Personnalisables"
            description="Utilisez nos modèles de mise en page sous Word, faciles à adapter à votre texte. Idéal pour les auteurs qui souhaitent réaliser eux-mêmes leur mise en page."
            buttonText="Voir les modèles"
            link="/modeles"
            delay="delay-100"
          />
          
          <ServiceCard 
            icon={BookOpen}
            title="Formation Mise en Page Livre"
            description="Apprenez à créer une mise en page professionnelle grâce à nos guides et tutoriels. Parfait pour les auteurs indépendants."
            buttonText="En savoir plus"
            link="/guides"
            delay="delay-200"
          />
          
          <ServiceCard 
            icon={Layout}
            title="Service de Mise en Page sur Mesure"
            description="Confiez-nous votre projet et bénéficiez d'une mise en page professionnelle adaptée à vos besoins. Nous nous occupons de tout, de la typographie à la mise en page finale."
            buttonText="Demandez un devis"
            link="/devis"
            delay="delay-300"
          />
          
          <ServiceCard 
            icon={PenTool}
            title="Création de Modèles Personnalisés"
            description="Besoin d'un modèle unique pour votre livre ? Nous créons des modèles de mise en page sur mesure, adaptés à votre projet et à votre style."
            buttonText="Contactez-nous"
            link="/contact"
            delay="delay-400"
          />
        </div>
      </div>
    </section>
  );
};

export default ServicesCards;
