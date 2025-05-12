
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getFileUrl, getImageUrl } from '@/utils/templateUrlUtils';
import { useTemplateImages } from '@/hooks/templates/useTemplateImages';

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
  const allImages = template ? useTemplateImages(template) : [];
  
  useEffect(() => {
    if (template) {
      // Reset to first image when template changes
      setCurrentImageIndex(0);
      console.log('Template images loaded:', allImages);
    }
  }, [template, allImages]);

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (!template) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[1200px] w-[90vw] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{template.titre}</DialogTitle>
          <DialogDescription>
            Aperçu du modèle et informations détaillées
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-12 gap-8 mt-4">
          {/* Main preview - Takes up 8 columns */}
          <div className="col-span-8 relative overflow-hidden rounded-lg bg-gray-100 border border-slate-200">
            {allImages.length > 0 ? (
              <div className="relative w-full h-full flex items-start justify-center">
                <AspectRatio ratio={3/2} className="w-full">
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={getImageUrl(allImages[currentImageIndex])}
                      alt={`${template.titre} - aperçu ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain scale-130"
                    />
                  </div>
                </AspectRatio>
              </div>
            ) : (
              <div className="aspect-video flex items-center justify-center">
                <span className="text-slate-400">Pas d'aperçu disponible</span>
              </div>
            )}
          </div>
          
          {/* Thumbnails - Takes up 1 column in the middle */}
          {allImages.length > 1 && (
            <div className="col-span-1">
              <div className="flex flex-col gap-2 h-full">
                {allImages.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => selectImage(index)}
                    aria-label={`Aperçu ${index + 1}`}
                    className={cn(
                      "w-14 h-14 cursor-pointer border-2 rounded overflow-hidden transition-all bg-white",
                      index === currentImageIndex 
                        ? "border-blue-500 shadow-md" 
                        : "border-transparent hover:border-blue-300"
                    )}
                  >
                    <img 
                      src={getImageUrl(image)}
                      alt={`Miniature ${index + 1}`}
                      className="w-full h-full object-contain p-1"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Template info - Takes up 3 columns on the right */}
          <div className={`flex flex-col ${allImages.length > 1 ? 'col-span-3' : 'col-span-4'}`}>
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
              {template.fichier_template && (
                <a 
                  href={getFileUrl(template.fichier_template)}
                  download
                  className="button-primary w-full text-center inline-flex items-center justify-center"
                >
                  <span>Télécharger</span>
                  <ArrowDownToLine size={16} className="ml-2" />
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TemplateDetailModal;
