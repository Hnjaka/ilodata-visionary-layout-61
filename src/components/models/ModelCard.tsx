
import React, { useState } from 'react';
import { ArrowDownToLine, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

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
  
  // Only use the main image without any dummy images
  const images = [imageSrc];

  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Format price for display
  const formatPrice = (price: number | null): string => {
    if (price === null) return '';
    return `${price.toFixed(2).replace('.', ',')} €`;
  };

  return (
    <>
      <div className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-700 hover:shadow-xl ${delay}`}>
        <div 
          className="relative h-48 bg-gray-200 cursor-pointer" 
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
          />
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
              <div className="relative overflow-hidden rounded-lg bg-slate-100">
                <div className="aspect-square relative">
                  <img 
                    src={images[currentImageIndex]} 
                    alt={`${title} - aperçu ${currentImageIndex + 1}`} 
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              
              {/* Thumbnails - Only shown if there's more than one image */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {images.map((image, index) => (
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
                          src={image}
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
                            src={image}
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
