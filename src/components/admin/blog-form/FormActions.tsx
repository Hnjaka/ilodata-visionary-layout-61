
import React from 'react';
import { Button } from '@/components/ui/button';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';

interface FormActionsProps {
  editCategory?: BlogCategory | null;
  editArticle?: BlogArticle | null;
  handleCancel: () => void;
  categoriesEmpty?: boolean;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  editCategory, 
  editArticle, 
  handleCancel,
  categoriesEmpty 
}) => {
  // Determine if we're in edit mode (either category or article)
  const isEditMode = editCategory || editArticle;
  
  // Determine if the submit button should be disabled (only for articles when no categories exist)
  const submitDisabled = categoriesEmpty && !editArticle;
  
  return (
    <div className="flex space-x-2">
      <Button type="submit" disabled={submitDisabled}>
        {isEditMode ? "Modifier" : "Ajouter"}
      </Button>
      
      {isEditMode && (
        <Button type="button" variant="outline" onClick={handleCancel}>
          Annuler
        </Button>
      )}
    </div>
  );
};
