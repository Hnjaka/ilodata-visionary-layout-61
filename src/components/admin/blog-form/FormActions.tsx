
import React from 'react';
import { Button } from '@/components/ui/button';
import { BlogCategory } from '@/hooks/useBlogData';

interface FormActionsProps {
  editCategory: BlogCategory | null;
  handleCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ editCategory, handleCancel }) => {
  return (
    <div className="flex space-x-2">
      <Button type="submit">
        {editCategory ? "Modifier" : "Ajouter"}
      </Button>
      
      {editCategory && (
        <Button type="button" variant="outline" onClick={handleCancel}>
          Annuler
        </Button>
      )}
    </div>
  );
};
