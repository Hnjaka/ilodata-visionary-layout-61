
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogArticle } from '@/hooks/useBlogData';
import { getUnsplashFallback } from '@/utils/imageUtils';

export interface BlogPost extends BlogArticle {
  category_title?: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Helper function to get demo blog posts if none exist in database
  const getDemoBlogPosts = (): BlogPost[] => {
    return [
      {
        id: '1',
        title: "5 astuces pour réussir la mise en page de votre livre",
        excerpt: "Découvrez les techniques essentielles pour créer une mise en page professionnelle et attractive pour votre livre.",
        image: getUnsplashFallback('design'),
        published_at: new Date().toISOString(),
        category_title: "Design éditorial",
        slug: "astuces-mise-en-page-livre",
        content: "",
        published: true,
        position: 0,
        category_id: "1"
      },
      {
        id: '2',
        title: "Comment choisir le bon modèle de mise en page pour votre projet ?",
        excerpt: "Guide complet pour sélectionner le modèle qui correspond parfaitement à votre type de livre et à vos objectifs.",
        image: getUnsplashFallback('books'),
        published_at: new Date(Date.now() - 86400000).toISOString(),
        category_title: "Conseils pratiques",
        slug: "choisir-modele-mise-en-page",
        content: "",
        published: true,
        position: 1,
        category_id: "2"
      },
      {
        id: '3',
        title: "Les erreurs à éviter lors de la création d'un livre numérique",
        excerpt: "Évitez les pièges courants qui peuvent compromettre la qualité de votre ebook et nuire à l'expérience de lecture.",
        image: getUnsplashFallback('tech'),
        published_at: new Date(Date.now() - 172800000).toISOString(),
        category_title: "Livres numériques",
        slug: "erreurs-creation-livre-numerique",
        content: "",
        published: true,
        position: 2,
        category_id: "3"
      }
    ] as BlogPost[];
  };

  const fetchBlogPosts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Fetching blog posts from Supabase");
      // Get blog posts with their categories
      const { data: posts, error } = await supabase
        .from('blog_articles')
        .select(`
          *,
          blog_categories(title)
        `)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
        throw error;
      }
      
      console.log(`Blog posts fetched: ${posts?.length || 0}`);

      // If no posts, add some demo posts
      if (!posts || posts.length === 0) {
        console.log("No blog posts found, using demo data");
        const demoPosts = getDemoBlogPosts();
        setBlogPosts(demoPosts);
      } else {
        const formattedPosts = (posts || []).map((post, index) => {
          // Determine the appropriate category for fallback images
          let imageCategory: 'general' | 'books' | 'tech' | 'design' | 'writing' = 'general';
          const categoryTitle = post.blog_categories?.title?.toLowerCase() || '';
          
          if (categoryTitle.includes('livre') || categoryTitle.includes('roman')) {
            imageCategory = 'books';
          } else if (categoryTitle.includes('tech') || categoryTitle.includes('numérique')) {
            imageCategory = 'tech';
          } else if (categoryTitle.includes('design') || categoryTitle.includes('éditorial')) {
            imageCategory = 'design';
          } else if (categoryTitle.includes('écriture') || categoryTitle.includes('rédaction')) {
            imageCategory = 'writing';
          }
          
          return {
            ...post,
            category_title: post.blog_categories?.title || 'Non classé',
            // Use image from post or get a fallback from Unsplash
            image: post.image || getUnsplashFallback(imageCategory)
          };
        });
        
        setBlogPosts(formattedPosts);
      }
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError("Impossible de charger les articles. Veuillez réessayer ultérieurement.");
    } finally {
      setLoading(false);
    }
  };

  // Return pagination data and current posts
  const getPaginatedData = () => {
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(blogPosts.length / postsPerPage);

    return { currentPosts, totalPages };
  };

  return {
    blogPosts,
    loading,
    error,
    currentPage,
    setCurrentPage,
    fetchBlogPosts,
    getPaginatedData
  };
};
