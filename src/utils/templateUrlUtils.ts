
/**
 * Utility functions for handling template URLs
 */

/**
 * Get file URL - handles both Supabase and demo files
 */
export const getFileUrl = (filePath: string) => {
  if (!filePath) return '';
  
  if (filePath.startsWith('demo-')) {
    // For demo files, we'll just return a placeholder or relative URL
    return `/downloads/${filePath}`;
  }
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${filePath}`;
};

/**
 * Get image URL - handles both Supabase and demo images
 */
export const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return null;
  
  if (imagePath.startsWith('demo-') || imagePath.startsWith('/') || imagePath.startsWith('http')) {
    return imagePath;
  }
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${imagePath}`;
};
