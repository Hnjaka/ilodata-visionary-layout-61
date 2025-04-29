
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save } from 'lucide-react';
import { CategoryType } from '@/types/guides';

interface FormActionsProps {
  editCategory: CategoryType | null;
  onCancel: () => void;
}

export const FormActions: React.FC<FormActionsProps> = ({ 
  editCategory,
  onCancel 
}) => {
  return (
    <div className="flex space-x-2">
      <Button type="submit">
        {editCategory ? (
          <>
            <Save className="h-4 w-4 mr-2" />
            Modifier
          </>
        ) : (
          <>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter
          </>
        )}
      </Button>
      
      {editCategory && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      )}
    </div>
  );
};
