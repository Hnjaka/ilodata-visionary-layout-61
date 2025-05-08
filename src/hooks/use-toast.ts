
import { useToast as useShadcnToast } from "@/components/ui/toast";

export const useToast = useShadcnToast;

export const toast = {
  // Forwarding toast methods from shadcn/ui
  ...useShadcnToast().toast,
};
