
import { useToast as useShadcnToast, toast as shadcnToast } from "@/components/ui/toast";

export const useToast = useShadcnToast;

export const toast = {
  // Forward toast methods correctly
  error: shadcnToast.error,
  success: shadcnToast.success,
  warning: shadcnToast.warning,
  info: shadcnToast.info
};
