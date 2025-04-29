
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
              title: article.title,
              slug: article.slug,
              content: article.content || '',
              layout: (article.layout || 'standard') as 'standard' | 'wide' | 'sidebar',
              position: article.position,
              category_id: article.category_id
            }));
            
            return {
              id: category.id,
              title: category.title,
              icon: iconComponent,
              articles: formattedArticles,
              position: category.position
            };
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndArticles();

    // Set up a subscription for real-time updates
    const categoriesChannel = supabase
      .channel('admin-categories-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'guide_categories' }, 
        () => {
          fetchCategoriesAndArticles();
        }
      )
      .subscribe();

    const articlesChannel = supabase
      .channel('admin-articles-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'guide_articles' }, 
        () => {
          fetchCategoriesAndArticles();
        }
      )
      .subscribe();

    // Cleanup subscriptions
    return () => {
      supabase.removeChannel(categoriesChannel);
      supabase.removeChannel(articlesChannel);
    };
  }, []);

  return { categories, setCategories, loading };
};
