
import { useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getIconByName } from '@/data/guidesData';

export type BlogCategory = {
  id: string;
  title: string;
  icon: string; // Changed from React.ComponentType<any> to string to match DB schema
  position: number;
  articles: BlogArticle[];
};

export type BlogArticle = {
  id: string;
  title: string;
  slug: string;
  content?: string;
  image?: string;
  excerpt?: string;
  category_id: string;
  position: number;
  published: boolean;
  published_at?: string;
};

export const useBlogData = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Remove automatic data fetching on component mount
  // The data will only be loaded when refreshData is called explicitly

  const fetchCategoriesAndArticles = async () => {
    setLoading(true);
    try {
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('position');
        
      if (categoriesError) throw categoriesError;
      
      // Fetch articles for each category
      const categoriesWithArticles = await Promise.all(
        (categoriesData || []).map(async (category) => {
          try {
            const { data: articlesData, error: articlesError } = await supabase
              .from('blog_articles')
              .select('*')
              .eq('category_id', category.id)
              .order('position');
              
            if (articlesError) throw articlesError;
            
            // Format articles to match BlogArticle type
            const formattedArticles: BlogArticle[] = (articlesData || []).map(article => ({
              id: article.id,
              title: article.title,
              slug: article.slug,
              content: article.content,
              image: article.image,
              excerpt: article.excerpt,
              category_id: article.category_id,
              position: article.position,
              published: article.published,
              published_at: article.published_at,
            }));
            
            return {
              id: category.id,
              title: category.title,
              icon: category.icon, // Store as string
              position: category.position,
              articles: formattedArticles,
            };
          } catch (error) {
            console.error(`Error fetching articles for category ${category.id}:`, error);
            return {
              id: category.id,
              title: category.title,
              icon: category.icon, // Store as string
              position: category.position,
              articles: [],
            };
          }
        })
      );
      
      setCategories(categoriesWithArticles);
      toast({
        title: "Succès",
        description: "Données chargées avec succès",
      });
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

  // Rename to be clear it's for both initial loading and refreshing
  const refreshData = fetchCategoriesAndArticles;

  return { categories, setCategories, loading, setLoading, refreshData };
};
