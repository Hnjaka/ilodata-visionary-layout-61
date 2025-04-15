
import React from 'react';
import { Button } from '@/components/ui/button';

interface TemplateFormButtonsProps {
  isSubmitting: boolean;
  isEditing: boolean;
  onCancel: () => void;
}

const TemplateFormButtons: React.FC<TemplateFormButtonsProps> = ({
  isSubmitting,
  isEditing,
  onCancel,
}) => {
  return (
    <div className="flex justify-end space-x-4">
      <Button 
        type="button" 
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        Annuler
      </Button>
      <Button 
        type="submit" 
        variant="default" 
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Enregistrement...' : isEditing ? 'Mettre à jour' : 'Créer'}
      </Button>
    </div>
  );
};

export default TemplateFormButtons;
