
import React, { useEffect, useRef } from 'react';
import { Users } from 'lucide-react';

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (imageRef.current) {
              imageRef.current.style.opacity = '1';
              imageRef.current.style.transform = 'translateX(0)';
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      imageObserver.observe(imageRef.current);
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
      if (imageRef.current) {
        imageObserver.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Qui sommes-nous ?</h2>
          <p className="section-subtitle">
            Découvrez notre passion pour la mise en page et notre expertise au service de vos projets éditoriaux.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div 
            ref={sectionRef} 
            className="fade-in-section"
          >
            <p className="text-slate-600 mb-4">
              Chez ilodata.com, nous accompagnons les auteurs indépendants et les éditeurs dans la création de livres professionnels. Notre mission : vous donner les outils et les connaissances pour réaliser vous-même votre mise en page, ou vous offrir un service sur mesure pour gagner du temps.
            </p>
            <p className="text-slate-600 mb-4">
              Fondée par une équipe d'experts en édition et en design, notre société s'appuie sur plus de 15 ans d'expérience dans l'industrie de l'édition et de la communication. Nous avons accompagné des centaines d'auteurs, d'entreprises et d'institutions dans la réalisation de leurs projets éditoriaux.
            </p>
            <p className="text-slate-600 mb-4">
              Notre approche combine rigueur professionnelle et créativité pour offrir des solutions adaptées à chaque projet, qu'il s'agisse d'un livre, d'un rapport d'entreprise, d'une thèse universitaire ou d'une brochure commerciale.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-ilodata-600 mb-1">15+</div>
                <div className="text-sm text-slate-600">Années d'expérience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ilodata-600 mb-1">500+</div>
                <div className="text-sm text-slate-600">Projets réalisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-ilodata-600 mb-1">98%</div>
                <div className="text-sm text-slate-600">Clients satisfaits</div>
              </div>
            </div>
          </div>
          
          <div 
            ref={imageRef} 
            className="relative opacity-0 transform translate-x-20 transition-all duration-1000 ease-out"
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-100 rounded-lg"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-ilodata-100 rounded-lg"></div>
              <div className="glass-card overflow-hidden relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                  alt="Auteur travaillant sur son ordinateur" 
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
