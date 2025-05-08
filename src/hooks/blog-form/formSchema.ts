
import { z } from "zod";

export const ArticleFormSchema = z.object({
  title: z.string().min(1, "Le titre ne peut pas être vide"),
  slug: z.string().min(1, "Le slug ne peut pas être vide"),
  category_id: z.string().min(1, "Veuillez sélectionner une catégorie"),
  image: z.string().optional(),
  excerpt: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().default(false),
  published_at: z.date().optional()
});

export type BlogArticleFormValues = z.infer<typeof ArticleFormSchema>;
