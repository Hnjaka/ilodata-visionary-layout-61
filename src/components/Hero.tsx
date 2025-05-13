
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Download } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

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

    window.addEventListener('scroll', handleParallax);
    return () => window.removeEventListener('scroll', handleParallax);
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden pt-16 bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1610116306796-6fea9f4fae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')" }}>
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 to-black/70 opacity-80 z-0"></div>
      
      {/* Soft pattern overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0,_transparent_40%)] z-0"></div>
      
      {/* Content wrapper */}
      <div 
        ref={heroRef}
        className="container px-4 sm:px-6 py-24 md:py-32 relative z-10"
      >
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-block mb-4 animate-fade-down">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-ilodata-600 text-sm font-medium border border-blue-100">
              Mise en page Amazon KDP
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight text-white animate-fade-down delay-100">
            Tarif mise en page de livre sur Word pour autoédition
          </h1>
          
          <div className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 animate-fade-down delay-200 space-y-4">
            <p>
              Vous êtes auteur indépendant ou autoédité et vous recherchez une solution simple, professionnelle et abordable pour finaliser votre livre ? Chez <strong>ILODATA</strong>, nous vous accompagnons dans toutes les étapes de la <strong>mise en page Word professionnelle</strong>, afin que votre ouvrage soit prêt à être publié sur Amazon KDP ou en impression traditionnelle.
            </p>
            <p>
              Nos services sont conçus pour répondre aux besoins des auteurs qui souhaitent un résultat de qualité sans passer par des logiciels complexes. Grâce à nos modèles Word optimisés, vous obtenez rapidement un rendu propre, structuré et conforme aux standards d'édition.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 animate-fade-up delay-300">
            <Link to="/services" className="button-primary group flex items-center gap-2 w-full sm:w-auto">
              Découvrir nos tarifs
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/templates" className="button-secondary w-full sm:w-auto flex items-center gap-2">
              <Download size={18} />
              Télécharger un modèle Word
            </Link>
          </div>
        </div>
      </div>
      
      {/* Visual elements */}
      <div className="absolute bottom-40 right-[10%] w-64 h-80 hidden md:block animate-fade-in" style={{ perspective: "1000px" }}>
        <div className="relative w-full h-full" style={{ transformStyle: "preserve-3d", animation: "float 6s ease-in-out infinite" }}>
          <div className="absolute w-full h-full glass-card p-3 shadow-lg rotate-6">
            <div className="h-1/3 bg-blue-50 mb-2 rounded"></div>
            <div className="h-3 bg-gray-200 w-3/4 mb-2 rounded"></div>
            <div className="h-3 bg-gray-200 w-1/2 mb-2 rounded"></div>
            <div className="h-3 bg-gray-200 w-2/3 mb-2 rounded"></div>
            <div className="h-3 bg-gray-200 w-3/4 mb-2 rounded"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-32 left-[15%] w-24 h-24 hidden md:block">
        <div className="relative w-full h-full" style={{ animation: "float 5s ease-in-out infinite 1s" }}>
          <div className="absolute w-full h-full glass-card rounded-full p-5 shadow-lg">
            <div className="h-full w-full bg-ilodata-400 rounded-full"></div>
          </div>
        </div>
      </div>

      <style>
        {`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(6deg); }
          50% { transform: translateY(-20px) rotate(9deg); }
        }
        `}
      </style>
    </section>
  );
};

export default Hero;
