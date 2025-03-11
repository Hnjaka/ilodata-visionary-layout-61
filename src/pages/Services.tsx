
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ServiceHero from '@/components/services/ServiceHero';
import ServicesList from '@/components/services/ServicesList';
import ServicesCards from '@/components/services/ServicesCards';
import HowItWorks from '@/components/services/HowItWorks';
import ServiceTestimonials from '@/components/services/ServiceTestimonials';
import ServiceCta from '@/components/services/ServiceCta';

const Services = () => {
  useEffect(() => {
    document.title = "Services de mise en page pour auteurs et éditeurs | ilodata.com";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Découvrez nos services de mise en page sur mesure, modèles Word et formations pour créer des livres professionnels. Parfait pour les auteurs indépendants et les éditeurs.');
    
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      section.classList.add('is-visible');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ServiceHero />
      <ServicesList />
      <ServicesCards />
      <HowItWorks />
      <ServiceTestimonials />
      <ServiceCta />
      <Footer />
    </div>
  );
};

export default Services;
