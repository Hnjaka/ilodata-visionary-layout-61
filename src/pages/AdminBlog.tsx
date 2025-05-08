
import React, { useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BlogContent from '@/components/admin/blog/BlogContent';
import { useBlogData } from '@/hooks/useBlogData';
import ProtectedRoute from '@/components/admin/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Plus, Settings } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const AdminBlog = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAuth();
  // Use the blog data hook for retrieving data
  const { categories, setCategories, loading, refetch } = useBlogData();

  // Memoize the refresh function to avoid triggering re-renders
  // Make sure it returns a Promise
  const handleRefresh = useCallback(async () => {
    return await refetch();
  }, [refetch]);

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
            <h1 className="text-3xl font-bold text-slate-800">Blog</h1>
            <div className="flex space-x-2">
              {isAdmin && (
                <>
                  <Button
                    variant="outline"
                    onClick={handleRefresh}
                    className="flex items-center gap-2"
                  >
                    Rafraîchir les données
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/admin/blog/settings')}
                    className="flex items-center"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Paramètres
                  </Button>
                  <Button onClick={() => navigate('/admin/blog/new')}>
                    <Plus className="h-4 w-4 mr-2" />
                    {Array.isArray(categories) && categories.length > 0 ? "Nouvel Article" : "Nouvelle Catégorie"}
                  </Button>
                </>
              )}
            </div>
          </div>
          <p className="text-slate-500 mt-2">Gérez ici les catégories et articles du blog.</p>
        </div>
        
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
