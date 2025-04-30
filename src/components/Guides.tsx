
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Book, Video, FileText, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const GuideCard = ({ 
  icon: Icon, 
  title, 
  description, 
  buttonText, 
  link, 
  delay 
}: { 
  icon: React.ElementType;
  title: string;
  description: string;
  buttonText: string;
  link: string;
  delay: string;
}) => {
  return (
    <div className={cn(
      "glass-card p-6 md:p-8 flex flex-col h-full animate-fade-up",
      delay
    )}>
      <div className="mb-4 p-3 rounded-lg bg-blue-50 w-fit">
        <Icon className="h-6 w-6 text-ilodata-600" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      <Link 
        to={link} 
        className="group inline-flex items-center text-ilodata-600 font-medium hover:text-ilodata-700 transition-colors"
      >
        {buttonText}
        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

const Guides = () => {
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

  return (
    <section id="conseils" className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 fade-in-section"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Book className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Pas sûr de comment faire ? On vous guide pas à pas</h2>
          <p className="section-subtitle">
            Même sans expérience, vous pouvez y arriver. Nos guides illustrés vous accompagnent à chaque étape :
          </p>
          <ul className="max-w-lg mx-auto text-center text-slate-700 mt-6 space-y-2">
            <li>Adapter les styles de texte</li>
            <li>Créer un sommaire automatique</li>
            <li>Gérer la pagination</li>
            <li>Insérer une couverture</li>
            <li>Exporter pour Amazon, l'impression ou le web</li>
          </ul>
        </div>

        <div className="text-center">
          <Link 
            to="/guides" 
            className="button-primary inline-flex items-center"
          >
            Voir les guides
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Guides;
