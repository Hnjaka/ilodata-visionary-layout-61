
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleParallax = () => {
      if (!heroRef.current) return;
      const scrollValue = window.scrollY;
      const opacity = 1 - (scrollValue * 0.003);
      const translateY = scrollValue * 0.5;
      
      if (opacity > 0) {
        heroRef.current.style.opacity = opacity.toString();
        heroRef.current.style.transform = `translateY(${translateY}px)`;
      }
    };

    // Désactiver l'effet de parallaxe sur mobile pour de meilleures performances
    if (!isMobile) {
      window.addEventListener('scroll', handleParallax);
      return () => window.removeEventListener('scroll', handleParallax);
    }
  }, [isMobile]);

  return (
    <section className="relative w-full min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black/70 opacity-80 z-0"></div>
      
      {/* Soft pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0,_transparent_40%)] z-0"></div>
      
      {/* Content wrapper */}
      <div 
        ref={heroRef}
        className="container px-4 sm:px-6 py-16 md:py-24 lg:py-32 relative z-10"
      >
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 tracking-tight text-white animate-fade-down">
            Tarif mise en page de livre sur Word pour autoédition
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-4 sm:mb-6 animate-fade-down delay-100">
            Vous êtes auteur indépendant ou autoédité et vous recherchez une solution simple, professionnelle et abordable pour finaliser votre livre ? 
          </p>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-6 sm:mb-8 animate-fade-down delay-200">
            Chez ILODATA, nous vous accompagnons dans toutes les étapes de la mise en page Word professionnelle, afin que votre ouvrage soit prêt à être publié sur Amazon KDP ou en impression traditionnelle.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fade-up delay-300">
            <Link to="/services" className="button-primary group flex items-center gap-2 w-full sm:w-auto">
              Voir nos services
            </Link>
            <Link to="/templates" className="button-secondary w-full sm:w-auto flex items-center gap-2">
              Télécharger un modèle gratuit
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
