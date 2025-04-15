
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
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [showZoom, setShowZoom] = useState(false);
  
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    
    // Calculate position in percentage
    const x = Math.max(0, Math.min(1, (e.clientX - left) / width));
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height));
    
    setZoomPosition({ x, y });
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
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
            {/* Main Image Display with Zoom Effect */}
            <div className="relative overflow-hidden rounded-lg bg-slate-100">
              {allImages.length > 0 ? (
                <div className="relative">
                  <AspectRatio ratio={1/1} className="bg-white">
                    <div 
                      className="w-full h-full relative"
                      onMouseMove={handleMouseMove}
                      onMouseLeave={handleMouseLeave}
                    >
                      <img 
                        src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${allImages[currentImageIndex]}`}
                        alt={`${template.titre} - aperçu ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain"
                      />
                      
                      {/* Zoom overlay */}
                      {showZoom && (
                        <div 
                          className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none overflow-hidden rounded-md bg-white/10 backdrop-blur-sm z-10"
                        >
                          <div 
                            className="absolute bg-white shadow-lg rounded-md border border-gray-200 w-40 h-40 overflow-hidden"
                            style={{
                              top: `calc(${zoomPosition.y * 100}% - 80px)`, 
                              left: `calc(${zoomPosition.x * 100}% - 80px)`,
                              zIndex: 20,
                            }}
                          >
                            <img 
                              src={`https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${allImages[currentImageIndex]}`}
                              alt={`Zoom de ${template.titre}`}
                              className="w-[200%] h-[200%] object-contain"
                              style={{ 
                                transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                                transform: 'scale(2)',
                                marginLeft: `-${zoomPosition.x * 200}%`,
                                marginTop: `-${zoomPosition.y * 200}%`
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
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
