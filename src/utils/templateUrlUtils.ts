/**
 * Utility functions for handling template URLs
 */

/**
 * Get file URL - handles both Supabase and demo files
 */
export const getFileUrl = (filePath: string) => {
  if (!filePath) return '';
  
  // Handles demo files or files that already have complete URLs
  if (filePath.startsWith('demo-')) {
    return `/downloads/${filePath}`;
  }
  
  // If the path already has a complete URL, return it directly
  if (filePath.startsWith('http')) {
    return filePath;
  }
  
  // Otherwise, construct the Supabase storage URL
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_files/${filePath}`;
};

/**
 * Get image URL - handles both Supabase and demo images
 */
export const getImageUrl = (imagePath: string | null) => {
  if (!imagePath) return null;
  
  // Handle demo images or local paths
  if (imagePath.startsWith('demo-') || imagePath.startsWith('/')) {
    return imagePath;
  }
  
  // If the path already has a complete URL, return it directly
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Otherwise, construct the Supabase storage URL
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/template_images/${imagePath}`;
};
