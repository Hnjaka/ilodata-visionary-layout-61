
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { BlogCategory } from '@/hooks/useBlogData';
import { blogCategoryFormSchema, BlogCategoryFormValues } from '@/components/admin/blog-form/CategoryFormSchema';

interface UseCategoryFormProps {
  categories: BlogCategory[];
  setCategories: React.Dispatch<React.SetStateAction<BlogCategory[]>>;
  editCategory: BlogCategory | null;
  editCategoryIndex: number | null;
  setEditCategory: React.Dispatch<React.SetStateAction<BlogCategory | null>>;
  setEditCategoryIndex: React.Dispatch<React.SetStateAction<number | null>>;
}

export const useCategoryForm = ({
  categories,
  setCategories,
  editCategory,
  editCategoryIndex,
  setEditCategory,
  setEditCategoryIndex
}: UseCategoryFormProps) => {
  const form = useForm<BlogCategoryFormValues>({
    resolver: zodResolver(blogCategoryFormSchema),
    defaultValues: {
      title: editCategory?.title || "",
      icon: editCategory?.icon ? (typeof editCategory.icon === 'string' ? editCategory.icon : 'Book') : 'Book',
    },
  });

  // Update form values when editCategory changes
  useEffect(() => {
    if (editCategory) {
      form.setValue("title", editCategory.title);
      form.setValue("icon", typeof editCategory.icon === 'string' ? editCategory.icon : 'Book');
    }
  }, [editCategory, form]);

  const onSubmit = async (values: BlogCategoryFormValues) => {
    try {
      if (editCategory && editCategoryIndex !== null) {
        // Update existing category
        const { data, error } = await supabase
          .from('blog_categories')
          .update({
            title: values.title,
            icon: values.icon,
            updated_at: new Date().toISOString(),
          })
          .eq('id', editCategory.id)
          .select();
        
        if (error) throw error;
        
        const updatedCategories = [...categories];
        const updatedCategory = {
          ...editCategory,
          title: values.title,
          icon: values.icon
        };
        updatedCategories[editCategoryIndex] = updatedCategory;
        setCategories(updatedCategories);
        
        toast({
          title: "Succès",
          description: "Catégorie mise à jour",
        });
        
        // Reset form state
        setEditCategory(null);
        setEditCategoryIndex(null);
      } else {
        // Add new category
        const newPosition = Math.max(0, ...categories.map(c => c.position)) + 1;
        
        const { data, error } = await supabase
          .from('blog_categories')
          .insert({
            title: values.title,
            icon: values.icon,
            position: newPosition
          })
          .select();
        
        if (error) throw error;
        
        if (data && data[0]) {
          const newCategory: BlogCategory = {
            id: data[0].id,
            title: data[0].title,
            icon: values.icon,
            position: data[0].position,
            articles: []
          };
          
          setCategories([...categories, newCategory]);
          
          toast({
            title: "Succès",
            description: "Nouvelle catégorie ajoutée",
          });
        }
      }
      
      // Reset form
      form.reset({
        title: "",
        icon: "Book"
      });
      
    } catch (error) {
      console.error('Error saving category:', error);
      toast({
        title: "Erreur",
        description: "Erreur lors de l'enregistrement de la catégorie",
        variant: "destructive"
      });
    }
  };

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
    handleCancel,
    isEditing: !!editCategory
  };
};
