
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import DateFormatter from '@/components/blog/DateFormatter';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogEmptyState from '@/components/blog/BlogEmptyState';
import BlogErrorState from '@/components/blog/BlogErrorState';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  published_at: string;
  category_title: string;
  slug: string;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: "5 astuces pour réussir la mise en page de votre livre",
    excerpt: "Découvrez les techniques essentielles pour créer une mise en page professionnelle et attractive pour votre livre.",
    image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    published_at: "2023-04-15T00:00:00.000Z",
    category_title: "Design éditorial",
    slug: "astuces-mise-en-page-livre"
  },
  {
    id: '2',
    title: "Comment choisir le bon modèle de mise en page pour votre projet ?",
    excerpt: "Guide complet pour sélectionner le modèle qui correspond parfaitement à votre type de livre et à vos objectifs.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1167&q=80",
    published_at: "2023-05-03T00:00:00.000Z",
    category_title: "Conseils pratiques",
    slug: "choisir-modele-mise-en-page"
  },
  {
    id: '3',
    title: "Les erreurs à éviter lors de la création d'un livre numérique",
    excerpt: "Évitez les pièges courants qui peuvent compromettre la qualité de votre ebook et nuire à l'expérience de lecture.",
    image: "https://images.unsplash.com/photo-1595373650160-963a12639e38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    published_at: "2023-06-21T00:00:00.000Z",
    category_title: "Livres numériques",
    slug: "erreurs-creation-livre-numerique"
  }
];

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<BlogPost[]>(blogPosts);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Add these logs to better track the user state
  useEffect(() => {
    console.log("Blog component - User auth state:", { 
      isLoggedIn: !!user,
      isAdmin: isAdmin
    });
  }, [user, isAdmin]);

  return (
    <section id="blog" className="section-padding bg-gradient-to-b from-white to-blue-50">
      <div 
        ref={sectionRef} 
        className="container mx-auto px-4 md:px-6 fade-in-section"
      >
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 rounded-full bg-blue-100">
              <BookOpen className="h-6 w-6 text-ilodata-600" />
            </div>
          </div>
          <h2 className="section-title text-center">Conseils et actualités</h2>
          <p className="section-subtitle">
            Articles, conseils et inspiration pour vos projets éditoriaux.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <BlogErrorState error={error} onRetry={() => setPosts(blogPosts)} />
        ) : posts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, index) => (
              <div 
                key={post.id} 
                className={cn("animate-fade-up", `delay-${(index + 1) * 100}`)}
              >
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <BlogEmptyState onRetry={() => setPosts(blogPosts)} />
        )}

        <div className="text-center mt-12">
          {/* Show all articles button for everyone */}
          <Link to="/blog" className="button-secondary inline-flex items-center mr-2">
            Voir tous les articles
            <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
          </Link>
          
          {/* Show admin button only for logged in admins */}
          {user && isAdmin && (
            <Link to="/admin/blog" className="button-primary inline-flex items-center ml-2">
              Gérer les articles
              <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default Blog;
