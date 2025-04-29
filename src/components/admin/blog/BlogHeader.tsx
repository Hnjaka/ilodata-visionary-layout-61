
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { BlogCategory } from '@/hooks/useBlogData';

interface BlogHeaderProps {
  categories: BlogCategory[];
  onRefresh: () => Promise<void>;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ categories, onRefresh }) => {
  const handleRefresh = async () => {
    try {
      await onRefresh();
    } catch (error) {
      console.error("Erreur lors du rafraîchissement:", error);
    }
  };

  return (
    <div className="flex flex-col mb-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Blog</h1>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={handleRefresh}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Actualiser
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {Array.isArray(categories) && categories.length > 0 ? "Nouvel Article" : "Nouvelle Catégorie"}
          </Button>
        </div>
      </div>
      <p className="text-slate-500 mt-2">Gérez ici les catégories et articles du blog.</p>
    </div>
  );
};

export default BlogHeader;
