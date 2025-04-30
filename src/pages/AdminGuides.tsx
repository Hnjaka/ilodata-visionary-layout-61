
import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuidesHeader from '@/components/admin/guides/GuidesHeader';
import GuidesContent from '@/components/admin/guides/GuidesContent';
import { useGuidesData } from '@/hooks/useGuidesData';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const AdminGuides = () => {
  // Use the guides data hook
  const { categories, setCategories, loading, refreshData } = useGuidesData();

  // Load data on initial render
  useEffect(() => {
    refreshData();
  }, [refreshData]);

  return (
    <ProtectedRoute requireAdmin>
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
    </ProtectedRoute>
  );
};

export default AdminGuides;
