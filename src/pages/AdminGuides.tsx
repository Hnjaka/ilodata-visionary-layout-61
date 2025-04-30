
import React, { useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuidesHeader from '@/components/admin/guides/GuidesHeader';
import GuidesContent from '@/components/admin/guides/GuidesContent';
import { useGuidesData } from '@/hooks/useGuidesData';
import ProtectedRoute from '@/components/admin/ProtectedRoute';

const AdminGuides = () => {
  // Use the guides data hook
  const { categories, setCategories, loading, refreshData } = useGuidesData();

  // Memoize the refresh function to avoid triggering re-renders
  const handleRefresh = useCallback(() => {
    refreshData();
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
        <GuidesHeader categories={categories} onRefresh={handleRefresh} />
        <GuidesContent 
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

export default AdminGuides;
