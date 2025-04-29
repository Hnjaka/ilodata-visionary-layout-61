
import React from 'react';
import { Form } from "@/components/ui/form";
import { CategoryType, ArticleType } from '@/types/guides';
import { useArticleForm } from '@/hooks/useArticleForm';

// Import subcomponents
import TitleSlugFields from './article-form/TitleSlugFields';
import CategorySelection from './article-form/CategorySelection';
import LayoutSelection from './article-form/LayoutSelection';
import ContentField from './article-form/ContentField';
import FormActions from './article-form/FormActions';

interface ArticleFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editArticle: ArticleType | null;
  editArticleCategoryIndex: number | null;
  editArticleIndex: number | null;
  setEditArticle: React.Dispatch<React.SetStateAction<ArticleType | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const ArticleForm: React.FC<ArticleFormProps> = (props) => {
  const formData = useArticleForm(props);
  
  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {formData.editArticle ? "Modifier l'article" : "Ajouter un article"}
      </h3>
      <Form {...formData.form}>
        <form onSubmit={formData.form.handleSubmit(formData.onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TitleSlugFields form={formData.form} />
            <CategorySelection form={formData.form} categories={formData.categories} />
          </div>
          
          <LayoutSelection form={formData.form} />
          <ContentField form={formData.form} />
          
          <FormActions 
            isEditing={formData.isEditing}
            isCategoryAvailable={formData.categories.length > 0}
            onCancel={formData.handleCancel}
          />
        </form>
      </Form>
    </div>
  );
};

export default ArticleForm;
