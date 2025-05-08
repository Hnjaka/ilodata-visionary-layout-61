
import { z } from "zod";

// Define the article form schema
export const ArticleFormSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  slug: z.string().min(1, "Le slug ne peut pas être vide"),
  categoryId: z.string().min(1, "Veuillez sélectionner une catégorie"),
  content: z.string().optional(),
  excerpt: z.string().optional(),
  image: z.string().optional(),
  published: z.boolean().default(false),
});

// Type for the form values
export type BlogArticleFormValues = z.infer<typeof ArticleFormSchema>;
