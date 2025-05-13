
import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import ModelsSection from '@/components/ModelsSection';
import Guides from '@/components/Guides';
import BlogSection from '@/components/BlogSection'; // Mise à jour ici
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import About from '@/components/About';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Hero />
      <Services />
      <ModelsSection />
      <Guides />
      <BlogSection /> {/* Mise à jour ici */}
      <Testimonials />
      <Contact />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
