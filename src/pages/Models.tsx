
import React, { useEffect, useRef } from 'react';
import { ArrowDownToLine, Book, FileText, ArrowRight, Check } from 'lucide-react';
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
  price?: string;
  isFree?: boolean;
  delay: string;
}

const ModelCard = ({ 
  title, 
  description, 
  imageSrc, 
  downloadLink, 
  price,
  isFree = false,
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
      
      <div className="mt-auto">
        {isFree ? (
          <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            <Check size={14} className="inline mr-1" />
            Gratuit
          </span>
        ) : price ? (
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            {price}
          </span>
        ) : null}
        
        <a 
          href={downloadLink} 
          className="group inline-flex items-center justify-center w-full button-primary"
          download
        >
          Télécharger
          <ArrowDownToLine size={16} className="ml-2 transition-transform group-hover:translate-y-1" />
        </a>
      </div>
    </div>
  );
};

const StepCard = ({ number, title, description }: { number: number, title: string, description: string }) => {
  return (
    <div className="flex p-6 glass-card">
      <div className="mr-4 flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-ilodata-600 text-white flex items-center justify-center font-semibold">
          {number}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-slate-800">{title}</h3>
        <p className="text-slate-600">{description}</p>
      </div>
    </div>
  );
};

const Testimonial = ({ quote, author, position, delay }: { quote: string, author: string, position: string, delay: string }) => {
  return (
    <div className={cn("glass-card p-6 h-full animate-fade-up", delay)}>
      <div className="text-4xl text-ilodata-200 mb-4">"</div>
      <p className="text-slate-700 mb-6 italic">{quote}</p>
      <div className="mt-auto">
        <p className="font-semibold text-slate-800">{author}</p>
        <p className="text-sm text-slate-600">{position}</p>
      </div>
    </div>
  );
};

