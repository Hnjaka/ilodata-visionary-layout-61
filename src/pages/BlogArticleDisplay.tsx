
import React, { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ArticleLayout from '@/components/article/ArticleLayout';
import LoadingSpinner from '@/components/LoadingSpinner';
import ArticleFooter from '@/components/article/ArticleFooter';
import { BlogArticle } from '@/hooks/useBlogData';
import CtaSection from '@/components/guides/CtaSection';
import { getImageWithFallback } from '@/utils/imageUtils';

interface BlogArticleWithCategory extends BlogArticle {
  blog_categories?: {
    title: string;
  };
}

const BlogArticleDisplay = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState<BlogArticleWithCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchArticleBySlug = async () => {
      try {
        setLoading(true);
        console.log("Fetching blog article with slug:", slug);
        
        // Fetch the article by slug
        const { data: articleData, error: articleError } = await supabase
          .from('blog_articles')
          .select(`
            *,
            blog_categories(title)
          `)
          .eq('slug', slug)
          .maybeSingle();
          
        if (articleError) {
          console.error('Error fetching article:', articleError);
          setNotFound(true);
          return;
        }
        
        if (!articleData) {
          console.log('No article found with slug:', slug);
          setNotFound(true);
          return;
        }
        
        console.log('Article found:', articleData);
        setArticle(articleData);
        
        // Set page title using the new format
        document.title = `${articleData.title} – Conseils et mise en page pro | Ilodata`;
      } catch (error) {
        console.error('Error in fetchArticleBySlug:', error);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    
    if (slug) {
      fetchArticleBySlug();
    } else {
      setNotFound(true);
      setLoading(false);
    }
  }, [slug]);

  // Generate TOC items from article content
  const generateTocItems = () => {
    if (!article || !article.content) return [];
    
    // Use a robust regex to handle rich text HTML
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

  // Get category from article to determine the type of fallback image
  const getImageCategory = () => {
    if (!article || !article.blog_categories?.title) return 'general';
    
    const categoryLower = article.blog_categories.title.toLowerCase();
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
    { label: "Articles", url: "/articles" },
    { label: article?.blog_categories?.title || "Article", url: "/articles" },
  ];

  // Process the content to add IDs to headings for the TOC
  const processContent = () => {
    if (!article?.content) return '';
    
    // Add IDs to headings for TOC
    let processedContent = article.content.replace(
      /<h([2-3])([^>]*)>(.*?)<\/h\1>/g, 
      (match, level, attrs, content) => {
        const id = content.replace(/<[^>]*>/g, '').toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
        return `<h${level}${attrs} id="${id}">${content}</h${level}>`;
      }
    );
    
    return processedContent;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };

  const imageCategory = getImageCategory();
  const imageCategoryType = imageCategory as "general" | "books" | "tech" | "design" | "writing";

  return (
    <ArticleLayout 
      title={article?.title || 'Article'} 
      breadcrumbs={breadcrumbs}
      tocItems={generateTocItems()}
    >
      {article?.published_at && (
        <div className="text-sm text-slate-500 mb-4">
          Publié le {formatDate(article.published_at)}
        </div>
      )}
      
      <div className="mb-8">
        <img 
          src={getImageWithFallback(article?.image, imageCategoryType)} 
          alt={article?.title || 'Image de l\'article'} 
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      
      {/* Render article content with processed headings */}
      <div className="prose prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: processContent() }} />
      
      {/* Add CTA section */}
      <CtaSection />
      
      {/* Add standard article footer */}
      <ArticleFooter />
    </ArticleLayout>
  );
};

export default BlogArticleDisplay;
