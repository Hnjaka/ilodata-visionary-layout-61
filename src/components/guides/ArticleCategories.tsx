
import React, { useState, useEffect } from 'react';
import ArticleCategory from './ArticleCategory';
import { supabase } from '@/integrations/supabase/client';
import { getIconByName } from '@/data/guidesData';
import LoadingSpinner from '@/components/LoadingSpinner';

const ArticleCategories = () => {
  const [categories, setCategories] = useState<any[]>([]);
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
          categoriesData.map(async (category) => {
            const { data: articlesData, error: articlesError } = await supabase
              .from('guide_articles')
              .select('*')
              .eq('category_id', category.id)
              .order('position');
              
            if (articlesError) throw articlesError;
            
            // Map the icon string to the actual icon component
            const iconComponent = getIconByName(category.icon);
            
            return {
              ...category,
              icon: iconComponent,
              articles: articlesData || []
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
          key={index} 
          title={category.title} 
          icon={category.icon} 
          articles={category.articles} 
        />
      ))}
    </div>
  );
};

export default ArticleCategories;
