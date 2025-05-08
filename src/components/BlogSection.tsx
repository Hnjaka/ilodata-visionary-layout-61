
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import LoadingSpinner from '@/components/LoadingSpinner';
import DateFormatter from '@/components/blog/DateFormatter';
import BlogPostCard from '@/components/blog/BlogPostCard';
import BlogEmptyState from '@/components/blog/BlogEmptyState';
import BlogErrorState from '@/components/blog/BlogErrorState';
import { useBlogPosts } from '@/hooks/useBlogPosts';

const BlogSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { user, isAdmin } = useAuth();
  const { blogPosts, loading, error, fetchBlogPosts } = useBlogPosts();
  
  // Fetch blog posts when component mounts
  useEffect(() => {
    fetchBlogPosts();
  }, []);
  
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
    console.log("BlogSection component - User auth state:", { 
      isLoggedIn: !!user,
      isAdmin: isAdmin
    });
  }, [user, isAdmin]);

  // Get only the first 3 blog posts for the homepage section
  const displayedPosts = blogPosts.slice(0, 3);

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
          <BlogErrorState error={error} onRetry={fetchBlogPosts} />
        ) : displayedPosts.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {displayedPosts.map((post, index) => (
              <div 
                key={post.id} 
                className={cn("animate-fade-up", `delay-${(index + 1) * 100}`)}
              >
                <BlogPostCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <BlogEmptyState onRetry={fetchBlogPosts} />
        )}

        <div className="text-center mt-12">
          <Link to="/articles" className="button-secondary inline-flex items-center mr-2">
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

export default BlogSection;
