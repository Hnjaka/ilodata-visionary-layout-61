
import React, { useState, useEffect } from 'react';
import { ArrowDownToLine, ChevronLeft, ChevronRight } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

type Template = Tables<"templates">;

interface TemplateDetailModalProps {
  template: Template | null;
  isOpen: boolean;
  onClose: () => void;
}

const TemplateDetailModal = ({ 
  template, 
  isOpen, 
  onClose 
}: TemplateDetailModalProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [allImages, setAllImages] = useState<string[]>([]);
  
  useEffect(() => {
    if (!template) return;
    
    // Prepare all image paths
    const images: string[] = [];
    
    // Add main image if it exists
    if (template.image_apercu) {
      images.push(template.image_apercu);
    }
    
    // Add extra images if they exist
    if (template.image_extras) {
      try {
        const extraImages = JSON.parse(template.image_extras);
        if (Array.isArray(extraImages)) {
          images.push(...extraImages);
        }
      } catch (error) {
        console.error('Error parsing image_extras:', error);
      }
    }
    
    setAllImages(images);
  }, [template]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{template.titre}</DialogTitle>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Image Gallery */}
          <div className="relative overflow-hidden rounded-lg bg-slate-100">
            {allImages.length > 0 ? (
              <div className="aspect-square relative">
                <img 
                  src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${allImages[currentImageIndex]}`}
                  alt={`${template.titre} - preview ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain"
                />
                
                {allImages.length > 1 && (
                  <>
                    <button 
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50 transition-colors z-10"
                      aria-label="Image précédente"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button 
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50 transition-colors z-10"
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
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Voir l'image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="aspect-square flex items-center justify-center">
                <span className="text-slate-400">Pas d'aperçu disponible</span>
              </div>
            )}
          </div>
          
          {/* Template Details */}
          <div className="flex flex-col">
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-gray-900">{template.description || 'Pas de description disponible.'}</p>
            </div>
            
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500">Catégorie</h3>
              <div className="mt-1">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                  {template.categorie}
                </span>
              </div>
            </div>
            
            {template.tags && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Tags</h3>
                <p className="mt-1 text-gray-900">{template.tags}</p>
              </div>
            )}
            
            <div className="mt-auto pt-4">
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDetailModal;
