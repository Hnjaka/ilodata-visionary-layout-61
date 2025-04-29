
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Blog: React.FC = () => {
  const { observerRef, isIntersecting } = useIntersectionObserver();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-6">Blog</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Blog post placeholders - will be filled in later */}
            {Array(6).fill(0).map((_, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-100 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-100 rounded w-1/2 mb-4"></div>
                  <div className="h-20 bg-gray-100 rounded mb-2"></div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Observer element for infinite scroll */}
          <div ref={observerRef} className="h-10 mt-8">
            {isIntersecting && <p className="text-center text-gray-500">Chargement...</p>}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
