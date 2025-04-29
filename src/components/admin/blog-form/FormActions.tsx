
import React from 'react';
import { Button } from '@/components/ui/button';
import { BlogArticle } from '@/hooks/useBlogData';

interface FormActionsProps {
  editArticle: BlogArticle | null;
  handleCancel: () => void;
  categoriesEmpty: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ editArticle, handleCancel, categoriesEmpty }) => {
  return (
    <div className="flex space-x-2">
      <Button 
        type="submit" 
        disabled={categoriesEmpty}
      >
        {editArticle ? "Mettre à jour" : "Ajouter"}
      </Button>
      
      {editArticle && (
        <Button type="button" variant="outline" onClick={handleCancel}>
          Annuler
        </Button>
      )}
    </div>
  );
};
