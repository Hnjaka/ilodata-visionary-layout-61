
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/contact';

const ContactPage = () => {
  useEffect(() => {
    document.title = "Contactez-nous | ilodata.com";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Contactez notre équipe pour discuter de vos projets de mise en page de livre, obtenir un devis ou poser vos questions sur nos services.');
    
    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
      section.classList.add('is-visible');
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-24 md:pt-32 bg-blue-50">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Contactez-nous</h1>
          <p className="text-xl text-center text-slate-600 max-w-3xl mx-auto">
            Des questions ou un projet en tête ? Écrivez-nous, nous serons ravis de vous aider.
          </p>
        </div>
      </div>
      <Contact />
      <Footer />
    </div>
  );
};

export default ContactPage;
