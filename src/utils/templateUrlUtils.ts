
/**
 * Utility functions for handling template URLs
 */

/**
 * Get file URL - handles both Supabase and demo files
 */
export const getFileUrl = (filePath: string) => {
  if (!filePath) return '';
  
  if (filePath.startsWith('demo-')) {
    // Pour les fichiers de démonstration, nous renvoyons une URL relative
    return `/downloads/${filePath}`;
  }
  
  // S'assurer que l'URL est correctement formée avec https://
  if (filePath.startsWith('http')) {
    return filePath;
  }
  
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${filePath}`;
};

/**
 * Get image URL - handles both Supabase and demo images
 */
export const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('demo-') || imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // S'assurer que l'URL est correctement formée avec https://
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${imagePath}`;
};
