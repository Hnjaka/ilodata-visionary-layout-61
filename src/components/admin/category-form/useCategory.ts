
import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CategoryType } from '@/types/guides';
import { getIconByName, getIconName } from '@/data/guidesData';
import { categoryFormSchema, CategoryFormValues } from './CategoryFormSchema';

interface UseCategoryProps {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  editCategory: CategoryType | null;
  editCategoryIndex: number | null;
  setEditCategory: React.Dispatch<React.SetStateAction<CategoryType | null>>;
  setEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useCategory = ({
  categories,
  setCategories,
  editCategory,
  editCategoryIndex,
  setEditCategory,
  setEditCategoryIndex
}: UseCategoryProps) => {
  const { toast } = useToast();
  
  // Initialize react-hook-form
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      title: "",
      icon: "Book"
    }
  });

  // Update form values when editing a category
  useEffect(() => {
    if (editCategory) {
      const iconName = typeof editCategory.icon === 'string' 
        ? editCategory.icon 
        : getIconName(editCategory.icon);
        
      form.reset({
        title: editCategory.title,
        icon: iconName
      });
    }
  }, [editCategory, form]);

  // Handle form submission
  const onSubmit = async (values: CategoryFormValues) => {
    try {
      if (editCategory && editCategoryIndex !== null) {
        // Update existing category
        const { error } = await supabase
          .from('guide_categories')
          .update({
            title: values.title,
            icon: values.icon
          })
          .eq('id', editCategory.id);
          
        if (error) throw error;
        
        // Update local state
        const updatedCategories = [...categories];
        updatedCategories[editCategoryIndex] = {
          ...editCategory,
          title: values.title,
          icon: getIconByName(values.icon)
        };
        
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Rubrique modifiée"
        });
        
        // Reset edit mode
        setEditCategory(null);
        setEditCategoryIndex(null);
        
      } else {
        // Add new category
        const { data: newCategory, error } = await supabase
          .from('guide_categories')
          .insert({
            title: values.title,
            icon: values.icon
          })
          .select()
          .single();
          
        if (error) throw error;
        
        // Add to local state
        setCategories([
          ...categories,
          {
            id: newCategory.id,
            title: values.title,
            icon: getIconByName(values.icon),
            articles: []
          }
        ]);
        
        toast({
          title: "Succès", 
          description: "Nouvelle rubrique ajoutée"
        });
      }
      
      // Reset the form
      form.reset({
        title: "",
        icon: "Book"
      });
      
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        title: "Erreur",
        description: error.message || "Erreur lors de l'enregistrement de la rubrique",
        variant: "destructive"
      });
    }
  };

  // Add the missing handleCancel function
  const handleCancel = () => {
    setEditCategory(null);
    setEditCategoryIndex(null);
    form.reset({
      title: "",
      icon: "Book"
    });
  };

  return {
    form,
    onSubmit,
    handleCancel
  };
};
