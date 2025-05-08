
import React from 'react';
import { FileText } from 'lucide-react';
import ModelCard from './ModelCard';
import { getUnsplashFallback } from '@/utils/imageUtils';

const ModelsShowcase = () => {
  // Ensure we have reliable image URLs by using our utility
  const modelImages = {
    roman: getUnsplashFallback('books'),
    essai: getUnsplashFallback('writing'),
    illustre: getUnsplashFallback('design'),
    pratique: getUnsplashFallback('tech'),
  };

  // Get extra images for each model
  const getExtras = (category: keyof typeof modelImages, exclude: string) => {
    return Object.values(modelImages)
      .filter(img => img !== exclude)
      .slice(0, 2);
  };

  return (
    <section id="models" className="py-16 md:py-24 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6 fade-in-section is-visible">
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
            imageSrc={modelImages.roman}
            downloadLink="/downloads/modele-roman.docx"
            isFree={true}
            price={null}
            delay="delay-100"
            imageExtras={getExtras('roman', modelImages.roman)}
          />
          
          <ModelCard 
            title="Modèle Essai"
            description="Parfait pour les essais, les mémoires et les ouvrages académiques. Ce modèle propose une structure claire avec des notes de bas de page."
            imageSrc={modelImages.essai}
            downloadLink="/downloads/modele-essai-academique.docx"
            isFree={true}
            price={null}
            delay="delay-200"
            imageExtras={getExtras('essai', modelImages.essai)}
          />
          
          <ModelCard 
            title="Modèle Livre Illustré"
            description="Conçu pour les livres contenant des images, des graphiques ou des illustrations. Ce modèle gère parfaitement l'insertion d'éléments visuels."
            imageSrc={modelImages.illustre}
            downloadLink="/downloads/modele-livre-illustre.docx"
            price={9.99}
            isFree={false}
            delay="delay-300"
            imageExtras={getExtras('illustre', modelImages.illustre)}
          />
          
          <ModelCard 
            title="Modèle Guide Pratique"
            description="Adapté aux guides, manuels et livres pratiques. Ce modèle inclut des styles pour les listes, les tableaux et les encadrés."
            imageSrc={modelImages.pratique}
            downloadLink="/downloads/modele-livre-technique.docx"
            price={7.99}
            isFree={false}
            delay="delay-400"
            imageExtras={getExtras('pratique', modelImages.pratique)}
          />
        </div>
      </div>
    </section>
  );
};

export default ModelsShowcase;
