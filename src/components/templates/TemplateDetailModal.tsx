
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
    
    setCurrentImageIndex(0);
    
    const images: string[] = [];
    
    if (template.image_apercu) {
      images.push(template.image_apercu);
    }
    
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

  // Function to get file URL - handles both Supabase and demo files
  const getFileUrl = (filePath: string) => {
    if (filePath.startsWith('demo-')) {
      // For demo files, we'll just return a placeholder or relative URL
      return `/downloads/${filePath}`;
    }
    return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${filePath}`;
  };

  // Function to get image URL - handles both Supabase and demo images
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null;
    
    if (imagePath.startsWith('demo-')) {
      return `/images/${imagePath}`;
    }
    return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${imagePath}`;
  };

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
        
        <div className="grid md:grid-cols-2 gap-8 mt-4">
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-lg bg-white border border-slate-200">
              {allImages.length > 0 ? (
                <div className="relative">
                  <AspectRatio ratio={4/3}>
                    <img 
                      src={getImageUrl(allImages[currentImageIndex])}
                      alt={`${template.titre} - aperçu ${currentImageIndex + 1}`}
                      className="w-full h-full object-contain p-4"
                    />
                  </AspectRatio>
                </div>
              ) : (
                <div className="aspect-video flex items-center justify-center">
                  <span className="text-slate-400">Pas d'aperçu disponible</span>
                </div>
              )}
            </div>
            
            {allImages.length > 0 && (
              <div className="flex flex-wrap gap-3 justify-center">
                {allImages.map((image, index) => (
                  <button 
                    key={index}
                    onClick={() => selectImage(index)}
                    aria-label={`Aperçu ${index + 1}`}
                    className={cn(
                      "w-24 h-24 cursor-pointer border-2 rounded overflow-hidden transition-all",
                      index === currentImageIndex 
                        ? "border-blue-500 shadow-md" 
                        : "border-transparent hover:border-blue-300"
                    )}
                  >
                    <img 
                      src={getImageUrl(image)}
                      alt={`Miniature ${index + 1}`}
                      className="w-full h-full object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
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
