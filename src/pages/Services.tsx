
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
    document.title = "Tarif mise en page Word et livre | Mise en page Amazon Kindle";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Découvrez nos tarifs de mise en page de livre Word et nos conseils pour publier sur Amazon KDP. Modèles pros et simples à utiliser.');
    
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
