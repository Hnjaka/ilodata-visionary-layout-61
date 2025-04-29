
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { supabase } from '@/integrations/supabase/client';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  published_at: string;
  category_title: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useIntersectionObserver({ threshold: 0.1 });

  useEffect(() => {
    document.title = "Blog | ilodata.com";
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      setLoading(true);
      
      // Fetch published blog posts with their category title
      const { data, error } = await supabase
        .from('blog_articles')
        .select(`
          id,
          title,
          slug,
          excerpt,
          image,
          published_at,
          blog_categories(title)
        `)
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (error) {
        throw error;
      }

      // Transform the data to include category_title
      const formattedPosts = data.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt || '',
        image: post.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        published_at: post.published_at,
        category_title: post.blog_categories?.title || 'Non classé'
      }));

      setPosts(formattedPosts);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
    } finally {
      setLoading(false);
    }
  };

  // Format date to French locale
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-white to-blue-50 pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
                Blog, conseils et actualités
              </h1>
              <p className="text-slate-600 text-lg mb-8">
                Découvrez nos articles, conseils et actualités pour améliorer vos projets éditoriaux et réussir vos publications.
              </p>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section 
          ref={ref} 
          className={`py-16 bg-white ${inView ? 'fade-in-section is-visible' : 'fade-in-section'}`}
        >
          <div className="container mx-auto px-4 md:px-6">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4 text-slate-600">Chargement des articles...</p>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-16">
                <h3 className="text-xl font-medium text-slate-700">Aucun article disponible</h3>
                <p className="mt-2 text-slate-500">Revenez bientôt pour découvrir nos nouveaux contenus.</p>
              </div>
            ) : (
              <>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {posts.map((post, index) => (
                    <article 
                      key={post.id} 
                      className={`glass-card h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 animate-fade-up delay-${(index + 1) * 100}`}
                    >
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <img 
                          src={post.image} 
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
                        <div className="text-sm text-slate-500 mb-2">
                          {formatDate(post.published_at)}
                        </div>
                        <h3 className="text-xl font-semibold mb-3 text-slate-800">{post.title}</h3>
                        <p className="text-slate-600 mb-4">{post.excerpt}</p>
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
                
                <div className="text-center mt-16">
                  <Link 
                    to="/admin/blog" 
                    className="button-secondary inline-flex items-center"
                  >
                    Gérer les articles
                    <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
