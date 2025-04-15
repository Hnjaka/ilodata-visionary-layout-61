
import React, { useState, useEffect } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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
    
    // Reset current image index when template changes
    setCurrentImageIndex(0);
    
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
    
    console.log('Template images loaded:', images);
    setAllImages(images);
  }, [template]);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{template.titre}</DialogTitle>
          <DialogDescription>
            Aperçu du modèle et informations détaillées
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            {/* Main Image Display */}
            <div className="relative overflow-hidden rounded-lg bg-slate-100">
              {allImages.length > 0 ? (
                <div className="relative">
                  <AspectRatio ratio={1/1} className="bg-white">
                    <img 
                      src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${allImages[currentImageIndex]}`}
                      alt={`${template.titre} - aperçu ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center">
                  <span className="text-slate-400">Pas d'aperçu disponible</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails Gallery */}
            {allImages.length > 0 && (
              <div className="flex flex-wrap gap-2 justify-center">
                {allImages.map((image, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <button 
                          onClick={() => selectImage(index)}
                          aria-label={`Aperçu ${index + 1}`}
                          className={cn(
                            "w-16 h-16 cursor-pointer border-2 rounded overflow-hidden transition-all",
                            index === currentImageIndex 
                              ? "border-blue-500 shadow-md" 
                              : "border-transparent hover:border-blue-300"
                          )}
                        >
                          <img 
                            src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${image}`}
                            alt={`Miniature ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="p-0 overflow-hidden bg-transparent border-0 shadow-xl">
                        <div className="bg-white p-1 rounded-md shadow-lg">
                          <img 
                            src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${image}`}
                            alt={`Aperçu ${index + 1}`} 
                            className="w-60 h-auto max-h-60 object-contain rounded"
                          />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
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
