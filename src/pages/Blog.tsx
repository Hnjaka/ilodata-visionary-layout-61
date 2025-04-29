
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowRight, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { BlogArticle } from '@/hooks/useBlogData';
import { Pagination, PaginationContent, PaginationItem, PaginationLink } from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';

interface BlogPost extends BlogArticle {
  category_title?: string;
}

const Blog: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchBlogPosts = async () => {
      setLoading(true);
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

        const formattedPosts = (posts || []).map(post => ({
          ...post,
          category_title: post.blog_categories?.title || 'Non classé'
        }));

        setBlogPosts(formattedPosts);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

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
            <Link to="/admin/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <Settings size={18} />
                Administration
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6).fill(0).map((_, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="h-48 bg-slate-200"></div>
                  <div className="p-4">
                    <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                    <div className="h-20 bg-slate-200 rounded mb-2"></div>
                  </div>
                </div>
              ))}
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