const Models = () => {
  const sectionRef1 = useRef<HTMLDivElement>(null);
  const sectionRef2 = useRef<HTMLDivElement>(null);
  const sectionRef3 = useRef<HTMLDivElement>(null);
  const sectionRef4 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set document title for SEO
    document.title = "Modèles de mise en page pour livres | ilodata.com";
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Téléchargez des modèles Word gratuits et payants pour créer une mise en page de livre professionnelle. Parfait pour les auteurs indépendants et les éditeurs.');
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
              Des modèles de mise en page prêts à l'emploi pour votre livre
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-fade-down delay-200">
              Découvrez nos modèles Word faciles à utiliser, compatibles avec tous les éditeurs de texte. Téléchargez-les, personnalisez-les et créez une mise en page professionnelle en quelques clics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-down delay-300">
              <a href="#models" className="button-primary">
                Voir tous les modèles
              </a>
              <a href="#how-to-use" className="button-secondary">
                Comment utiliser nos modèles ?
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 1: Présentation des Modèles */}
      <section className="py-16 md:py-24 bg-white">
        <div 
          ref={sectionRef1} 
          className="container mx-auto px-4 md:px-6 fade-in-section"
        >
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-blue-100">
                <Book className="h-6 w-6 text-ilodata-600" />
              </div>
            </div>
            <h2 className="section-title text-center">Choisissez le modèle adapté à votre projet</h2>
            <p className="section-subtitle max-w-3xl mx-auto">
              Nos modèles de mise en page sont conçus pour répondre aux besoins des auteurs indépendants et des éditeurs. 
              Que vous créiez un roman, un essai, un guide pratique ou un livre illustré, vous trouverez le modèle qu'il vous faut.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="/images/model-showcase.jpg" 
                alt="Exemple de mise en page" 
                className="rounded-lg shadow-xl animate-fade-right"
              />
            </div>
            <div className="animate-fade-left">
              <h3 className="text-2xl font-semibold mb-4 text-slate-800">Pourquoi choisir nos modèles ?</h3>
              <ul className="space-y-4">
                <li className="flex">
                  <div className="mr-4 text-ilodata-600">
                    <Check size={24} />
                  </div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Professionnels</span> - Conçus par des experts en édition et design éditorial
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-ilodata-600">
                    <Check size={24} />
                  </div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Faciles à utiliser</span> - Remplacez simplement le texte par le vôtre
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-ilodata-600">
                    <Check size={24} />
                  </div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Personnalisables</span> - Adaptez les styles à vos besoins spécifiques
                  </p>
                </li>
                <li className="flex">
                  <div className="mr-4 text-ilodata-600">
                    <Check size={24} />
                  </div>
                  <p className="text-slate-700">
                    <span className="font-semibold">Compatibles</span> - Fonctionnent avec Word, OpenOffice, LibreOffice, etc.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section 2: Exemples de Modèles à Télécharger */}
      <section id="models" className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
        <div 
          ref={sectionRef2} 
          className="container mx-auto px-4 md:px-6 fade-in-section"
        >
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-blue-100">
                <FileText className="h-6 w-6 text-ilodata-600" />
              </div>
            </div>
            <h2 className="section-title text-center">Téléchargez nos modèles gratuits et payants</h2>
            <p className="section-subtitle">
              Explorez notre collection de modèles Word pour créer facilement la mise en page de votre livre. Il vous suffit de télécharger et de remplacer le texte par le vôtre.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <ModelCard 
              title="Modèle Roman"
              description="Idéal pour les romans et les nouvelles. Ce modèle inclut des styles prédéfinis pour les titres, les paragraphes et les dialogues."
              imageSrc="/images/model-roman.jpg"
              downloadLink="/downloads/modele-roman.docx"
              isFree={true}
              delay="delay-100"
            />
            
            <ModelCard 
              title="Modèle Essai"
              description="Parfait pour les essais, les mémoires et les ouvrages académiques. Ce modèle propose une structure claire avec des notes de bas de page."
              imageSrc="/images/model-academic.jpg"
              downloadLink="/downloads/modele-essai-academique.docx"
              isFree={true}
              delay="delay-200"
            />
            
            <ModelCard 
              title="Modèle Livre Illustré"
              description="Conçu pour les livres contenant des images, des graphiques ou des illustrations. Ce modèle gère parfaitement l'insertion d'éléments visuels."
              imageSrc="/images/model-illustrated.jpg"
              downloadLink="/downloads/modele-livre-illustre.docx"
              price="9,99 €"
              delay="delay-300"
            />
            
            <ModelCard 
              title="Modèle Guide Pratique"
              description="Adapté aux guides, manuels et livres pratiques. Ce modèle inclut des styles pour les listes, les tableaux et les encadrés."
              imageSrc="/images/model-technical.jpg"
              downloadLink="/downloads/modele-livre-technique.docx"
              price="7,99 €"
              delay="delay-400"
            />
          </div>
        </div>
      </section>
      
      {/* Section 3: Comment Utiliser les Modèles */}
      <section id="how-to-use" className="py-16 md:py-24 bg-white">
        <div 
          ref={sectionRef3} 
          className="container mx-auto px-4 md:px-6 fade-in-section"
        >
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Comment personnaliser nos modèles Word ?</h2>
            <p className="section-subtitle">
              Nos modèles sont conçus pour être simples et intuitifs. Voici comment les utiliser :
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <StepCard 
              number={1} 
              title="Téléchargez le modèle" 
              description="Choisissez et téléchargez le modèle adapté à votre projet de livre."
            />
            <StepCard 
              number={2} 
              title="Ouvrez-le dans votre éditeur" 
              description="Ouvrez-le dans Word ou tout autre éditeur de texte compatible."
            />
            <StepCard 
              number={3} 
              title="Remplacez le contenu" 
              description="Remplacez le texte existant par votre propre contenu."
            />
            <StepCard 
              number={4} 
              title="Personnalisez les styles" 
              description="Modifiez les styles (titres, paragraphes, etc.) selon vos préférences."
            />
            <StepCard 
              number={5} 
              title="Ajoutez vos images" 
              description="Insérez vos propres images, illustrations ou graphiques si nécessaire."
            />
            <StepCard 
              number={6} 
              title="Exportez en PDF" 
              description="Exportez votre fichier en PDF pour l'impression ou la publication en ligne."
            />
          </div>

          <div className="text-center">
            <Link to="/guides" className="button-primary inline-flex items-center">
              Voir le tutoriel complet
              <ArrowRight size={16} className="ml-2" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* Section 4: Témoignages */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-blue-50 to-white">
        <div 
          ref={sectionRef4} 
          className="container mx-auto px-4 md:px-6 fade-in-section"
        >
          <div className="text-center mb-16">
            <h2 className="section-title text-center">Ils ont utilisé nos modèles</h2>
            <p className="section-subtitle">
              Découvrez ce que nos clients pensent de nos modèles de mise en page
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            <Testimonial 
              quote="Le modèle Roman m'a permis de finaliser la mise en page de mon livre en un temps record. Je recommande !"
              author="Marie"
              position="Auteure indépendante"
              delay="delay-100"
            />
            <Testimonial 
              quote="Le modèle Livre Illustré est parfait pour mon projet. Les images s'intègrent facilement et le résultat est professionnel."
              author="Pierre"
              position="Éditeur"
              delay="delay-200"
            />
            <Testimonial 
              quote="Grâce au modèle Guide Pratique, j'ai pu organiser mon contenu de manière claire et attractive. Un excellent investissement !"
              author="Sophie"
              position="Coach et auteure"
              delay="delay-300"
            />
          </div>
        </div>
      </section>
      
      {/* Section 5: Appel à l'Action (CTA) */}
      <section className="py-16 bg-ilodata-600 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Vous avez besoin d'un modèle sur mesure ?</h2>
            <p className="text-xl mb-8">
              Si vous ne trouvez pas le modèle qu'il vous faut, contactez-nous pour créer un modèle personnalisé adapté à votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="px-6 py-3 rounded-full bg-white text-ilodata-600 font-medium hover:bg-blue-50 transition-colors"
              >
                Contactez-nous
              </Link>
              <Link 
                to="#services" 
                className="px-6 py-3 rounded-full bg-transparent border-2 border-white text-white font-medium hover:bg-white/10 transition-colors"
              >
                Découvrir nos services
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Models;
