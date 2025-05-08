
import { supabase } from '@/integrations/supabase/client';
import { promises as fs } from 'fs';
import path from 'path';

/**
 * Génère et met à jour le fichier sitemap.xml avec les pages du site et les articles/guides dynamiques
 */
export async function generateSitemap() {
  try {
    // Pages statiques du site avec leurs priorités
    const staticPages = [
      { url: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '1.0' },
      { url: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { url: '/services', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.8' },
      { url: '/guides', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.8' },
      { url: '/articles', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: '0.9' },
      { url: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: '0.7' },
    ];

    // Récupérer tous les articles de blog publiés
    const { data: blogArticles, error: blogError } = await supabase
      .from('blog_articles')
      .select('slug, published_at, updated_at')
      .eq('published', true);

    if (blogError) {
      console.error('Erreur lors de la récupération des articles de blog:', blogError);
      throw blogError;
    }

    // Récupérer tous les articles de guides
    const { data: guideArticles, error: guideError } = await supabase
      .from('guide_articles')
      .select('slug, updated_at');

    if (guideError) {
      console.error('Erreur lors de la récupération des guides:', guideError);
      throw guideError;
    }

    // Créer les entrées pour les articles de blog
    const blogEntries = (blogArticles || []).map(article => ({
      url: `/articles/${article.slug}`,
      lastmod: (article.updated_at || article.published_at || new Date()).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    }));

    // Créer les entrées pour les guides
    const guideEntries = (guideArticles || []).map(guide => ({
      url: `/guides/${guide.slug}`,
      lastmod: (guide.updated_at || new Date()).toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: '0.7'
    }));

    // Combiner toutes les pages pour le sitemap
    const allPages = [...staticPages, ...blogEntries, ...guideEntries];

    // Générer le contenu XML du sitemap
    const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>https://ilodata.com${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

    // Écrire le fichier sitemap.xml
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');
    await fs.writeFile(sitemapPath, sitemapContent, 'utf-8');
    
    console.log('Sitemap mis à jour avec succès');
    
    return sitemapContent;
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    throw error;
  }
}
