
import React, { useState, useEffect } from 'react';
import { ArrowDownToLine, ZoomIn } from 'lucide-react';
import { Tables } from '@/integrations/supabase/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
                <div className="aspect-square relative">
                  <img 
                    src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${allImages[currentImageIndex]}`}
                    alt={`${template.titre} - aperçu ${currentImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              ) : (
                <div className="aspect-square flex items-center justify-center">
                  <span className="text-slate-400">Pas d'aperçu disponible</span>
                </div>
              )}
            </div>
            
            {/* Thumbnails - Only shown if there's more than one image */}
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image, index) => (
                  <div 
                    key={index}
                    onClick={() => selectImage(index)}
                    className={cn(
                      "relative cursor-pointer border-2 rounded overflow-hidden group transition-all",
                      index === currentImageIndex 
                        ? "border-blue-500" 
                        : "border-transparent hover:border-blue-300"
                    )}
                  >
                    {/* Thumbnail Image */}
                    <div className="w-16 h-16 overflow-hidden">
                      <img 
                        src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${image}`}
                        alt={`Miniature ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Zoom Overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity z-10">
                      <ZoomIn className="text-white" size={14} />
                    </div>
                    
                    {/* Zoom Preview (appears on hover) */}
                    <div className="hidden group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20">
                      <div className="bg-white p-1 rounded-md shadow-lg">
                        <img 
                          src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${image}`}
                          alt={`Aperçu ${index + 1}`} 
                          className="w-48 h-auto max-h-48 object-contain"
                        />
                      </div>
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-3 h-3 -mt-1.5 bg-white transform rotate-45" />
                    </div>
                  </div>
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
