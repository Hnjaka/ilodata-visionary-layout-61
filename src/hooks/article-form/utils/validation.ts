
import { toast } from '@/components/ui/use-toast';

/**
 * Validate if the selected category index is valid
 */
export const validateCategoryIndex = (
  categoryIndex: number | undefined,
  categories: any[]
): boolean => {
  if (categoryIndex === undefined || 
      categoryIndex < 0 || 
      categoryIndex >= categories.length) {
    toast({
      title: "Erreur",
      description: "Catégorie invalide",
      variant: "destructive"
    });
    return false;
  }
  return true;
};
