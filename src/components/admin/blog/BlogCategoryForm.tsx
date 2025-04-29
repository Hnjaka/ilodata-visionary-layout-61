
import React from 'react';
import { Form } from '@/components/ui/form';
import { BlogCategory } from '@/hooks/useBlogData';
import { TitleField } from '@/components/admin/blog-form/TitleField';
import { IconField } from '@/components/admin/blog-form/IconField';
import { FormActions } from '@/components/admin/blog-form/FormActions';
import { useCategoryForm } from '@/hooks/blog-form/useCategoryForm';

interface BlogCategoryFormProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  editCategory: BlogCategory | null;
  editCategoryIndex: number | null;
  setEditCategory: React.Dispatch<React.SetStateAction<BlogCategory | null>>;
  setEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const BlogCategoryForm: React.FC<BlogCategoryFormProps> = (props) => {
  const {
    categories,
    setCategories,
    editCategory,
    editCategoryIndex,
    setEditCategory,
    setEditCategoryIndex
  } = props;

  const { form, onSubmit, handleCancel } = useCategoryForm({
    categories,
    setCategories,
    editCategory,
    editCategoryIndex,
    setEditCategory,
    setEditCategoryIndex
  });

  return (
    <div className="mt-6 bg-slate-50 p-4 rounded-lg">
      <h3 className="text-lg font-medium mb-4">
        {editCategory ? "Modifier la catégorie" : "Ajouter une catégorie"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <TitleField form={form} />
          <IconField form={form} />
          <FormActions 
            editCategory={editCategory} 
            handleCancel={handleCancel} 
          />
        </form>
      </Form>
    </div>
  );
};

export default BlogCategoryForm;
