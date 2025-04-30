
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuidesHeader from '@/components/admin/guides/GuidesHeader';
import GuidesContent from '@/components/admin/guides/GuidesContent';
import { useGuidesData } from '@/hooks/useGuidesData';
import { useAuth } from '@/hooks/useAuth';

const AdminGuides = () => {
  // Utilisation du hook avec vérification des valeurs retournées
  const result = useGuidesData();
  const { user } = useAuth();
  const categories = result?.categories || [];
  const setCategories = result?.setCategories || (() => {});
  const loading = result?.loading || false;
  const refreshData = result?.refreshData || (async () => {});

  useEffect(() => {
    refreshData();
  }, [refreshData]);

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
