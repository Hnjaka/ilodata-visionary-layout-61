
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/utils/templateUrlUtils';

interface TemplateImageGalleryProps {
  images: string[];
  title: string;
  onClick?: () => void;
}

const TemplateImageGallery: React.FC<TemplateImageGalleryProps> = ({ 
  images, 
  title,
  onClick 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div 
      className="aspect-square overflow-hidden relative cursor-pointer"
      onClick={onClick}
    >
      {images.length > 0 ? (
        <>
          <img 
            src={getImageUrl(images[currentImageIndex])}
            alt={title}
            className="w-full h-full object-contain p-2"
          />
          
          {images.length > 1 && (
            <>
              {/* Navigation arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition-colors z-10"
                aria-label="Image précédente"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white rounded-full p-1 hover:bg-black/50 transition-colors z-10"
                aria-label="Image suivante"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Image indicators */}
              <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "w-2 h-2 rounded-full transition-all",
                      index === currentImageIndex 
                        ? "bg-white scale-125" 
                        : "bg-white/50 hover:bg-white/80"
                    )}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImageIndex(index);
                    }}
                    aria-label={`Voir l'image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <div className="w-full h-full bg-slate-200 flex items-center justify-center">
          <span className="text-slate-400">Pas d'aperçu</span>
        </div>
      )}
    </div>
  );
};

export default TemplateImageGallery;
