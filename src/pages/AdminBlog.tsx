
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHeader from '@/components/admin/blog/BlogHeader';
import BlogContent from '@/components/admin/blog/BlogContent';
import { useBlogData } from '@/hooks/useBlogData';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const AdminBlog = () => {
  // Use the blog data hook for retrieving data
  const { categories, setCategories, loading, refreshData } = useBlogData();

  // Load data on initial render
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-grow container mx-auto px-4 py-12">
          <BlogHeader categories={categories} onRefresh={refreshData} />
          <BlogContent 
            categories={categories} 
            setCategories={setCategories} 
            loading={loading} 
          />
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default AdminBlog;
