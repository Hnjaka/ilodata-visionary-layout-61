
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Layout, FileText, PenTool, ArrowRight } from 'lucide-react';
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
          <h2 className="section-title text-center">Nos Services</h2>
          <p className="section-subtitle">
            Des solutions professionnelles pour tous vos besoins en matière de mise en page et de conception de documents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <ServiceCard 
            icon={Layout}
            title="Mise en page professionnelle"
            description="Transformez vos manuscrits en documents mis en page selon les standards professionnels de l'édition."
            features={[
              "Mise en page selon les normes éditoriales",
              "Typographie soignée et optimisée pour la lecture",
              "Structure cohérente de chapitres et sections",
              "Format adapté pour impression et digital"
            ]}
            buttonText="En savoir plus"
            link="/services/mise-en-page"
            delay="delay-100"
          />
          
          <ServiceCard 
            icon={FileText}
            title="Correction et révision"
            description="Perfectionnez vos textes grâce à nos services de correction et de révision linguistique."
            features={[
              "Correction orthographique et grammaticale",
              "Révision stylistique et syntaxique",
              "Uniformisation et cohérence du texte",
              "Respect des règles typographiques"
            ]}
            buttonText="En savoir plus"
            link="/services/correction"
            delay="delay-200"
          />
          
          <ServiceCard 
            icon={PenTool}
            title="Design graphique"
            description="Embellissez vos documents avec des éléments graphiques professionnels et une identité visuelle cohérente."
            features={[
              "Création de couvertures personnalisées",
              "Design d'éléments graphiques intérieurs",
              "Illustrations et infographies sur mesure",
              "Identité visuelle cohérente"
            ]}
            buttonText="En savoir plus"
            link="/services/design"
            delay="delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Services;
