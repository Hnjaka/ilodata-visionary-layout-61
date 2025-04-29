
import { useArticleFormBase } from './useArticleFormBase';
import { useArticleFormSync } from './useArticleFormSync';
import { useArticleFormSubmit } from './useArticleFormSubmit';
import { ArticleFormValues } from '@/components/admin/article-form/formSchema';
import { UseArticleFormProps } from './types';

export const useArticleForm = (props: UseArticleFormProps) => {
  // Destructure props for easier access
  const {
    categories,
    editArticle,
    editArticleCategoryIndex,
    setEditArticle,
    setEditArticleCategoryIndex,
    setEditArticleIndex
  } = props;
  
  // Initialize the form
  const form = useArticleFormBase(props);
  
  // Sync form values when editing
  useArticleFormSync(form, editArticle, editArticleCategoryIndex);
  
  // Handle form submission
  const submitHandler = useArticleFormSubmit(props);
  
  // Handle form submission with form reset
  const onSubmit = async (values: ArticleFormValues) => {
    const categoryIndex = await submitHandler(values);
    if (categoryIndex !== undefined) {
      form.reset({
        title: "",
        slug: "",
        categoryIndex: categoryIndex,
        content: "",
        layout: "standard"
      });
    }
  };
  
  // Cancel editing
  const handleCancel = () => {
    setEditArticle(null);
    setEditArticleCategoryIndex(null);
    setEditArticleIndex(null);
    form.reset({
      title: "",
      slug: "",
      categoryIndex: categories.length > 0 ? 0 : undefined,
      content: "",
      layout: "standard"
    });
  };

  return {
    form,
    onSubmit,
    handleCancel,
    isEditing: !!editArticle,
    categories, 
    editArticle 
  };
};
