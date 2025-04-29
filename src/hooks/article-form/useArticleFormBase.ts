
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { articleFormSchema, ArticleFormValues } from '@/components/admin/article-form/formSchema';
import { UseArticleFormProps } from './types';

export const useArticleFormBase = (props: UseArticleFormProps) => {
  const { categories, editArticle, editArticleCategoryIndex } = props;
  
  // Initialize react-hook-form
  const form = useForm<ArticleFormValues>({
    resolver: zodResolver(articleFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      categoryIndex: categories.length > 0 ? 0 : undefined,
      content: "",
      layout: "standard"
    }
  });
  
  return form;
};
