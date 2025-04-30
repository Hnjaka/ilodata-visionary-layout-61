
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layout, FileText, BookOpen, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  buttonText: string;
  link: string;
  delay: string;
}

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features,
  buttonText, 
  link, 
  delay 
}: ServiceCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 md:p-8 flex flex-col h-full animate-fade-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      delay
    )}>
      <div className="mb-5 p-3 rounded-lg bg-blue-50 w-fit">
        <Icon className="h-6 w-6 text-ilodata-600" />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-5">{description}</p>
      
      <ul className="mb-6 space-y-2 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2 text-ilodata-500 mt-1">•</span>
            <span className="text-slate-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Link 
        to={link} 
        className="group inline-flex items-center justify-center w-full button-primary"
      >
        {buttonText}
        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </Link>
    </div>
  );
};

const Services = () => {
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
    <section id="services" className="section-padding bg-gradient-to-b from-blue-50 to-white">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 fade-in-section"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <Layout className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Confiez-nous votre mise en page, nous nous occupons de tout</h2>
          <p className="section-subtitle">
            Pas le temps ou besoin d'un rendu irréprochable ? Notre équipe professionnelle réalise la mise en page de votre livre selon les normes techniques des plateformes d'édition et d'impression.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <ServiceCard 
            icon={FileText}
            title="PDF prêt pour l'impression"
            description="Un document parfaitement formaté pour une impression professionnelle."
            features={[
              "Format adapté à votre imprimeur",
              "Marges et fond perdu ajustés",
              "Résolution optimale des images",
              "Polices incorporées"
            ]}
            buttonText="Découvrir nos services"
            link="/services"
            delay="delay-100"
          />
          
          <ServiceCard 
            icon={BookOpen}
            title="Fichier conforme à Amazon KDP"
            description="Un fichier 100% compatible avec les exigences d'Amazon pour l'auto-édition."
            features={[
              "Dimensions respectées",
              "Table des matières interactive",
              "Métadonnées complètes",
              "Vérification de conformité"
            ]}
            buttonText="Découvrir nos services"
            link="/services"
            delay="delay-200"
          />
          
          <ServiceCard 
            icon={Layout}
            title="Version numérique interactive"
            description="Un ebook ou PDF interactif optimisé pour une lecture sur écran."
            features={[
              "Format ePub ou PDF interactif",
              "Liens et sommaire cliquables",
              "Compatible tous appareils",
              "Optimisé pour le confort de lecture"
            ]}
            buttonText="Demander un devis"
            link="/contact"
            delay="delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
