
import { z } from "zod";
import { titleSlugSchema } from "./TitleSlugFields";
import { categorySchema } from "./CategorySelection";
import { layoutSchema } from "./LayoutSelection";
import { contentSchema } from "./ContentField";

// Combine all the schemas into one
export const articleFormSchema = z.object({
  ...titleSlugSchema.shape,
  ...categorySchema.shape,
  ...layoutSchema.shape,
  ...contentSchema.shape,
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;
