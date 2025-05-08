
import { generateSitemap } from './sitemapUtils';

/**
 * Fonction pour mettre à jour le sitemap
 * Cette fonction peut être appelée par un cron job ou après des actions spécifiques
 */
export async function updateSitemap() {
  try {
    console.log('Début de la mise à jour du sitemap...');
    await generateSitemap();
    console.log('Sitemap mis à jour avec succès');
    return { success: true, message: 'Sitemap mis à jour avec succès' };
  } catch (error) {
    console.error('Erreur lors de la mise à jour du sitemap:', error);
    return { success: false, message: 'Erreur lors de la mise à jour du sitemap', error };
  }
}
