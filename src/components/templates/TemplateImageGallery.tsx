
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getImageUrl } from '@/utils/templateUrlUtils';
import { getUnsplashFallback } from '@/utils/imageUtils';

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
    setCurrentImageIndex((prev) => (prev + 1) % processedImages.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + processedImages.length) % processedImages.length);
  };

  // Process images - if none available, use Unsplash fallbacks
  const processedImages = images.length > 0 
    ? images.map(img => getImageUrl(img))
    : [getUnsplashFallback('books'), getUnsplashFallback('design'), getUnsplashFallback('writing')];

  return (
    <div 
      className="aspect-square overflow-hidden relative cursor-pointer"
      onClick={onClick}
    >
      <img 
        src={processedImages[currentImageIndex] || getUnsplashFallback('books')}
        alt={title}
        className="w-full h-full object-contain p-2"
      />
      
      {processedImages.length > 1 && (
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
            {processedImages.map((_, index) => (
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
    </div>
  );
};

export default TemplateImageGallery;
