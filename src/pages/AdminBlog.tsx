
import React, { useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHeader from '@/components/admin/blog/BlogHeader';
import BlogContent from '@/components/admin/blog/BlogContent';
import { useBlogData } from '@/hooks/useBlogData';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const AdminBlog = () => {
  // Use the blog data hook for retrieving data
  const { categories, setCategories, loading, refreshData } = useBlogData();

  // Memoize the refresh function to avoid triggering re-renders
  // Make sure it returns a Promise
  const handleRefresh = useCallback(async () => {
    return await refreshData();
  }, [refreshData]);

  // Load data on initial render only
  useEffect(() => {
    handleRefresh();
    // Dependency array is empty to ensure this only runs once on mount
  }, []);

  const AdminContent = () => (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <BlogHeader categories={categories} onRefresh={handleRefresh} />
        <BlogContent 
          categories={categories} 
          setCategories={setCategories} 
          loading={loading} 
        />
      </main>

      <Footer />
    </div>
  );

  return (
    <ProtectedRoute requireAdmin>
      <AdminContent />
    </ProtectedRoute>
  );
};

export default AdminBlog;
