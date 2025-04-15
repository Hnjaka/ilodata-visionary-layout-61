
import React, { useState } from 'react';
import { ArrowDownToLine } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ModelCardProps {
  title: string;
  description: string;
  imageSrc: string;
  downloadLink: string;
  price: number | null;
  isFree: boolean;
  delay: string;
}

const ModelCard = ({
  title,
  description,
  imageSrc,
  downloadLink,
  price,
  isFree,
  delay
}: ModelCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Use the provided image in an array
  const images = imageSrc ? [imageSrc] : [];

  // Format price for display
  const formatPrice = (price: number | null): string => {
    if (price === null) return '';
    return `${price.toFixed(2).replace('.', ',')} €`;
  };

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700 hover:shadow-xl ${delay}`}>
        <div 
          className="aspect-square bg-gray-200 cursor-pointer" 
          onClick={() => setIsModalOpen(true)}
        >
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-contain p-2"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-gray-400">Pas d'aperçu</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center">
            <span className="text-white pb-4 font-medium text-sm">Voir les détails</span>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-slate-800">{title}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
          
          <div className="mt-4">
            <a 
              href={downloadLink} 
              className="button-primary w-full text-center inline-flex items-center justify-center"
              download
            >
              <span>{isFree ? 'Télécharger gratuitement' : `Acheter - ${formatPrice(price)}`}</span>
              <ArrowDownToLine size={16} className="ml-2" />
            </a>
          </div>
        </div>
      </div>
      
      {/* Modal for detailed view */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && setIsModalOpen(false)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <DialogDescription>
              Aperçu du modèle et informations détaillées
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Image Gallery */}
            <div className="flex flex-col gap-4">
              {/* Main Image Display */}
              <div className="relative overflow-hidden rounded-lg bg-white border border-slate-200">
                {images.length > 0 ? (
                  <AspectRatio ratio={1/1}>
                    <img 
                      src={images[currentImageIndex]} 
                      alt={`${title} - aperçu ${currentImageIndex + 1}`} 
                      className="w-full h-full object-contain p-2"
                    />
                  </AspectRatio>
                ) : (
                  <div className="aspect-square flex items-center justify-center">
                    <span className="text-slate-400">Pas d'aperçu disponible</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnails Gallery */}
              {images.length > 1 && (
                <div className="flex flex-wrap gap-2 justify-center">
                  {images.map((image, index) => (
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
                              src={image}
                              alt={`Miniature ${index + 1}`}
                              className="w-full h-full object-contain p-1"
                            />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent side="top" className="p-0 overflow-hidden bg-transparent border-0 shadow-xl">
                          <div className="bg-white p-1 rounded-md shadow-lg">
                            <img 
                              src={image}
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
                <p className="mt-1 text-gray-900">{description}</p>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Prix</h3>
                <p className="mt-1 text-gray-900 font-semibold">
                  {isFree ? 'Gratuit' : formatPrice(price)}
                </p>
              </div>
              
              <div className="mt-auto pt-4">
                <a 
                  href={downloadLink}
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
    </>
  );
};

export default ModelCard;
