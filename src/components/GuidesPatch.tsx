import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, FileText, CheckCircle, 
  AlertCircle, FileQuestion, PenTool, 
  Book, Settings, Layout 
} from 'lucide-react';
import GuideItem from './guides/GuideItem';

const Guides = () => {
  // Existing component logic here

  const guides = [
    {
      icon: BookOpen,
      title: "Les fondamentaux de la mise en page",
      description: "Découvrez les principes essentiels pour créer des documents harmonieux et professionnels.",
      buttonText: "Lire l'article",
      link: "/guides/fondamentaux-mise-en-page",
      delay: "delay-100"
    },
    {
      icon: FileText,
      title: "Comment choisir la taille de police idéale",
      description: "Un guide complet pour sélectionner les polices et les tailles parfaites pour votre document.",
      buttonText: "Lire l'article",
      link: "/guides/choisir-taille-police",
      delay: "delay-200"
    },
    {
      icon: AlertCircle,
      title: "Les erreurs de mise en page à éviter",
      description: "Évitez ces pièges courants qui peuvent ruiner l'apparence professionnelle de vos documents.",
      buttonText: "Lire l'article",
      link: "/guides/erreurs-mise-en-page",
      delay: "delay-300"
    }
  ];

  return (
    <section id="guides" className="py-24 bg-blue-50">
      <div className="container mx-auto px-4">
        {/* Section title */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-ilodata-600 text-sm font-semibold px-3 py-1 rounded-full">
            GUIDES ET CONSEILS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Progressez dans la mise en page</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Des astuces, conseils et méthodes pour améliorer la qualité de vos documents et gagner en efficacité.
          </p>
        </div>

        {/* Guides grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {guides.map((guide, index) => (
            <GuideItem
              key={index}
              icon={guide.icon}
              title={guide.title}
              description={guide.description}
              buttonText={guide.buttonText}
              link={guide.link}
              delay={guide.delay}
            />
          ))}
        </div>

        {/* "See all" button */}
        <div className="text-center mt-12">
          <Link 
            to="/guides" 
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-ilodata-600 hover:bg-ilodata-700"
          >
            Tous nos guides et conseils
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Guides;
