
import React, { useState } from 'react';
import { ArrowDownToLine, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import { cn } from '@/lib/utils';
import TemplateDetailModal from './TemplateDetailModal';

type Template = Tables<"templates">;

interface TemplateCardProps {
  template: Template;
}

const TemplateCard = ({ template }: TemplateCardProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Prepare all image paths
  const allImages: string[] = [];
  
  // Add main image if it exists
  if (template.image_apercu) {
    allImages.push(template.image_apercu);
  }
  
  // Add extra images if they exist
  if (template.image_extras) {
    try {
      const extraImages = JSON.parse(template.image_extras);
      if (Array.isArray(extraImages)) {
        allImages.push(...extraImages);
      }
    } catch (error) {
      console.error('Error parsing image_extras:', error);
    }
  }

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
        {/* Template Image Gallery - Clickable to open modal */}
        <div 
          className="aspect-square overflow-hidden relative cursor-pointer"
          onClick={openModal}
        >
          {allImages.length > 0 ? (
            <>
              <img 
                src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${allImages[currentImageIndex]}`}
                alt={template.titre}
                className="w-full h-full object-contain p-2"
              />
              
              {allImages.length > 1 && (
                <>
                  {/* Navigation arrows */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition-colors z-10"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition-colors z-10"
                    aria-label="Image suivante"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Image indicators */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                    {allImages.map((_, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-2 h-2 rounded-full transition-all",
                          index === currentImageIndex 
                            ? "bg-white scale-125" 
                            : "bg-white/50 hover:bg-white/80"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        aria-label={`Voir l'image ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="w-full h-full bg-slate-200 flex items-center justify-center">
              <span className="text-slate-400">Pas d'aperçu</span>
            </div>
          )}
        </div>
        
        {/* Template Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold mb-2 text-slate-800">
            {template.titre}
          </h3>
          <p className="text-slate-600 mb-4 line-clamp-3 flex-grow">
            {template.description}
          </p>
          
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
              {template.categorie}
            </span>
          </div>
          
          {/* Download Button */}
          <a 
            href={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${template.fichier_template}`}
            download
            className="button-primary w-full text-center inline-flex items-center justify-center"
          >
            <span>Télécharger</span>
            <ArrowDownToLine size={16} className="ml-2" />
          </a>
        </div>
      </div>

      {/* Template Detail Modal */}
      <TemplateDetailModal 
        template={template}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TemplateCard;
