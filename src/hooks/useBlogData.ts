
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BlogCategory {
  id: string;
  title: string;
  slug: string;
  position: number;
  articles?: BlogArticle[];
}

export interface BlogArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  image: string;
  published_at: string;
  category_id: string;
  position: number;
  published: boolean;
}

export const useBlogData = () => {
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch categories and articles
  const fetchBlogData = async () => {
    try {
      setLoading(true);
      
      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories')
        .select('*')
        .order('position', { ascending: true });
      
      if (categoriesError) throw categoriesError;
      
      // Fetch articles
      const { data: articlesData, error: articlesError } = await supabase
        .from('blog_articles')
        .select('*')
        .order('position', { ascending: true });
      
      if (articlesError) throw articlesError;
      
      // Merge articles into their categories
      const categoriesWithArticles = categoriesData.map((category: BlogCategory) => {
        const categoryArticles = articlesData.filter(
          (article: BlogArticle) => article.category_id === category.id
        );
        return { ...category, articles: categoryArticles };
      });
      
      setCategories(categoriesWithArticles);
    } catch (error) {
      setError(error as Error);
      console.error('Error fetching blog data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogData();
  }, []);

  return {
    categories,
    setCategories,
    loading,
    error,
    refetch: fetchBlogData
  };
};
