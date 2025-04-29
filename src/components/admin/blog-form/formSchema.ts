
import { z } from "zod";

export const blogArticleFormSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  slug: z.string().min(1, "Le slug ne peut pas être vide"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  categoryId: z.string().min(1, "Veuillez sélectionner une catégorie"),
  published: z.boolean().default(false),
});

export type BlogArticleFormValues = z.infer<typeof blogArticleFormSchema>;
