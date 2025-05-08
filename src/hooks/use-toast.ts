
// Export the useToast hook and toast functions directly from our toast implementation
import { useToast as useToastImplementation, toast as toastImplementation } from "@/components/ui/toast";

export const useToast = useToastImplementation;

// Re-export toast with the correct callable interface
export const toast = {
  ...toastImplementation, // This includes error, success, warning, info
  // Add any additional toast methods or overwrites here if needed
};
