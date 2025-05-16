
import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ArticleLayout from '@/components/article/ArticleLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ArticleFooter from '@/components/article/ArticleFooter';
import { getImageWithFallback } from '@/utils/imageUtils';

const ArticleDisplay = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<any | null>(null);
  const [category, setCategory] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Determine the appropriate image category based on the article category
  const getImageCategory = () => {
    if (!category) return 'general';
    
    const categoryLower = category.title.toLowerCase();
    if (categoryLower.includes('livre') || categoryLower.includes('roman')) {
      return 'books';
    } else if (categoryLower.includes('tech') || categoryLower.includes('numérique')) {
      return 'tech';
    } else if (categoryLower.includes('design') || categoryLower.includes('éditorial')) {
      return 'design';
    } else if (categoryLower.includes('écriture') || categoryLower.includes('rédaction')) {
      return 'writing';
    }
    return 'general';
  };

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

        // Set the document title with the new format
        document.title = `${articleData.title} – Conseils et mise en page pro | Ilodata`;
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
    
    // Use a more robust regex to handle rich text HTML
    const headingRegex = /<h([2-3])[^>]*>(.*?)<\/h\1>/g;
    const tocItems = [];
    let match;
    
    while ((match = headingRegex.exec(article.content)) !== null) {
      const level = match[1];
      // Strip HTML tags from the heading content
      const title = match[2].replace(/<[^>]*>/g, ''); 
      const id = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
      
      tocItems.push({ id, title, level });
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

  // Process the article content to add IDs to headings for the TOC and add internal links
  const processContent = () => {
    if (!article?.content) return '';
    
    // First, add IDs to headings for TOC
    let processedContent = article.content.replace(
      /<h([2-3])([^>]*)>(.*?)<\/h\1>/g, 
      (match, level, attrs, content) => {
        const id = content.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
      }
    );
    
    // Add internal links for "Bonus : Modèles professionnels gratuits"
    processedContent = processedContent.replace(
      /(?<!<a[^>]*>)(Bonus\s*:\s*Modèles professionnels gratuits|Bonus\s*:\s*Modèles gratuits)(?![^<]*<\/a>)/g,
      '<a href="/modeles" class="text-ilodata-600 hover:text-ilodata-800 no-underline">$&</a>'
    );
    
    return processedContent;
  };

  return (
    <ArticleLayout 
      title={article.title} 
      breadcrumbs={breadcrumbs}
      tocItems={generateTocItems()}
    >
      <div className="mb-6">
        <img 
          src={getImageWithFallback(article.image, getImageCategory() as "general" | "books" | "tech" | "design" | "writing")} 
          alt={article.title} 
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      
      {/* Render article content with processed headings and links */}
      <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: processContent() }} />
      
      {/* Add the standardized article footer */}
      <ArticleFooter />
    </ArticleLayout>
  );
};

export default ArticleDisplay;
