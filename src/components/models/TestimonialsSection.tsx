
import React from 'react';
import Testimonial from './Testimonial';

const TestimonialsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section is-visible">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Ils ont utilisé nos modèles</h2>
          <p className="section-subtitle">
            Découvrez ce que nos clients pensent de nos modèles de mise en page
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <Testimonial 
            quote="Le modèle Roman m'a permis de finaliser la mise en page de mon livre en un temps record. Je recommande !"
            author="Marie"
            position="Auteure indépendante"
            delay="delay-100"
          />
          <Testimonial 
            quote="Le modèle Livre Illustré est parfait pour mon projet. Les images s'intègrent facilement et le résultat est professionnel."
            author="Pierre"
            position="Éditeur"
            delay="delay-200"
          />
          <Testimonial 
            quote="Grâce au modèle Guide Pratique, j'ai pu organiser mon contenu de manière claire et attractive. Un excellent investissement !"
            author="Sophie"
            position="Coach et auteure"
            delay="delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
