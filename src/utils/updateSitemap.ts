
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';
import fs from 'fs';
import path from 'path';

/**
 * Utilitaire pour mettre à jour automatiquement le fichier sitemap.xml
 * avec les articles du blog et des guides.
 * 
 * Note: Cet outil est conçu pour être exécuté côté serveur (Node.js)
 * et non directement dans le navigateur.
 */
export async function updateSitemap() {
  try {
    // Date du jour pour lastmod
    const today = format(new Date(), 'yyyy-MM-dd');
    
    // Récupérer tous les articles de blog publiés
    const { data: blogArticles, error: blogError } = await supabase
      .from('blog_articles')
      .select('slug')
      .eq('published', true);
      
    if (blogError) throw blogError;
    
    // Récupérer tous les articles des guides
    const { data: guideArticles, error: guideError } = await supabase
      .from('guide_articles')
      .select('slug');
      
    if (guideError) throw guideError;
    
    // Début du XML
    let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://ilodata.com/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://ilodata.com/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ilodata.com/services</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ilodata.com/guides</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://ilodata.com/articles</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://ilodata.com/contact</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
    
    // Ajouter les articles de blog
    if (blogArticles && blogArticles.length > 0) {
      sitemapContent += '\n\n  <!-- Articles de blog -->';
      
      blogArticles.forEach(article => {
        sitemapContent += `
  <url>
    <loc>https://ilodata.com/articles/${article.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }
    
    // Ajouter les articles des guides
    if (guideArticles && guideArticles.length > 0) {
      sitemapContent += '\n\n  <!-- Articles des guides -->';
      
      guideArticles.forEach(article => {
        sitemapContent += `
  <url>
    <loc>https://ilodata.com/guides/${article.slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
      });
    }
    
    // Ajouter les pages statiques supplémentaires
    sitemapContent += `
  
  <!-- Autres pages -->
  <url>
    <loc>https://ilodata.com/legal/cgu</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://ilodata.com/legal/confidentialite</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://ilodata.com/legal/mentions-legales</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.5</priority>
  </url>
  <url>
    <loc>https://ilodata.com/faq</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>`;

    // Écrire le fichier
    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemapContent);
    console.log('Sitemap mis à jour avec succès!');
    
  } catch (error) {
    console.error('Erreur lors de la mise à jour du sitemap:', error);
  }
}
