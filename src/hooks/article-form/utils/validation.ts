
// Import from hooks instead of components/ui
import { toast } from "@/hooks/use-toast";

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
    // Use the toast.error method directly
    toast.error("Catégorie invalide");
    return false;
  }
  return true;
};
