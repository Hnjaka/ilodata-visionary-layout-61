
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useBlogPosts } from '@/hooks/useBlogPosts';
import LoadingSpinner from '@/components/LoadingSpinner';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogSeo from '@/components/blog/BlogSeo';
import BlogPostGrid from '@/components/blog/BlogPostGrid';
import BlogEmptyState from '@/components/blog/BlogEmptyState';
import BlogErrorState from '@/components/blog/BlogErrorState';

const Blog: React.FC = () => {
  const { 
    loading, 
    error, 
    currentPage, 
    setCurrentPage, 
    fetchBlogPosts, 
    getPaginatedData 
  } = useBlogPosts();

  // Get paginated data
  const { currentPosts, totalPages } = getPaginatedData();

  // Load blog posts on component mount
  React.useEffect(() => {
    fetchBlogPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <BlogSeo />
      <Header />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-12">
          <BlogHeader />
          
          {loading ? (
            <div className="flex justify-center py-16">
              <LoadingSpinner />
            </div>
          ) : error ? (
            <BlogErrorState error={error} onRetry={fetchBlogPosts} />
          ) : currentPosts.length > 0 ? (
            <BlogPostGrid 
              posts={currentPosts} 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          ) : (
            <BlogEmptyState onRetry={fetchBlogPosts} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
