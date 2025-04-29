
import React from 'react';
import { Form } from "@/components/ui/form";
import { CategoryType } from '@/types/guides';
import { TitleField } from './category-form/TitleField';
import { IconSelector } from './category-form/IconSelector';
import { FormActions } from './category-form/FormActions';
import { useCategory } from './category-form/useCategory';

interface CategoryFormProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editCategory: CategoryType | null;
  editCategoryIndex: number | null;
  setEditCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  setEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

const CategoryForm: React.FC<CategoryFormProps> = (props) => {
  const {
    categories,
    setCategories,
    editCategory,
    editCategoryIndex,
    setEditCategory,
    setEditCategoryIndex
  } = props;

  const { form, onSubmit, handleCancel } = useCategory({
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
        {editCategory ? "Modifier la rubrique" : "Ajouter une rubrique"}
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4 items-end">
          <TitleField form={form} />
          <IconSelector form={form} />
          <FormActions 
            editCategory={editCategory} 
            onCancel={handleCancel} 
          />
        </form>
      </Form>
    </div>
  );
};

export default CategoryForm;
