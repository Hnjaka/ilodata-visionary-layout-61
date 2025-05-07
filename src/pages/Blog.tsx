import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BlogArticle } from '@/hooks/useBlogData';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';

interface BlogPost extends BlogArticle {
  category_title?: string;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const { user, isAdmin } = useAuth();

  // Ajout des balises méta pour le SEO
  useEffect(() => {
    document.title = "Blog - Conseils et actualités sur la mise en page | ilodata.com";
    
    // Mise à jour ou création de la balise meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Articles, conseils et inspiration pour vos projets éditoriaux. Découvrez nos astuces et bonnes pratiques pour la mise en page de livres.');
    
    // Add canonical URL for SEO
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', 'https://ilodata.com/blog');
    
    console.log("Blog page mounted - Setup meta tags completed");
  }, []);

  useEffect(() => {
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
          const formattedPosts = (posts || []).map(post => ({
            ...post,
            category_title: post.blog_categories?.title || 'Non classé'
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

    fetchBlogPosts();
  }, []);
  
  // Helper function to get demo blog posts if none exist in database
  const getDemoBlogPosts = (): BlogPost[] => {
    return [
      {
        id: '1',
        title: "5 astuces pour réussir la mise en page de votre livre",
        excerpt: "Découvrez les techniques essentielles pour créer une mise en page professionnelle et attractive pour votre livre.",
        image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        published_at: new Date().toISOString(),
        category_title: "Design éditorial",
        slug: "astuces-mise-en-page-livre",
        content: "",
        published: true
      },
      {
        id: '2',
        title: "Comment choisir le bon modèle de mise en page pour votre projet ?",
        excerpt: "Guide complet pour sélectionner le modèle qui correspond parfaitement à votre type de livre et à vos objectifs.",
        image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
        published_at: new Date(Date.now() - 86400000).toISOString(),
        category_title: "Conseils pratiques",
        slug: "choisir-modele-mise-en-page",
        content: "",
        published: true
      },
      {
        id: '3',
        title: "Les erreurs à éviter lors de la création d'un livre numérique",
        excerpt: "Évitez les pièges courants qui peuvent compromettre la qualité de votre ebook et nuire à l'expérience de lecture.",
        image: "https://images.unsplash.com/photo-1595373650160-963a12639e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        published_at: new Date(Date.now() - 172800000).toISOString(),
        category_title: "Livres numériques",
        slug: "erreurs-creation-livre-numerique",
        content: "",
        published: true
      }
    ] as BlogPost[];
  };

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(blogPosts.length / postsPerPage);

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date);
  };
  
  const handleRetry = () => {
    const fetchBlogPosts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Get blog posts with their categories
        const { data: posts, error } = await supabase
          .from('blog_articles')
          .select(`
            *,
            blog_categories(title)
          `)
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;

        if (!posts || posts.length === 0) {
          const demoPosts = getDemoBlogPosts();
          setBlogPosts(demoPosts);
        } else {
          const formattedPosts = (posts || []).map(post => ({
            ...post,
            category_title: post.blog_categories?.title || 'Non classé'
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
    
    fetchBlogPosts();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Blog</h1>
              <p className="text-slate-600">Articles, conseils et inspiration pour vos projets éditoriaux</p>
            </div>
            
            {/* Admin button only shown to logged-in admins */}
            {user && isAdmin && (
              <Link to="/admin/blog">
                <Button variant="outline" className="flex items-center gap-2">
                  <Settings size={18} />
                  Administration
                </Button>
              </Link>
            )}
          </div>
          
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <p className="text-red-500">{error}</p>
              <Button 
                onClick={handleRetry} 
                variant="default" 
                className="mt-4"
              >
                Réessayer
              </Button>
            </div>
          ) : blogPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {currentPosts.map((post) => (
                  <article key={post.id} className="glass-card h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                    <div className="relative overflow-hidden aspect-[16/9]">
                      <img 
                        src={post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute top-0 left-0 p-2">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 text-ilodata-700 rounded-full">
                          {post.category_title}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="text-sm text-slate-500 mb-2">{formatDate(post.published_at)}</div>
                      <h3 className="text-xl font-semibold mb-3 text-slate-800">{post.title}</h3>
                      <p className="text-slate-600 mb-4">{post.excerpt || 'Cliquez pour en savoir plus sur cet article.'}</p>
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="group inline-flex items-center text-ilodata-600 font-medium hover:text-ilodata-700 transition-colors"
                      >
                        Lire la suite
                        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
              
              {totalPages > 1 && (
                <Pagination className="mt-12">
                  <PaginationContent>
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink 
                          isActive={currentPage === i + 1} 
                          onClick={() => setCurrentPage(i + 1)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </PaginationContent>
                </Pagination>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-slate-600">Aucun article n'a été publié pour le moment.</p>
              <p className="mt-2">Revenez bientôt pour découvrir notre contenu !</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
