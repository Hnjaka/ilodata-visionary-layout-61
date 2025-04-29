
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ArticleLayout from '@/components/article/ArticleLayout';
import LoadingSpinner from '@/components/LoadingSpinner';

const ArticleDisplay = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any | null>(null);
  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticleBySlug = async () => {
      try {
        setLoading(true);
        
        // Fetch the article by slug
        const { data: articleData, error: articleError } = await supabase
          .from('guide_articles')
          .select('*')
          .eq('slug', slug)
          .single();
          
        if (articleError || !articleData) {
          console.error('Error fetching article:', articleError);
          setNotFound(true);
          return;
        }
        
        // Fetch the category for the article
        const { data: categoryData, error: categoryError } = await supabase
          .from('guide_categories')
          .select('*')
          .eq('id', articleData.category_id)
          .single();
          
        if (categoryError || !categoryData) {
          console.error('Error fetching category:', categoryError);
        } else {
          setCategory(categoryData);
        }
        
        setArticle(articleData);
      } catch (error) {
        console.error('Error in fetchArticleBySlug:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    
    fetchArticleBySlug();
  }, [slug]);

  // Generate TOC items from article content
  const generateTocItems = () => {
    if (!article || !article.content) return [];
    
    const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
    const tocItems = [];
    let match;
    
    while ((match = headingRegex.exec(article.content)) !== null) {
      const level = match[1];
      const title = match[2].replace(/<[^>]*>/g, ''); // Remove any HTML tags inside the heading
      const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      tocItems.push({ id, title });
    }
    
    return tocItems;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (notFound) {
    return <Navigate to="/not-found" replace />;
  }

  // Define breadcrumbs for navigation
  const breadcrumbs = [
    { label: "Accueil", url: "/" },
    { label: "Guides & Conseils", url: "/guides" },
    { label: category?.title || "Article", url: "/guides" },
  ];

  return (
    <ArticleLayout 
      title={article.title} 
      breadcrumbs={breadcrumbs}
      tocItems={generateTocItems()}
    >
      {/* Render article content */}
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
    </ArticleLayout>
  );
};

export default ArticleDisplay;
