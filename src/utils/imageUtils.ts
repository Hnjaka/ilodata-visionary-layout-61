
/**
 * Utility functions for handling images and providing Unsplash fallbacks
 */

// Collection of Unsplash images categorized by theme
const unsplashImages = {
  // General purpose images
  general: [
    'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  ],
  // Book and publishing related images
  books: [
    'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1476081718509-d5d0b661a376?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1589998059171-988d887df646?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  ],
  // Tech and digital content images
  tech: [
    'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  ],
  // Design and creative process images
  design: [
    'https://images.unsplash.com/photo-1497091071254-cc9b2ba7c48a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80',
    'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'
  ],
  // Writing and content creation images
  writing: [
    'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80',
    'https://images.unsplash.com/photo-1518655048521-f130df041f66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1471107340929-a87cd0f5b5f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80',
    'https://images.unsplash.com/photo-1516414447565-b14be0adf13e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1173&q=80'
  ]
};

/**
 * Get a fallback image URL from Unsplash based on category
 * @param category The category of image to fetch ('general', 'books', 'tech', 'design', 'writing')
 * @returns URL of a random image from the specified category
 */
export const getUnsplashFallbackImage = (category: keyof typeof unsplashImages = 'general'): string => {
  const images = unsplashImages[category];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};

/**
 * Get an image URL, with fallback to Unsplash if the original is missing
 * @param imageUrl The original image URL
 * @param category The category of fallback image if needed
 * @returns A valid image URL
 */
export const getImageWithFallback = (imageUrl: string | null | undefined, category: keyof typeof unsplashImages = 'general'): string => {
  if (imageUrl) return imageUrl;
  return getUnsplashFallback(category);
};

/**
 * Get an array of Unsplash images for a specific category
 * @param category The category of images to fetch
 * @param count Number of images to return
 * @returns Array of image URLs
 */
export const getUnsplashImageArray = (category: keyof typeof unsplashImages = 'general', count: number = 3): string[] => {
  const images = [...unsplashImages[category]];
  
  // If we need more images than available in the category, we'll repeat some
  if (count > images.length) {
    while (images.length < count) {
      images.push(...unsplashImages[category]);
    }
  }
  
  // Shuffle the array
  for (let i = images.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [images[i], images[j]] = [images[j], images[i]];
  }
  
  return images.slice(0, count);
};

/**
 * Get a random Unsplash image from a specific category
 * @param category The category of image to fetch
 * @returns URL of a random image from the specified category
 */
export const getUnsplashFallback = (category: keyof typeof unsplashImages = 'general'): string => {
  const images = unsplashImages[category];
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
