
import * as z from "zod";

// Define form schema for validation
export const categoryFormSchema = z.object({
  title: z.string().min(1, "Le titre de la rubrique ne peut pas être vide"),
  icon: z.string().default("Book")
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
