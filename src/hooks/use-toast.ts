
import { useToast as useToastImplementation } from "@/components/ui/toast";

// Export du hook useToast
export const useToast = useToastImplementation;

// Créer une référence au toast pour l'utiliser en dehors des composants React
export const toast = useToastImplementation().toast;

// Ne pas exporter l'objet toast directement, car il cause des erreurs
// Utiliser uniquement le hook useToast() pour accéder à la méthode toast
