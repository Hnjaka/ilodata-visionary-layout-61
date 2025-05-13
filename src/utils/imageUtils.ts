// This file contains utility functions for image handling

/**
 * Unsplash image categories for fallback images
 */
export const unsplashImages = {
  general: "https://images.unsplash.com/photo-1532012197267-da84d127e765",
  books: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6",
  tech: "https://images.unsplash.com/photo-1550745165-9bc0b252726f",
  design: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  writing: "https://images.unsplash.com/photo-1455390582262-044cdead277a"
};

/**
 * Returns the image URL with a fallback if the main image is null/undefined
 * @param imageUrl The primary image URL
 * @param category The category for fallback image selection
 * @returns A valid image URL
 */
export const getImageWithFallback = (imageUrl: string | null | undefined, category: keyof typeof unsplashImages = "general"): string => {
  if (!imageUrl) {
    return `${unsplashImages[category]}?auto=format&fit=crop&w=1200&q=80`;
  }

  // If the image URL includes "http", it's likely an external URL
  if (imageUrl.includes("http")) {
    return imageUrl;
  }

  // Otherwise, it's a Supabase storage URL
  return `https://valzxjecoceltiyzkogw.supabase.co/storage/v1/object/public/blog_images/${imageUrl}`;
};

/**
 * Creates a placeholder image URL with specific dimensions and text
 * @param width Width of the placeholder image
 * @param height Height of the placeholder image
 * @param text Text to display on the placeholder
 * @returns Placeholder image URL
 */
export const getPlaceholderImage = (width = 800, height = 600, text = "Image placée ici"): string => {
  return `https://via.placeholder.com/${width}x${height}.png?text=${encodeURIComponent(text)}`;
};
