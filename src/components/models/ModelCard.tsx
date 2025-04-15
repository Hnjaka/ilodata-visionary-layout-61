
import React, { useState } from 'react';
import { ArrowDownToLine, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ModelCardProps {
  title: string;
  description: string;
  imageSrc: string;
  downloadLink: string;
  price?: string;
  isFree?: boolean;
  delay: string;
}

const ModelCard = ({
  title,
  description,
  imageSrc,
  downloadLink,
  price,
  isFree = false,
  delay
}: ModelCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Pour gérer plusieurs images dans le futur
  const [images, setImages] = useState<string[]>(() => {
    // Pour l'instant, nous n'avons qu'une seule image
    return [imageSrc];
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  return (
    <>
      <div className={cn(
        "glass-card p-6 md:p-8 flex flex-col h-full animate-fade-up transition-all duration-300 hover:shadow-xl hover:-translate-y-1",
        delay
      )}>
        <div 
          className="mb-6 overflow-hidden rounded-lg h-48 cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={imageSrc}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h3 className="text-xl font-semibold mb-3 text-slate-800">{title}</h3>
        <p className="text-slate-600 mb-6 flex-grow">{description}</p>
        
        <div className="mt-auto">
          {isFree ? (
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
              <Check size={14} className="inline mr-1" />
              Gratuit
            </span>
          ) : price ? (
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              {price}
            </span>
          ) : null}
          
          <a 
            href={downloadLink} 
            className="group inline-flex items-center justify-center w-full button-primary"
            download
          >
            Télécharger
            <ArrowDownToLine size={16} className="ml-2 transition-transform group-hover:translate-y-1" />
          </a>
        </div>
      </div>
      
      {/* Model Detail Modal */}
      <Dialog open={isModalOpen} onOpenChange={(open) => setIsModalOpen(open)}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
          </DialogHeader>
          
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            {/* Image */}
            <div className="overflow-hidden rounded-lg bg-slate-100 relative">
              <div className="aspect-square">
                <img 
                  src={images[currentImageIndex]}
                  alt={title}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {images.length > 1 && (
                <>
                  {/* Boutons de navigation */}
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50 transition-colors"
                    aria-label="Image précédente"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1.5 hover:bg-black/50 transition-colors"
                    aria-label="Image suivante"
                  >
                    <ChevronRight size={20} />
                  </button>
                  
                  {/* Indicateurs d'image */}
                  <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5">
                    {images.map((_, index) => (
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
            
            {/* Details */}
            <div className="flex flex-col">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500">Description</h3>
                <p className="mt-1 text-gray-900">{description}</p>
              </div>
              
              <div className="mb-4">
                {isFree ? (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <Check size={14} className="inline mr-1" />
                    Gratuit
                  </span>
                ) : price ? (
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {price}
                  </span>
                ) : null}
              </div>
              
              <div className="mt-auto pt-4">
                <a 
                  href={downloadLink} 
                  className="button-primary w-full text-center inline-flex items-center justify-center"
                  download
                >
                  Télécharger
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
