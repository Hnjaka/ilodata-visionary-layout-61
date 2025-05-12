
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
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { getImageWithFallback } from '@/utils/imageUtils';

interface ModelCardProps {
  title: string;
  description: string;
  imageSrc: string;
  downloadLink: string;
  price: number | null;
  isFree: boolean;
  delay: string;
  imageExtras?: string[];
}

const ModelCard = ({
  title,
  description,
  imageSrc,
  downloadLink,
  price,
  isFree,
  delay,
  imageExtras = []
}: ModelCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  // Get image with fallback
  const mainImage = getImageWithFallback(imageSrc, 'books');
  
  // Process extra images with fallbacks
  const processedExtras = imageExtras.map(img => getImageWithFallback(img, 'books'));
  
  const images = [mainImage, ...processedExtras];

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
          className="aspect-video bg-gray-100 cursor-pointer relative" 
          onClick={() => setIsModalOpen(true)}
        >
          <img 
            src={mainImage} 
            alt={title} 
            className="w-full h-full object-contain"
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
      
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && setIsModalOpen(false)}>
        <DialogContent className="sm:max-w-[1200px] w-[90vw] h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <DialogDescription>
              Aperçu du modèle et informations détaillées
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-12 gap-8 mt-4">
            {/* Main preview - Takes up 8 columns */}
            <div className="col-span-8 relative overflow-hidden rounded-lg bg-gray-100 border border-slate-200">
              <div className="w-full h-full flex items-start justify-center">
                <AspectRatio ratio={3/2} className="w-full">
                  <div className="w-full h-full flex items-center justify-center">
                    <img 
                      src={images[currentImageIndex]} 
                      alt={`${title} - aperçu ${currentImageIndex + 1}`} 
                      className="w-full h-full object-contain scale-130"
                    />
                  </div>
                </AspectRatio>
              </div>
            </div>
            
            {/* Thumbnails - Takes up 1 column in the middle */}
            {images.length > 1 && (
              <div className="col-span-1">
                <div className="flex flex-col gap-2 h-full">
                  {images.map((image, index) => (
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
                        src={image}
                        alt={`Miniature ${index + 1}`}
                        className="w-full h-full object-contain p-1"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Model info - Takes up 3 columns on the right */}
            <div className={`flex flex-col ${images.length > 1 ? 'col-span-3' : 'col-span-4'}`}>
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
                  <span>{isFree ? 'Télécharger gratuitement' : `Acheter - ${formatPrice(price)}`}</span>
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
