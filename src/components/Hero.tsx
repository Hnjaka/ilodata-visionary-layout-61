
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
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}
      aria-labelledby="hero-heading">
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
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6 tracking-tight text-white animate-fade-down">
            Mise en page Word pour Amazon KDP : services et conseils
          </h1>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-4 sm:mb-6 animate-fade-down delay-100">
            Vous êtes auteur indépendant sur Amazon KDP et recherchez une solution professionnelle pour la mise en page de votre livre sur Word ?
          </p>
          
          <p className="text-lg sm:text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-6 sm:mb-8 animate-fade-down delay-200">
            Chez ILODATA, nous vous accompagnons dans toutes les étapes de la mise en page Word pour Amazon KDP, du formatage initial à l'export final conforme aux exigences d'Amazon.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fade-up delay-300">
            <Link to="/services" className="button-primary group flex items-center gap-2 w-full sm:w-auto">
              Voir nos tarifs mise en page
            </Link>
            <Link to="/templates" className="button-secondary w-full sm:w-auto flex items-center gap-2">
              Télécharger un modèle Word Amazon
            </Link>
          </div>
          
          <div className="mt-8 text-blue-100 flex flex-col sm:flex-row justify-center items-center gap-4 animate-fade-up delay-400 text-sm">
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">✓ Compatible Amazon KDP</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">✓ Mise en page Word professionnelle</span>
            <span className="bg-blue-900/50 px-3 py-1 rounded-full">✓ Guides et ressources gratuites</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced SEO section - visible to search engines but subtle for users */}
      <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-white/60 z-10">
        <p>Solutions de mise en page Word pour Amazon KDP | Formatage de livre pour autoédition</p>
      </div>
    </section>
  );
};

export default Hero;
