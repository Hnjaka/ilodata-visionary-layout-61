
import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TestimonialProps {
  quote: string;
  author: string;
  position: string;
  image: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    quote: "J'ai essayé de faire la mise en page moi-même, mais je manquais de temps. Leur équipe a été réactive, à l'écoute, et le résultat est superbe !",
    author: "Luc",
    position: "Auteur autoédité",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    quote: "Le service de mise en page sur mesure est top. Mon livre a une présentation professionnelle sans que j'aie à m'en préoccuper.",
    author: "Pierre",
    position: "Éditeur",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  },
  {
    quote: "Les tutoriels d'ilodata m'ont permis d'apprendre à faire ma propre mise en page. Le résultat est bien meilleur que ce que j'espérais !",
    author: "Sophie",
    position: "Auteure auto-éditée",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    rating: 5
  }
];

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

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

  return (
    <section id="testimonials" className="section-padding bg-gradient-to-b from-blue-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-20 h-20 rounded-full bg-blue-100 opacity-50"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-ilodata-100 opacity-50"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-ilodata-200 opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div 
          ref={sectionRef} 
          className="fade-in-section relative max-w-4xl mx-auto"
        >
          <div className="glass-card p-8 md:p-10 relative">
            <div className="absolute -top-6 -left-6 text-ilodata-200 opacity-70">
              <Quote size={72} />
            </div>
            
            <div className={cn(
              "transition-opacity duration-500",
              isAnimating ? "opacity-0" : "opacity-100"
            )}>
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={20} 
                    className={cn(
                      "inline-block mr-1",
                      i < testimonials[activeIndex].rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    )} 
                  />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl font-medium text-slate-800 mb-8 relative z-10">
                "{testimonials[activeIndex].quote}"
              </p>
              
              <div className="flex items-center">
                <img 
                  src={testimonials[activeIndex].image} 
                  alt={testimonials[activeIndex].author}
                  className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-white shadow-sm"
                />
                <div>
                  <div className="font-semibold text-slate-800">{testimonials[activeIndex].author}</div>
                  <div className="text-slate-600 text-sm">{testimonials[activeIndex].position}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "w-3 h-3 rounded-full transition-all",
                  index === activeIndex 
                    ? "bg-ilodata-500 w-8" 
                    : "bg-slate-300 hover:bg-slate-400"
                )}
                aria-label={`Voir témoignage ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex justify-between absolute top-1/2 left-0 right-0 -translate-y-1/2 px-4">
            <button 
              onClick={prevTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:text-ilodata-600 transition-colors focus:outline-none"
              aria-label="Témoignage précédent"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextTestimonial}
              className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-slate-700 hover:text-ilodata-600 transition-colors focus:outline-none"
              aria-label="Témoignage suivant"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
