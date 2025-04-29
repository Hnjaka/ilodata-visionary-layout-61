
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ArticleFormValues } from '@/components/admin/article-form/formSchema';
import { ArticleType } from '@/types/guides';

export const useArticleFormSync = (
  form: UseFormReturn<ArticleFormValues>,
  editArticle: ArticleType | null,
  editArticleCategoryIndex: number | null
) => {
  // Update form values when editing an article
  useEffect(() => {
    if (editArticle && editArticleCategoryIndex !== null) {
      form.reset({
        title: editArticle?.title || "",
        slug: editArticle?.slug || "",
        categoryIndex: editArticleCategoryIndex,
        content: editArticle?.content || "",
        layout: editArticle?.layout || "standard"
      });
    }
  }, [editArticle, editArticleCategoryIndex, form]);
};
