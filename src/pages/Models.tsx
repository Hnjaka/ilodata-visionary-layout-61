
import React, { useEffect, useRef } from 'react';
import { ArrowDownToLine, Book, FileText, ArrowRight } from 'lucide-react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface ModelCardProps {
  title: string;
  description: string;
  imageSrc: string;
  downloadLink: string;
  delay: string;
}

const ModelCard = ({ 
  title, 
  description, 
  imageSrc, 
  downloadLink, 
  delay 
}: ModelCardProps) => {
  return (
    <div className={cn(
      "glass-card p-6 md:p-8 flex flex-col h-full animate-fade-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
      delay
    )}>
      <div className="mb-6 overflow-hidden rounded-lg h-48">
        <img 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      
      <a 
        href={downloadLink} 
        className="group inline-flex items-center justify-center w-full button-primary"
        download
      >
        Télécharger
        <ArrowDownToLine size={16} className="ml-2 transition-transform group-hover:translate-y-1" />
      </a>
    </div>
  );
};

const Models = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set document title for SEO
    document.title = "Modèles de mise en page de livre | ilodata.com";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Téléchargez nos modèles de mise en page pour créer des livres professionnels. Des templates prêts à l\'emploi pour auteurs et éditeurs.');
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 bg-gradient-to-b from-blue-900 to-blue-800">
        <div className="absolute inset-0 bg-pattern-overlay opacity-10"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 animate-fade-down">
              <span className="px-3 py-1 rounded-full bg-blue-50 text-ilodata-600 text-sm font-medium border border-blue-100">
                Modèles prêts à l'emploi
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white animate-fade-down delay-100">
              Téléchargez nos modèles de mise en page
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-fade-down delay-200">
              Des templates professionnels pour réaliser vous-même la mise en page de votre livre.
            </p>
          </div>
        </div>
      </section>
      
      {/* Main Content */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
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
            <h2 className="section-title text-center">Nos modèles de livre téléchargeables</h2>
            <p className="section-subtitle">
              Explorez notre collection de modèles Word pour créer facilement la mise en page de votre livre. Il vous suffit de télécharger et de remplacer le texte par le vôtre.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <ModelCard 
              title="Modèle Roman"
              description="Parfait pour les romans et récits de fiction. Mise en page élégante avec chapitres numérotés, en-têtes et pieds de page professionnels."
              imageSrc="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              downloadLink="/downloads/modele-roman.docx"
              delay="delay-100"
            />
            
            <ModelCard 
              title="Modèle Essai Académique"
              description="Idéal pour les ouvrages universitaires et académiques. Inclut des styles pour citations, notes de bas de page et bibliographie."
              imageSrc="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              downloadLink="/downloads/modele-essai-academique.docx"
              delay="delay-200"
            />
            
            <ModelCard 
              title="Modèle Livre Illustré"
              description="Conçu pour les livres avec images et illustrations. Mise en page adaptée avec espaces pour légendes et positionnement optimal des images."
              imageSrc="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              downloadLink="/downloads/modele-livre-illustre.docx"
              delay="delay-300"
            />
            
            <ModelCard 
              title="Modèle Livre Technique"
              description="Optimisé pour les manuels techniques et guides pratiques. Inclut des styles pour encadrés, listes à puces et tableaux."
              imageSrc="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              downloadLink="/downloads/modele-livre-technique.docx"
              delay="delay-100"
            />
            
            <ModelCard 
              title="Modèle Poésie"
              description="Spécialement conçu pour les recueils de poésie. Mise en page épurée avec une attention particulière aux espaces et à la typographie."
              imageSrc="https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              downloadLink="/downloads/modele-poesie.docx"
              delay="delay-200"
            />
            
            <ModelCard 
              title="Modèle Livre de Cuisine"
              description="Parfait pour les livres de recettes. Inclut des sections pour ingrédients, étapes, temps de préparation et de cuisson."
              imageSrc="https://images.unsplash.com/photo-1556909114-44e3ef2efe0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              downloadLink="/downloads/modele-livre-cuisine.docx"
              delay="delay-300"
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-ilodata-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Besoin d'aide pour votre mise en page ?</h2>
            <p className="text-xl mb-8">
              Découvrez nos guides et tutoriels pour apprendre à personnaliser vos modèles et créer une mise en page professionnelle.
            </p>
            <Link 
              to="/guides" 
              className="inline-flex items-center px-6 py-3 rounded-full bg-white text-ilodata-600 font-medium hover:bg-blue-50 transition-colors"
            >
              Consulter nos guides
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Models;
