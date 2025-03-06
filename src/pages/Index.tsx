
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Guides from '@/components/Guides';
import Services from '@/components/Services';
import About from '@/components/About';
import Testimonials from '@/components/Testimonials';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    // Animation for fade-in-section elements on scroll
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });
    
    fadeInSections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      fadeInSections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  // Set meta tags for SEO
  useEffect(() => {
    document.title = "Mise en page de livre pour auteurs indépendants et éditeurs | ilodata.com";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Découvrez nos modèles Word, formations et services de mise en page pour créer des livres professionnels. Réalisez vous-même ou confiez-nous votre projet.');
    
    // Add keywords meta tag
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'Mise en page livre, Formation mise en page livre, Réaliser soi-même mise en page livre');
  }, []);

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      <Header />
      <Hero />
      <Guides />
      <Services />
      <About />
      <Testimonials />
      <Portfolio />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
