
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuidesHeader from '@/components/admin/guides/GuidesHeader';
import GuidesContent from '@/components/admin/guides/GuidesContent';
import { useGuidesData } from '@/hooks/useGuidesData';

const AdminGuides = () => {
  const { categories, setCategories, loading } = useGuidesData();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <GuidesHeader categories={categories} />
        <GuidesContent 
          categories={categories} 
          setCategories={setCategories} 
          loading={loading} 
        />
      </main>

      <Footer />
    </div>
  );
};

export default AdminGuides;
