
import { CategoryType, ArticleType } from '@/types/guides';
import { ArticleFormValues } from '@/components/admin/article-form/formSchema';

export interface UseArticleFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editArticle: ArticleType | null;
  editArticleCategoryIndex: number | null;
  editArticleIndex: number | null;
  setEditArticle: React.Dispatch<React.SetStateAction<ArticleType | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export interface ArticleFormState {
  form: ReturnType<typeof useArticleFormBase>;
  onSubmit: (values: ArticleFormValues) => void;
  handleCancel: () => void;
  isEditing: boolean;
  categories: CategoryType[];
  editArticle: ArticleType | null;
}
