
// Import des fonctions useToast et toast depuis notre implémentation
import { useToast as useToastImplementation, toast as toastImplementation } from "@/components/ui/toast";

// Export du hook useToast
export const useToast = useToastImplementation;

// Export de l'objet toast avec une API cohérente
export const toast = toastImplementation;
