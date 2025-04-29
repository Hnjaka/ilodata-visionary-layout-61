
import * as z from "zod";

export const blogCategoryFormSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  icon: z.string().min(1, "Veuillez sélectionner une icône"),
});

export type BlogCategoryFormValues = z.infer<typeof blogCategoryFormSchema>;
