
import React from 'react';
import { Form } from '@/components/ui/form';
import { BlogCategory, BlogArticle } from '@/hooks/useBlogData';
import { TitleSlugFields } from '@/components/admin/blog-form/TitleSlugFields';
import { CategorySelection } from '@/components/admin/blog-form/CategorySelection';
import { ImageField } from '@/components/admin/blog-form/ImageField';
import { ExcerptField } from '@/components/admin/blog-form/ExcerptField';
import { ContentField } from '@/components/admin/blog-form/ContentField';
import { PublishField } from '@/components/admin/blog-form/PublishField';
import { FormActions } from '@/components/admin/blog-form/FormActions';
import { useArticleFormLogic } from '@/hooks/blog-form/useArticleFormLogic';

interface BlogArticleFormProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  editArticle: BlogArticle | null;
  editArticleCategoryIndex: number | null;
  editArticleIndex: number | null;
  setEditArticle: React.Dispatch<React.SetStateAction<BlogArticle | null>>;
  setEditArticleCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
  setEditArticleIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const BlogArticleForm: React.FC<BlogArticleFormProps> = ({
  categories,
  setCategories,
  editArticle,
  editArticleCategoryIndex,
  editArticleIndex,
  setEditArticle,
  setEditArticleCategoryIndex,
  setEditArticleIndex
}) => {
  const {
    form,
    onSubmit,
    handleCancel,
    generateSlug
  } = useArticleFormLogic({
    categories,
    setCategories,
    editArticle,
    editArticleCategoryIndex,
    editArticleIndex,
    setEditArticle,
    setEditArticleCategoryIndex,
    setEditArticleIndex
  });

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {editArticle ? "Modifier l'article" : "Ajouter un article"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TitleSlugFields form={form} generateSlug={generateSlug} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CategorySelection form={form} categories={categories} />
              <ImageField form={form} />
            </div>
          </div>
          
          <ExcerptField form={form} />
          
          <ContentField form={form} />
          
          <PublishField form={form} />
          
          <FormActions 
            editArticle={editArticle} 
            handleCancel={handleCancel} 
            categoriesEmpty={categories.length === 0}
          />
        </form>
      </Form>
    </div>
  );
};

export default BlogArticleForm;
