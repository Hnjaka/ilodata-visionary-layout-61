
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
          <h2 className="section-title text-center">Conseils et Guides pour réussir votre mise en page</h2>
          <p className="section-subtitle">
            Explorez notre collection de ressources pour parfaire vos compétences en mise en page et création de documents.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <GuideCard 
            icon={Book}
            title="Modèles de livre"
            description="Découvrez nos modèles de mise en page sous Word, faciles à utiliser et compatibles avec tous les éditeurs de texte. Remplacez simplement le texte existant par le vôtre et obtenez un résultat professionnel en quelques clics."
            buttonText="Voir les modèles"
            link="/modeles"
            delay="delay-100"
          />
          
          <GuideCard 
            icon={Video}
            title="Tutoriels et vidéos"
            description="Apprenez à maîtriser la mise en page de livre grâce à nos tutoriels pas à pas et nos vidéos explicatives. Parfait pour les auteurs qui souhaitent tout faire eux-mêmes."
            buttonText="Accéder aux tutoriels"
            link="/guides"
            delay="delay-200"
          />
          
          <GuideCard 
            icon={FileText}
            title="Articles et conseils"
            description="Consultez nos articles pour des astuces et des conseils pratiques sur la mise en page, l'auto-édition et bien plus encore."
            buttonText="Lire les articles"
            link="/guides"
            delay="delay-300"
          />
        </div>
      </div>
    </section>
  );
};

export default Guides;
