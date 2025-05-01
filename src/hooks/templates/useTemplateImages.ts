
import { useMemo } from 'react';
import { Tables } from '@/integrations/supabase/types';

type Template = Tables<"templates">;

/**
 * Custom hook to extract and prepare all template images
 */
export const useTemplateImages = (template: Template) => {
  const allImages = useMemo(() => {
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
    
    return images;
  }, [template.image_apercu, template.image_extras]);

  return allImages;
};
