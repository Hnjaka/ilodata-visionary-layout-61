
import { useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Type definitions for blog data structures
export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content?: string;
  excerpt?: string;
  image?: string;
  category_id: string;
  category_title?: string;
  published: boolean;
  published_at?: string;
  position?: number;
}

export interface BlogCategory {
  id: string;
  title: string;
  icon?: string;
  position?: number;
  articles: BlogArticle[];
}

export const useBlogData = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch blog categories and articles from the database
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching blog categories from Supabase");
      // Get all categories first
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('position', { ascending: true });
      
      if (categoriesError) throw categoriesError;
      
      // Get all articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('blog_articles')
        .select('*')
        .order('position', { ascending: true });
      
      if (articlesError) throw articlesError;
      
      // Map articles to their categories
      const categoriesWithArticles = categoriesData.map((category: any) => {
        const categoryArticles = articlesData
          .filter((article: any) => article.category_id === category.id)
          .map((article: any) => ({
            ...article,
          }));
          
        return {
          ...category,
          articles: categoryArticles
        };
      });
      
      setCategories(categoriesWithArticles);
      console.log(`Loaded ${categoriesData.length} categories and ${articlesData.length} articles`);
    } catch (err: any) {
      console.error('Error fetching blog data:', err);
      setError(err.message || 'Failed to load blog data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Refresh data function that returns a Promise
  const refreshData = useCallback(async () => {
    try {
      await fetchData();
      return true;
    } catch (err) {
      console.error('Error refreshing blog data:', err);
      return false;
    }
  }, [fetchData]);

  return {
    categories,
    setCategories,
    loading,
    error,
    refreshData
  };
};
