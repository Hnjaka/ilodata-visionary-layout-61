
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getIconByName } from '@/data/guidesData';
import { CategoryType, ArticleType } from '@/types/guides';

export const useGuidesData = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch categories and articles from Supabase
  useEffect(() => {
    const fetchCategoriesAndArticles = async () => {
      setLoading(true);
      try {
        // Fetch categories
        const { data: categoriesData, error: categoriesError } = await supabase
          .from('guide_categories')
          .select('*')
          .order('position');
          
        if (categoriesError) throw categoriesError;
        
        // Fetch articles for each category
        const categoriesWithArticles = await Promise.all(
          (categoriesData || []).map(async (category) => {
            try {
              const { data: articlesData, error: articlesError } = await supabase
                .from('guide_articles')
                .select('*')
                .eq('category_id', category.id)
                .order('position');
                
              if (articlesError) throw articlesError;
              
              // Map the icon string to the actual icon component
              const iconComponent = getIconByName(category.icon);
              
              // Format articles to match ArticleType
              const formattedArticles: ArticleType[] = (articlesData || []).map(article => ({
                id: article.id,
                title: article.title || '',
                slug: article.slug || '',
                content: article.content || '',
                layout: (article.layout || 'standard') as 'standard' | 'wide' | 'sidebar',
                position: article.position || 0,
                category_id: article.category_id
              }));
              
              return {
                id: category.id,
                title: category.title || '',
                icon: iconComponent,
                articles: formattedArticles,
                position: category.position || 0
              };
            } catch (error) {
              console.error(`Error fetching articles for category ${category.id}:`, error);
              return {
                id: category.id,
                title: category.title || '',
                icon: getIconByName(category.icon),
                articles: [],
                position: category.position || 0
              };
            }
          })
        );
        
        setCategories(categoriesWithArticles);
      } catch (error) {
        console.error('Error fetching categories and articles:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors du chargement des données",
          variant: "destructive"
        });
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndArticles();

    // We're removing the real-time subscriptions to prevent automatic page refreshes
    // Manual refresh will now be required when data changes
  }, []);

  // Add a manual refresh function
  const refreshData = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('guide_categories')
        .select('*')
        .order('position');
        
      if (categoriesError) throw categoriesError;
      
      // Fetch articles for each category
      const categoriesWithArticles = await Promise.all(
        (categoriesData || []).map(async (category) => {
          try {
            const { data: articlesData, error: articlesError } = await supabase
              .from('guide_articles')
              .select('*')
              .eq('category_id', category.id)
              .order('position');
              
            if (articlesError) throw articlesError;
            
            // Map the icon string to the actual icon component
            const iconComponent = getIconByName(category.icon);
            
            // Format articles to match ArticleType
            const formattedArticles: ArticleType[] = (articlesData || []).map(article => ({
              id: article.id,
              title: article.title || '',
              slug: article.slug || '',
              content: article.content || '',
              layout: (article.layout || 'standard') as 'standard' | 'wide' | 'sidebar',
              position: article.position || 0,
              category_id: article.category_id
            }));
            
            return {
              id: category.id,
              title: category.title || '',
              icon: iconComponent,
              articles: formattedArticles,
              position: category.position || 0
            };
          } catch (error) {
            console.error(`Error fetching articles for category ${category.id}:`, error);
            return {
              id: category.id,
              title: category.title || '',
              icon: getIconByName(category.icon),
              articles: [],
              position: category.position || 0
            };
          }
        })
      );
      
      setCategories(categoriesWithArticles);
      
      // Tentative de mise à jour du sitemap
      try {
        const { default: { generateSitemap } } = await import('@/utils/sitemapUtils');
        await generateSitemap();
      } catch (sitemapError) {
        console.error("Erreur lors de la mise à jour du sitemap:", sitemapError);
        // Ne pas bloquer la fonction principale si la mise à jour du sitemap échoue
      }
    } catch (error) {
      console.error('Error refreshing categories and articles:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors du rafraîchissement des données",
        variant: "destructive"
      });
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  return { categories, setCategories, loading, refreshData };
};
