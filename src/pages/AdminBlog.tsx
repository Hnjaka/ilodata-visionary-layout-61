
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogHeader from '@/components/admin/blog/BlogHeader';
import BlogContent from '@/components/admin/blog/BlogContent';
import { useBlogData } from '@/hooks/useBlogData';

const AdminBlog = () => {
  // Utilisation du hook pour récupérer les données du blog
  const { categories, setCategories, loading, refreshData } = useBlogData();

  return (
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
  );
};

export default AdminBlog;
