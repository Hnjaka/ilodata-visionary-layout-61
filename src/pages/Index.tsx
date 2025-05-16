
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import IntroSection from '@/components/IntroSection';
import WhyImportant from '@/components/WhyImportant';
import PricingTable from '@/components/PricingTable';
import AmazonKdpSection from '@/components/AmazonKdpSection';
import WhyChooseUs from '@/components/WhyChooseUs';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Guides from '@/components/Guides';
import ServiceCta from '@/components/ServiceCta';

const Index = () => {
  useEffect(() => {
    // Mise à jour du titre et de la meta description pour le SEO
    document.title = "Mise en page Word pour Amazon KDP | Services et Modèles | ILODATA";
    
    // Ajout ou mise à jour des balises meta pour le SEO
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Services professionnels de mise en page Word pour Amazon KDP. Modèles, conseils et guides gratuits pour réussir votre publication sur Amazon.');
    
    // Ajout de mots-clés pour les moteurs de recherche
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'mise en page word pour amazon, mise en page amazon kdp, formatage livre kindle, mise en page word professionnel, modèle word amazon kdp');
  }, []);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <IntroSection />
      <WhyImportant />
      <PricingTable />
      <AmazonKdpSection />
      <WhyChooseUs />
      <Guides />
      <ServiceCta />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
