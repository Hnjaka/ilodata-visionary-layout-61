
import React from 'react';
import ServiceTestimonial from './ServiceTestimonial';

const ServiceTestimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 md:px-6 fade-in-section">
        <div className="text-center mb-16">
          <h2 className="section-title text-center">Ils nous font confiance</h2>
          <p className="section-subtitle">
            Découvrez les témoignages de nos clients satisfaits
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <ServiceTestimonial 
            quote="Grâce au service de mise en page sur mesure d'ilodata.com, mon livre a une présentation professionnelle sans que j'aie à m'en préoccuper."
            author="Marie"
            position="Auteure indépendante"
            image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=288&q=80"
            delay="delay-100"
          />
          
          <ServiceTestimonial 
            quote="Les modèles Word personnalisables sont un gain de temps incroyable. Je recommande vivement !"
            author="Pierre"
            position="Éditeur"
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
            delay="delay-200"
          />
          
          <ServiceTestimonial 
            quote="La formation à la mise en page m'a permis de réaliser mon livre de cuisine avec un résultat professionnel. Merci à toute l'équipe !"
            author="Sophie"
            position="Auteure culinaire"
            image="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=761&q=80"
            delay="delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default ServiceTestimonials;
