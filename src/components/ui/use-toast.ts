
import { useToast as useToastHook } from "@/hooks/use-toast";
import { toast as toastFunction } from "@/hooks/use-toast";

// Re-export the hook and toast function with the right types
export const useToast = useToastHook;
export const toast = toastFunction;
