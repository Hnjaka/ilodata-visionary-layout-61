
import { useToast as useToastImplementation } from "@/components/ui/toast";

// Export du hook useToast
export const useToast = useToastImplementation;

// Ne pas exporter l'objet toast directement, car il cause des erreurs
// Utiliser uniquement le hook useToast() pour accéder à la méthode toast
