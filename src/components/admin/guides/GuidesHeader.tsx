
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, RefreshCw } from 'lucide-react';
import { CategoryType } from '@/types/guides';

interface GuidesHeaderProps {
  categories: CategoryType[];
  onRefresh: () => Promise<void>;
}

const GuidesHeader: React.FC<GuidesHeaderProps> = ({ categories, onRefresh }) => {
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
        <h1 className="text-3xl font-bold text-slate-800">Guides et Conseils</h1>
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
            {Array.isArray(categories) && categories.length > 0 ? "Nouvel Article" : "Nouvelle Rubrique"}
          </Button>
        </div>
      </div>
      <p className="text-slate-500 mt-2">Gérez ici les rubriques et articles du guide de conseils.</p>
    </div>
  );
};

export default GuidesHeader;
