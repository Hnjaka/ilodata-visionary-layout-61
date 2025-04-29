
import React, { useState, useEffect } from 'react';
import ArticleCategory from './ArticleCategory';
import { supabase } from '@/integrations/supabase/client';
import { getIconByName } from '@/data/guidesData';
import LoadingSpinner from '@/components/LoadingSpinner';
import { CategoryType, ArticleType } from '@/types/guides';

const ArticleCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategoriesAndArticles = async () => {
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
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoriesAndArticles();

    // Set up a subscription for real-time updates
    const categoriesChannel = supabase
      .channel('public:guide_categories')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'guide_categories' }, 
        () => {
          fetchCategoriesAndArticles();
        }
      )
      .subscribe();

    const articlesChannel = supabase
      .channel('public:guide_articles')
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
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <LoadingSpinner />
      </div>
    );
  }
  
  return (
    <div className="grid md:grid-cols-2 gap-8">
      {categories.map((category, index) => (
        <ArticleCategory 
          key={category.id || index} 
          title={category.title} 
          icon={typeof category.icon === 'string' ? getIconByName(category.icon) : category.icon} 
          articles={category.articles} 
        />
      ))}
    </div>
  );
};

export default ArticleCategories;
