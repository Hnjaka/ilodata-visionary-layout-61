
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogPostCard from '@/components/blog/BlogPostCard';
import { useToast } from '@/hooks/use-toast';
import LoadingSpinner from '@/components/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import ArticlesSeo from '@/components/articles/ArticlesSeo';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const Articles = () => {
  const { toast } = useToast();
  const { blogPosts, loading, error, fetchBlogPosts } = useBlogPosts();

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <ArticlesSeo />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-slate-600 hover:text-ilodata-600 mb-4">
              <ArrowLeft size={16} className="mr-1" />
              Retour à l'accueil
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Articles spécialisés</h1>
            <p className="text-slate-600">Ressources détaillées sur la mise en page professionnelle de livres</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <Button onClick={fetchBlogPosts}>
                Réessayer
              </Button>
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((article) => (
                  <BlogPostCard key={article.id} post={article} />
                ))}
              </div>
              
              {blogPosts.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-lg text-slate-600">Aucun article n'est disponible pour le moment.</p>
                  <p className="mt-2">Revenez bientôt pour découvrir notre contenu!</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Articles;
