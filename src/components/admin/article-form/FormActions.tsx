
import React from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, Save } from 'lucide-react';

interface FormActionsProps {
  isEditing: boolean;
  isCategoryAvailable: boolean;
  onCancel: () => void;
}

const FormActions: React.FC<FormActionsProps> = ({ 
  isEditing, 
  isCategoryAvailable,
  onCancel
}) => {
  return (
    <div className="flex space-x-2">
      <Button type="submit" disabled={!isCategoryAvailable}>
        {isEditing ? (
          <>
            <Save className="h-4 w-4 mr-2" />
            Modifier l'article
          </>
        ) : (
          <>
            <PlusCircle className="h-4 w-4 mr-2" />
            Ajouter l'article
          </>
        )}
      </Button>
      
      {isEditing && (
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
      )}
    </div>
  );
};

export default FormActions;
