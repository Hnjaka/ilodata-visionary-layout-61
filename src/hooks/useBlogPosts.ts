
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BlogArticle } from '@/hooks/useBlogData';

export interface BlogPost extends BlogArticle {
  category_title?: string;
}

export const useBlogPosts = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Collection d'images Unsplash pour les posts de démonstration
  const unsplashImages = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1167&q=80",
    "https://images.unsplash.com/photo-1595373650160-963a12639e38?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80",
    "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
  ];

  // Helper function to get demo blog posts if none exist in database
  const getDemoBlogPosts = (): BlogPost[] => {
    return [
      {
        id: '1',
        title: "5 astuces pour réussir la mise en page de votre livre",
        excerpt: "Découvrez les techniques essentielles pour créer une mise en page professionnelle et attractive pour votre livre.",
        image: unsplashImages[0],
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
        image: unsplashImages[1],
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
        image: unsplashImages[2],
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
        const formattedPosts = (posts || []).map((post, index) => ({
          ...post,
          category_title: post.blog_categories?.title || 'Non classé',
          // Si le post n'a pas d'image, utilisez une image d'Unsplash
          image: post.image || unsplashImages[index % unsplashImages.length]
        }));
        
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
