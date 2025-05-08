
// Import depuis hooks au lieu de components/ui
import { useToast } from "@/hooks/use-toast";

/**
 * Validate if the selected category index is valid
 */
export const validateCategoryIndex = (
  categoryIndex: number | undefined,
  categories: any[]
): boolean => {
  // Créer un hook de toast en dehors d'un composant React n'est pas idéal,
  // mais pour maintenir la structure du code, nous allons adapter la fonction
  if (categoryIndex === undefined || 
      categoryIndex < 0 || 
      categoryIndex >= categories.length) {
    // Renvoyer false sans toast, le toast sera géré au niveau du composant
    return false;
  }
  return true;
};
