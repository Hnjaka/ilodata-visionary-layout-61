
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuidesHeader from '@/components/admin/guides/GuidesHeader';
import GuidesContent from '@/components/admin/guides/GuidesContent';
import { useGuidesData } from '@/hooks/useGuidesData';

const AdminGuides = () => {
  // Utilisation du hook avec vérification des valeurs retournées
  const result = useGuidesData();
  const categories = result?.categories || [];
  const setCategories = result?.setCategories || (() => {});
  const loading = result?.loading || false;
  const refreshData = result?.refreshData || (async () => {});

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <GuidesHeader categories={categories} onRefresh={refreshData} />
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
