
import React, { useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GuidesHeader from '@/components/admin/guides/GuidesHeader';
import GuidesContent from '@/components/admin/guides/GuidesContent';
import { useGuidesData } from '@/hooks/useGuidesData';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminGuides = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  // Use the guides data hook
  const { categories, setCategories, loading, refreshData } = useGuidesData();

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
        <div className="flex flex-col mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-slate-800">Guides et Conseils</h1>
            <div className="flex space-x-2">
              {isAdmin && (
                <>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin/guides/settings')}
                    className="flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Button>
                  <Button 
                    onClick={() => navigate('/admin/guides/new')}
                    className="flex items-center"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    {categories.length > 0 ? "Nouvel Article" : "Nouvelle Rubrique"}
                  </Button>
                </>
              )}
            </div>
          </div>
          <p className="text-slate-500 mt-2">Gérez ici les rubriques et articles du guide de conseils.</p>
        </div>
        
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
    <ProtectedRoute adminOnly={true}>
      <AdminContent />
    </ProtectedRoute>
  );
};

export default AdminGuides;
