
import React from 'react';
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

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <IntroSection />
      <WhyImportant />
      <PricingTable />
      <AmazonKdpSection />
      <WhyChooseUs />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
