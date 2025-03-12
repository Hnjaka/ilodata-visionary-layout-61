
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AboutHero from '@/components/about/AboutHero';
import AboutHistory from '@/components/about/AboutHistory';
import AboutTeam from '@/components/about/AboutTeam';
import AboutApproach from '@/components/about/AboutApproach';
import AboutValues from '@/components/about/AboutValues';
import AboutWhyChoose from '@/components/about/AboutWhyChoose';
import AboutTestimonials from '@/components/about/AboutTestimonials';
import AboutCta from '@/components/about/AboutCta';

const About = () => {
  // Mise à jour des balises meta pour le SEO
  React.useEffect(() => {
    document.title = "À propos d'ILODATA : votre partenaire en mise en page de livre | ilodata.com";
    
    // Création ou mise à jour de la balise meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Découvrez notre histoire, notre équipe et nos valeurs. Depuis 2009, ILODATA offre des services de mise en page de livre à des tarifs compétitifs depuis Madagascar.');
  }, []);

  return (
    <>
      <Header />
      <AboutHero />
      <AboutHistory />
      <AboutTeam />
      <AboutApproach />
      <AboutValues />
      <AboutWhyChoose />
      <AboutTestimonials />
      <AboutCta />
      <Footer />
    </>
  );
};

export default About;
