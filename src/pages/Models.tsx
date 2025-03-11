
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSection from '@/components/models/HeroSection';
import FeaturesSection from '@/components/models/FeaturesSection';
import ModelsShowcase from '@/components/models/ModelsShowcase';
import HowToUseSection from '@/components/models/HowToUseSection';
import TestimonialsSection from '@/components/models/TestimonialsSection';
import CtaSection from '@/components/models/CtaSection';

const Models = () => {
  useEffect(() => {
    document.title = "Modèles de mise en page pour livres | ilodata.com";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Téléchargez des modèles Word gratuits et payants pour créer une mise en page de livre professionnelle. Parfait pour les auteurs indépendants et les éditeurs.');
    
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      section.classList.add('is-visible');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <ModelsShowcase />
      <HowToUseSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer />
    </div>
  );
};

export default Models;
