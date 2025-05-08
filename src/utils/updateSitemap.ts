
import { generateSitemap } from './sitemapUtils';

// Simple function to update the sitemap
export const updateSitemap = async () => {
  try {
    await generateSitemap();
    console.log('Sitemap updated successfully');
    return true;
  } catch (error) {
    console.error('Error updating sitemap:', error);
    return false;
  }
};
