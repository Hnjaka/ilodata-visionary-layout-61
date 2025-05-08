
import { supabase } from '@/integrations/supabase/client';

/**
 * Génère et met à jour le contenu du sitemap.xml
 * Au lieu d'écrire dans un fichier (ce qui n'est pas possible dans un navigateur),
 * on stocke le contenu dans une variable qui peut être rendue dans une page spéciale
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
      lastmod: ((article.updated_at || article.published_at) ? 
                new Date(article.updated_at || article.published_at).toISOString().split('T')[0] : 
                new Date().toISOString().split('T')[0]),
      changefreq: 'monthly',
      priority: '0.7'
    }));

    // Créer les entrées pour les guides
    const guideEntries = (guideArticles || []).map(guide => ({
      url: `/guides/${guide.slug}`,
      lastmod: (guide.updated_at ? 
                new Date(guide.updated_at).toISOString().split('T')[0] : 
                new Date().toISOString().split('T')[0]),
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

    // Stocker le contenu du sitemap dans la base de données pour référence future
    try {
      // Try to create or update the site_config table first
      const { error: tableError } = await supabase.rpc('create_site_config_if_not_exists');
      
      if (tableError) {
        console.warn('Warning: Could not create site_config table:', tableError);
        // Continue anyway, we'll attempt to store the sitemap content
      }
      
      // Try to store the sitemap content using a raw SQL query
      const { error: saveError } = await supabase.rpc('update_sitemap', {
        sitemap_content: sitemapContent,
        updated_timestamp: new Date().toISOString()
      });

      if (saveError) {
        console.error("Erreur lors de l'enregistrement du sitemap:", saveError);
        console.log('La mise à jour du sitemap dans la base de données a échoué, mais le contenu a été généré');
      }
    } catch (dbError) {
      console.error('Erreur de base de données:', dbError);
      // Continue execution as we can still return the generated sitemap
    }
    
    console.log('Sitemap mis à jour avec succès');
    
    return sitemapContent;
  } catch (error) {
    console.error('Erreur lors de la génération du sitemap:', error);
    throw error;
  }
}

// Fonction pour récupérer le contenu du sitemap depuis la base de données
export async function getSitemapContent() {
  try {
    try {
      const { data, error } = await supabase.rpc('get_sitemap_content');
      
      if (error) {
        console.error('Erreur lors de la récupération du sitemap:', error);
        return null;
      }
      
      return data || null;
    } catch (e) {
      console.error('Erreur lors de la récupération du sitemap:', e);
      return null;
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du sitemap:', error);
    return null;
  }
}
