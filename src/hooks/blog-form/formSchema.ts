
import { z } from "zod";

export const blogArticleFormSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  slug: z.string().min(1, "Le slug ne peut pas être vide"),
  categoryId: z.string().min(1, "Veuillez sélectionner une catégorie"),
  image: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().default(false)
});

export type BlogArticleFormValues = z.infer<typeof blogArticleFormSchema>;
