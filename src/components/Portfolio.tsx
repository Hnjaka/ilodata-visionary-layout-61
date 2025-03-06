
import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Roman contemporain",
    description: "Mise en page d'un roman avec chapitres illustrés",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
  },
  {
    id: 2,
    title: "Livre de cuisine gastronomique",
    description: "Design éditorial pour recettes et photographies",
    image: "https://images.unsplash.com/photo-1583468813759-aa7122f15f2f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80"
  },
  {
    id: 3,
    title: "Manuel pédagogique",
    description: "Mise en page pour un ouvrage éducatif",
    image: "https://images.unsplash.com/photo-1529473814998-077b4fec6770?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 4,
    title: "Livre d'art photographique",
    description: "Mise en valeur de photographies en grand format",
    image: "https://images.unsplash.com/photo-1495465798138-718f86d1a4bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 5,
    title: "Guide de voyage illustré",
    description: "Design éditorial combinant textes et images",
    image: "https://images.unsplash.com/photo-1519074069565-f03a771f2cf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
  }
];

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
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
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setDragActive(true);
    if ('touches' in e) {
      setDragStart(e.touches[0].clientX);
    } else {
      setDragStart(e.clientX);
    }
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!dragActive) return;
    
    let currentPoint = 0;
    if ('touches' in e) {
      currentPoint = e.touches[0].clientX;
    } else {
      currentPoint = e.clientX;
    }
    
    const diff = dragStart - currentPoint;
    if (Math.abs(diff) > 50) {
      if (diff > 0 && activeIndex < portfolioItems.length - 1) {
        setActiveIndex(activeIndex + 1);
      } else if (diff < 0 && activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      }
      setDragActive(false);
    }
  };

  const handleDragEnd = () => {
    setDragActive(false);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => 
      prev === portfolioItems.length - 1 ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex((prev) => 
      prev === 0 ? portfolioItems.length - 1 : prev - 1
    );
  };

  return (
    <section id="portfolio" className="section-padding bg-white">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 fade-in-section"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Image className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Nos réalisations</h2>
          <p className="section-subtitle">
            Découvrez quelques-uns des projets que nous avons accompagnés, de la mise en page à la publication finale.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div 
            ref={carouselRef}
            className="overflow-hidden rounded-xl glass-card p-4 relative"
            onMouseDown={handleDragStart}
            onMouseMove={handleDragMove}
            onMouseUp={handleDragEnd}
            onMouseLeave={handleDragEnd}
            onTouchStart={handleDragStart}
            onTouchMove={handleDragMove}
            onTouchEnd={handleDragEnd}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {portfolioItems.map((item) => (
                <div key={item.id} className="min-w-full px-4">
                  <div className="bg-white rounded-lg overflow-hidden shadow-md">
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-xl font-semibold mb-2 text-slate-800">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-700 hover:text-ilodata-600 transition-colors focus:outline-none z-10"
              aria-label="Réalisation précédente"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-lg flex items-center justify-center text-slate-700 hover:text-ilodata-600 transition-colors focus:outline-none z-10"
              aria-label="Réalisation suivante"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {portfolioItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  index === activeIndex 
                    ? "bg-ilodata-500 w-8" 
                    : "bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Voir réalisation ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
