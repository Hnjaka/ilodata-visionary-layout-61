
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import WhyChooseSection from '@/components/Services/WhyChooseSection';
import PricingSection from '@/components/Services/PricingSection';
import KdpGuideSection from '@/components/Services/KdpGuideSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <WhyChooseSection />
      <PricingSection />
      <KdpGuideSection />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
